"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CameraIcon } from "@phosphor-icons/react/dist/ssr/Camera";
import { CheckCircleIcon } from "@phosphor-icons/react/dist/ssr/CheckCircle";
import { FrameCornersIcon } from "@phosphor-icons/react/dist/ssr/FrameCorners";
import { ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr/ShieldCheck";
import { SunIcon } from "@phosphor-icons/react/dist/ssr/Sun";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr/UploadSimple";
import { WarningCircleIcon } from "@phosphor-icons/react/dist/ssr/WarningCircle";

type ClassificationResult = { label: string; score: number };
type CameraState = "idle" | "requesting" | "active" | "captured" | "denied" | "unavailable";
type ModelState = "idle" | "loading" | "running" | "ready" | "error";
type QualityIssue = { code: string; title: string; message: string };

export type SkinAnalysisResult = {
  predictions: ClassificationResult[];
  qualityIssues: QualityIssue[];
};
type OnnxSession = import("onnxruntime-web").InferenceSession;
type OnnxRuntime = typeof import("onnxruntime-web");

const MAX_UPLOAD_BYTES = 15 * 1024 * 1024;
const CAPTURE_RATIO = 3 / 4;
const MODEL_URL = "/models/skin-type/onnx/model_quantized.onnx";
const MODEL_LABELS = ["Dry", "Normal", "Oily"] as const;
const MODEL_IMAGE_SIZE = 224;
const RUNTIME_URL = "/wasm/ort.wasm.min.mjs";

function loadOnnxRuntime(): Promise<OnnxRuntime> {
  // Keep the prebuilt ESM runtime intact; it loads its matching WASM glue module.
  return import(/* webpackIgnore: true */ RUNTIME_URL);
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Something went wrong while analyzing the photo.";
}

function assessQuality(canvas: HTMLCanvasElement): QualityIssue[] {
  const issues: QualityIssue[] = [];
  if (canvas.width < 480 || canvas.height < 640) {
    issues.push({ code: "resolution", title: "Low image resolution", message: "Use a camera or photo at least 480 × 640 pixels for a more reliable estimate." });
  }

  const sample = document.createElement("canvas");
  sample.width = 64;
  sample.height = 64;
  const context = sample.getContext("2d", { willReadFrequently: true });
  if (!context) return issues;
  context.drawImage(canvas, 0, 0, 64, 64);
  const pixels = context.getImageData(0, 0, 64, 64).data;
  let total = 0;
  const luminance: number[] = [];
  for (let index = 0; index < pixels.length; index += 4) {
    const value = 0.2126 * pixels[index] + 0.7152 * pixels[index + 1] + 0.0722 * pixels[index + 2];
    luminance.push(value);
    total += value;
  }
  const average = total / luminance.length;
  const variance = luminance.reduce((sum, value) => sum + (value - average) ** 2, 0) / luminance.length;
  const contrast = Math.sqrt(variance);

  if (average < 65) {
    issues.push({ code: "dark", title: "Low light detected", message: "Face a window or use a soft light in front of you, then retake the photo." });
  } else if (average > 220) {
    issues.push({ code: "bright", title: "Image may be overexposed", message: "Move away from harsh direct light so facial details remain visible." });
  }
  if (contrast < 22) {
    issues.push({ code: "contrast", title: "Low detail detected", message: "Clean the camera lens and use even light that clearly shows your face." });
  }
  return issues;
}

function drawPortraitFrame(source: CanvasImageSource, sourceWidth: number, sourceHeight: number, mirror = false) {
  const sourceRatio = sourceWidth / sourceHeight;
  let cropWidth = sourceWidth;
  let cropHeight = sourceHeight;
  let sourceX = 0;
  let sourceY = 0;

  if (sourceRatio > CAPTURE_RATIO) {
    cropWidth = sourceHeight * CAPTURE_RATIO;
    sourceX = (sourceWidth - cropWidth) / 2;
  } else {
    cropHeight = sourceWidth / CAPTURE_RATIO;
    sourceY = (sourceHeight - cropHeight) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(cropWidth));
  canvas.height = Math.max(1, Math.round(cropHeight));
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Your browser could not prepare the captured image.");

  if (mirror) {
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
  }
  context.drawImage(source, sourceX, sourceY, cropWidth, cropHeight, 0, 0, canvas.width, canvas.height);
  return canvas;
}

function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("The captured photo could not be prepared.")), "image/jpeg", 0.92);
  });
}

async function fetchModel(onProgress: (progress: number) => void): Promise<Uint8Array> {
  const response = await fetch(MODEL_URL);
  if (!response.ok) {
    throw new Error(`Model download failed with status ${response.status}.`);
  }

  const contentLength = Number(response.headers.get("content-length")) || 0;
  if (!response.body || contentLength === 0) {
    return new Uint8Array(await response.arrayBuffer());
  }

  const reader = response.body.getReader();
  const chunks: Uint8Array[] = [];
  let receivedLength = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    receivedLength += value.length;
    onProgress(Math.min(99, Math.round((receivedLength / contentLength) * 100)));
  }

  const model = new Uint8Array(receivedLength);
  let offset = 0;
  for (const chunk of chunks) {
    model.set(chunk, offset);
    offset += chunk.length;
  }
  return model;
}

async function prepareModelInput(imageUrl: string, Tensor: typeof import("onnxruntime-web").Tensor) {
  const image = document.createElement("img");
  image.src = imageUrl;
  await image.decode();

  const canvas = document.createElement("canvas");
  canvas.width = MODEL_IMAGE_SIZE;
  canvas.height = MODEL_IMAGE_SIZE;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Your browser could not prepare the model input.");
  context.drawImage(image, 0, 0, MODEL_IMAGE_SIZE, MODEL_IMAGE_SIZE);

  const pixels = context.getImageData(0, 0, MODEL_IMAGE_SIZE, MODEL_IMAGE_SIZE).data;
  const planeSize = MODEL_IMAGE_SIZE * MODEL_IMAGE_SIZE;
  const input = new Float32Array(planeSize * 3);
  for (let pixelIndex = 0; pixelIndex < planeSize; pixelIndex += 1) {
    const sourceIndex = pixelIndex * 4;
    input[pixelIndex] = pixels[sourceIndex] / 127.5 - 1;
    input[planeSize + pixelIndex] = pixels[sourceIndex + 1] / 127.5 - 1;
    input[planeSize * 2 + pixelIndex] = pixels[sourceIndex + 2] / 127.5 - 1;
  }

  return new Tensor("float32", input, [1, 3, MODEL_IMAGE_SIZE, MODEL_IMAGE_SIZE]);
}

function rankLogits(logits: Float32Array): ClassificationResult[] {
  const maximum = Math.max(...logits);
  const exponentials = Array.from(logits, (value) => Math.exp(value - maximum));
  const total = exponentials.reduce((sum, value) => sum + value, 0);
  return MODEL_LABELS.map((label, index) => ({
    label,
    score: exponentials[index] / total,
  })).sort((left, right) => right.score - left.score);
}

export function SkinTypeClassifier({ onComplete }: { onComplete: (result: SkinAnalysisResult) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const sessionRef = useRef<OnnxSession | null>(null);
  const previewUrlRef = useRef<string | null>(null);
  const [cameraState, setCameraState] = useState<CameraState>("idle");
  const [modelState, setModelState] = useState<ModelState>("idle");
  const [modelProgress, setModelProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [qualityIssues, setQualityIssues] = useState<QualityIssue[]>([]);
  const [error, setError] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const clearPreview = useCallback(() => {
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    previewUrlRef.current = null;
    setPreviewUrl(null);
  }, []);

  useEffect(() => () => {
    stopCamera();
    if (previewUrlRef.current) URL.revokeObjectURL(previewUrlRef.current);
    void sessionRef.current?.release();
    sessionRef.current = null;
  }, [stopCamera]);

  async function startCamera() {
    setError(null);
    setQualityIssues([]);
    clearPreview();

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      setCameraState("unavailable");
      setError("Camera access requires a supported browser on HTTPS or localhost. You can upload a photo instead.");
      return;
    }

    setCameraState("requesting");
    try {
      stopCamera();
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 1280 } },
      });
      streamRef.current = stream;
      if (!videoRef.current) throw new Error("The camera preview is not available.");
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
      setCameraState("active");
    } catch (cameraError) {
      stopCamera();
      if (cameraError instanceof DOMException && cameraError.name === "NotAllowedError") {
        setCameraState("denied");
        setError("Camera access was blocked. Allow camera access in your browser’s site settings and try again, or upload a photo.");
      } else {
        setCameraState("unavailable");
        setError("The camera could not be started. Check whether another app is using it, or upload a photo instead.");
      }
    }
  }

  async function setCapturedCanvas(canvas: HTMLCanvasElement) {
    const issues = assessQuality(canvas);
    const blob = await canvasToBlob(canvas);
    clearPreview();
    const url = URL.createObjectURL(blob);
    previewUrlRef.current = url;
    setPreviewUrl(url);
    setQualityIssues(issues);
    setCameraState("captured");
    setModelState("idle");
  }

  async function capturePhoto() {
    const video = videoRef.current;
    if (!video || video.readyState < HTMLMediaElement.HAVE_CURRENT_DATA || !video.videoWidth || !video.videoHeight) {
      setError("The camera is still preparing. Wait a moment and try again.");
      return;
    }
    setError(null);
    try {
      const canvas = drawPortraitFrame(video, video.videoWidth, video.videoHeight, true);
      stopCamera();
      await setCapturedCanvas(canvas);
    } catch (captureError) {
      setError(getErrorMessage(captureError));
    }
  }

  async function uploadPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);
    if (!file.type.startsWith("image/")) {
      setError("Choose a JPG, PNG, WebP, or another image file.");
      return;
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      setError("Choose an image smaller than 15 MB.");
      return;
    }

    stopCamera();
    const originalUrl = URL.createObjectURL(file);
    try {
      const image = document.createElement("img");
      image.src = originalUrl;
      await image.decode();
      const canvas = drawPortraitFrame(image, image.naturalWidth, image.naturalHeight);
      await setCapturedCanvas(canvas);
    } catch (uploadError) {
      setError(getErrorMessage(uploadError));
    } finally {
      URL.revokeObjectURL(originalUrl);
    }
  }

  async function loadModel() {
    if (sessionRef.current) return sessionRef.current;
    setModelState("loading");
    setModelProgress(0);
    const ort = await loadOnnxRuntime();
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.wasmPaths = {
      mjs: new URL("/wasm/ort-wasm-simd-threaded.mjs", window.location.origin).href,
      wasm: new URL("/wasm/ort-wasm-simd-threaded.wasm", window.location.origin).href,
    };
    const model = await fetchModel(setModelProgress);
    const session = await ort.InferenceSession.create(model, {
      executionProviders: ["wasm"],
      graphOptimizationLevel: "all",
    });
    setModelProgress(100);
    sessionRef.current = session;
    return session;
  }

  async function analyzePhoto() {
    if (!previewUrl) return;
    setError(null);
    setModelState(sessionRef.current ? "running" : "loading");
    try {
      const ort = await loadOnnxRuntime();
      const session = await loadModel();
      setModelState("running");
      const input = await prepareModelInput(previewUrl, ort.Tensor);
      const output = await session.run({ pixel_values: input });
      const logits = output.logits?.data;
      if (!(logits instanceof Float32Array)) {
        throw new Error("The model returned an unexpected result.");
      }
      const predictions = rankLogits(logits);
      setModelState("ready");
      onComplete({ predictions, qualityIssues });
    } catch (modelError) {
      setModelState("error");
      setError(`The on-device model could not run. ${getErrorMessage(modelError)}`);
    }
  }

  async function retakePhoto() {
    setQualityIssues([]);
    setModelState("idle");
    await startCamera();
  }

  const busy = cameraState === "requesting" || modelState === "loading" || modelState === "running";

  return (
    <section className="mx-auto grid w-[min(1180px,calc(100%-32px))] gap-6 pb-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(340px,.95fr)] lg:items-start" aria-labelledby="camera-heading">
      <div className="rounded-[28px] border border-[#eadfd8] bg-white/90 p-4 shadow-[0_24px_70px_rgba(115,74,54,.1)] sm:p-6">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="text-xs font-bold tracking-[0.12em] text-[#b94051] uppercase">Private, on-device analysis</span>
            <h2 id="camera-heading" className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">Position your face in the guide</h2>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#edf6ee] px-3 py-2 text-xs font-semibold text-[#35643d]"><ShieldCheckIcon size={16} weight="fill" aria-hidden="true" /> Photo stays on this device</span>
        </div>

        <div className="relative mx-auto aspect-[3/4] w-full max-w-[520px] overflow-hidden rounded-[24px] bg-[#282624] shadow-inner">
          <video ref={videoRef} className={`h-full w-full scale-x-[-1] object-cover transition-opacity ${cameraState === "active" ? "opacity-100" : "opacity-0"}`} muted playsInline aria-label="Live front camera preview" />
          {previewUrl && <Image src={previewUrl} alt="Captured face preview" fill unoptimized className="object-cover" sizes="(max-width: 1024px) 100vw, 520px" />}
          {!previewUrl && cameraState !== "active" && (
            <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_38%,#5e5550_0%,#302c2a_65%)] px-8 text-center text-white/80">
              <div><CameraIcon className="mx-auto" size={46} weight="duotone" aria-hidden="true" /><p className="mt-4 text-sm leading-relaxed">Your camera preview will appear here after you grant permission.</p></div>
            </div>
          )}
          {(cameraState === "active" || cameraState === "requesting") && (
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="absolute top-[12%] left-1/2 h-[70%] w-[66%] -translate-x-1/2 rounded-[48%] border-2 border-white/90 shadow-[0_0_0_999px_rgba(18,16,15,.28),0_0_24px_rgba(255,255,255,.3)]" />
              <div className="absolute top-[42%] left-1/2 w-[54%] -translate-x-1/2 border-t border-dashed border-white/65" />
              <p className="absolute right-4 bottom-4 left-4 rounded-xl bg-black/50 px-3 py-2 text-center text-xs font-medium text-white backdrop-blur">Eyes near the dotted line · entire face inside the oval</p>
            </div>
          )}
          {cameraState === "requesting" && <div className="absolute inset-0 grid place-items-center bg-black/45 text-sm font-semibold text-white">Waiting for camera permission…</div>}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {cameraState !== "active" && !previewUrl && (
            <button type="button" onClick={startCamera} disabled={busy} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b94051] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#a93647] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051] disabled:cursor-wait disabled:opacity-60"><CameraIcon size={19} weight="bold" aria-hidden="true" /> Enable camera</button>
          )}
          {cameraState === "active" && (
            <button type="button" onClick={capturePhoto} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#b94051] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a93647] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051]"><CameraIcon size={19} weight="fill" aria-hidden="true" /> Capture photo</button>
          )}
          {previewUrl && (
            <>
              <button type="button" onClick={retakePhoto} disabled={busy} className="min-h-12 rounded-xl border border-[#d9c9c1] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#b94051] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051] disabled:opacity-50">Retake</button>
              <button type="button" onClick={analyzePhoto} disabled={busy} className="min-h-12 rounded-xl bg-[#b94051] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#a93647] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b94051] disabled:cursor-wait disabled:opacity-60">{modelState === "loading" ? `Loading model${modelProgress ? ` · ${modelProgress}%` : ""}` : modelState === "running" ? "Analyzing…" : "Analyze skin type"}</button>
            </>
          )}
          <label className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d9c9c1] bg-white px-5 py-3 text-sm font-semibold transition hover:border-[#b94051] focus-within:outline-2 focus-within:outline-offset-4 focus-within:outline-[#b94051]">
            <UploadSimpleIcon size={19} weight="bold" aria-hidden="true" /> Upload photo
            <input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" className="sr-only" onChange={uploadPhoto} disabled={busy} />
          </label>
        </div>

        <div className="mt-4 min-h-6 text-center text-sm" aria-live="polite">
          {modelState === "loading" && <p className="text-[#64645f]">Loading the 83 MB model from this website. The first analysis may take a moment.</p>}
          {modelState === "running" && <p className="text-[#64645f]">Analyzing the captured image on your device…</p>}
          {error && <p className="font-medium text-[#a93647]">{error}</p>}
        </div>
      </div>

      <div className="space-y-5">
        <section className="rounded-[24px] border border-[#eadfd8] bg-[#fff9f6] p-6" aria-labelledby="photo-guide">
          <h2 id="photo-guide" className="text-xl font-semibold">For a clearer photo</h2>
          <ul className="mt-5 space-y-4">
            {[
              { icon: FrameCornersIcon, title: "Center your whole face", text: "Keep your forehead, cheeks, and chin inside the oval. Hold the camera at eye level." },
              { icon: SunIcon, title: "Use soft, even light", text: "Face a window or a light source. Avoid backlighting, harsh shadows, and colored light." },
              { icon: CheckCircleIcon, title: "Keep the view natural", text: "Use a bare, dry face when possible. Remove sunglasses and keep a neutral expression." },
            ].map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-[#b94051] shadow-sm"><Icon size={22} weight="duotone" aria-hidden="true" /></span><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-sm leading-relaxed text-[#64645f]">{text}</p></div></li>
            ))}
          </ul>
        </section>

        {previewUrl && qualityIssues.length === 0 && (
          <div className="flex gap-3 rounded-2xl border border-[#b9d5bd] bg-[#f0f8f1] p-4 text-[#315b38]" role="status">
            <CheckCircleIcon className="mt-0.5 shrink-0" size={21} weight="fill" aria-hidden="true" /><div><h3 className="text-sm font-semibold">Photo quality looks suitable</h3><p className="mt-1 text-xs leading-relaxed">Lighting and resolution passed the local quality checks. This does not guarantee a correct classification.</p></div>
          </div>
        )}

        {qualityIssues.length > 0 && (
          <section className="rounded-2xl border border-[#e4b781] bg-[#fff8ec] p-5" aria-labelledby="quality-warning">
            <div className="flex gap-3"><WarningCircleIcon className="mt-0.5 shrink-0 text-[#a86418]" size={22} weight="fill" aria-hidden="true" /><div><h2 id="quality-warning" className="font-semibold text-[#75470f]">Result reliability may be lower</h2><p className="mt-1 text-sm leading-relaxed text-[#765c3d]">You can continue, but retaking the photo may improve the model’s confidence.</p></div></div>
            <ul className="mt-4 space-y-3 border-t border-[#e9cfaa] pt-4">{qualityIssues.map((issue) => <li key={issue.code}><h3 className="text-sm font-semibold text-[#75470f]">{issue.title}</h3><p className="mt-0.5 text-xs leading-relaxed text-[#765c3d]">{issue.message}</p></li>)}</ul>
          </section>
        )}

        <p className="px-1 text-xs leading-relaxed text-[#746e69]">This tool estimates visible skin-type patterns from one image. It cannot identify a skin condition, replace an examination, or recommend treatment. Seek professional care for persistent, painful, swollen, bleeding, or rapidly changing skin concerns.</p>
      </div>
    </section>
  );
}

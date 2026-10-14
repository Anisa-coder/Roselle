export type QuestionId =
  | "skinFeel"
  | "dryness"
  | "sensitivity"
  | "concerns"
  | "areas"
  | "duration"
  | "frequency"
  | "triggers"
  | "environment"
  | "routine"
  | "sunscreen"
  | "impact";

export type QuizAnswers = Record<QuestionId, string[]>;

export type QuizOption = {
  value: string;
  label: string;
};

export type QuizQuestion = {
  id: QuestionId;
  title: string;
  hint: string;
  type: "single" | "multiple";
  options: QuizOption[];
  exclusiveValues?: string[];
  concernDetail?: boolean;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "skinFeel",
    title: "How does your skin usually feel by midday?",
    hint: "Answer for a typical day, without considering one unusually hot, cold, or stressful day.",
    type: "single",
    options: [
      { value: "oily-all", label: "Oily or shiny all over" },
      { value: "dry-tight", label: "Dry, tight, or rough" },
      { value: "combination", label: "Oily through the T-zone, drier on the cheeks" },
      { value: "balanced", label: "Mostly comfortable and balanced" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "dryness",
    title: "How often do you notice tightness, dryness, or flaking?",
    hint: "Include how your skin feels after cleansing and during the day.",
    type: "single",
    options: [
      { value: "daily", label: "Most days" },
      { value: "sometimes", label: "Sometimes or in certain seasons" },
      { value: "rarely", label: "Rarely" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "sensitivity",
    title: "How does your skin react to new products?",
    hint: "Think about stinging, burning, itching, redness, or swelling.",
    type: "single",
    options: [
      { value: "often", label: "I react often" },
      { value: "sometimes", label: "I react sometimes" },
      { value: "rarely", label: "I rarely react" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "concerns",
    title: "Which skin concerns would you like help with?",
    hint: "Choose every concern that applies, or choose General care by itself.",
    type: "multiple",
    exclusiveValues: ["general-care"],
    options: [
      { value: "breakouts", label: "Breakouts" },
      { value: "blackheads", label: "Blackheads or clogged pores" },
      { value: "redness", label: "Redness" },
      { value: "dark-spots", label: "Dark spots or uneven tone" },
      { value: "texture", label: "Uneven texture" },
      { value: "dryness", label: "Dryness" },
      { value: "fine-lines", label: "Fine lines" },
      { value: "general-care", label: "General care only" },
    ],
  },
  {
    id: "areas",
    title: "Where do you notice these concerns?",
    hint: "Choose all affected areas.",
    type: "multiple",
    concernDetail: true,
    exclusiveValues: ["not-sure"],
    options: [
      { value: "forehead", label: "Forehead" },
      { value: "nose", label: "Nose" },
      { value: "cheeks", label: "Cheeks" },
      { value: "chin-jaw", label: "Chin or jawline" },
      { value: "neck", label: "Neck" },
      { value: "widespread", label: "Several areas" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "duration",
    title: "How long have you noticed these concerns?",
    hint: "Choose the closest answer.",
    type: "single",
    concernDetail: true,
    options: [
      { value: "under-month", label: "Less than one month" },
      { value: "one-six-months", label: "One to six months" },
      { value: "over-six-months", label: "More than six months" },
      { value: "comes-goes", label: "They come and go over time" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "frequency",
    title: "How frequently do the concerns appear?",
    hint: "Think about the last few months.",
    type: "single",
    concernDetail: true,
    options: [
      { value: "daily", label: "Most days" },
      { value: "weekly", label: "A few times a week" },
      { value: "monthly", label: "A few times a month" },
      { value: "occasionally", label: "Occasionally" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "triggers",
    title: "Have you noticed anything that triggers or worsens them?",
    hint: "Choose all that apply. None and Not sure are selected by themselves.",
    type: "multiple",
    concernDetail: true,
    exclusiveValues: ["none", "not-sure"],
    options: [
      { value: "new-products", label: "New skincare or makeup" },
      { value: "weather", label: "Weather or seasonal changes" },
      { value: "stress-sleep", label: "Stress or poor sleep" },
      { value: "cycle", label: "Menstrual cycle or hormonal changes" },
      { value: "sweat", label: "Heat, sweat, or exercise" },
      { value: "fragrance", label: "Fragranced products" },
      { value: "none", label: "No trigger noticed" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "environment",
    title: "Which environment are you usually in?",
    hint: "Choose the option that best describes most of your week.",
    type: "single",
    options: [
      { value: "hot-humid", label: "Hot or humid weather" },
      { value: "hot-dry", label: "Hot and dry weather" },
      { value: "cool-dry", label: "Cool or dry weather" },
      { value: "conditioned", label: "Air-conditioned or heated rooms for long periods" },
      { value: "mixed", label: "Mixed or changing conditions" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "routine",
    title: "What does your current skincare routine look like?",
    hint: "There is no wrong starting point.",
    type: "single",
    options: [
      { value: "none", label: "I don’t have a regular routine" },
      { value: "basic", label: "Cleanser and moisturizer" },
      { value: "full", label: "Cleanser, treatments, moisturizer, and sunscreen" },
      { value: "changes", label: "I change products frequently" },
    ],
  },
  {
    id: "sunscreen",
    title: "How often do you use sunscreen?",
    hint: "Consider your usual morning routine.",
    type: "single",
    options: [
      { value: "daily", label: "Every day" },
      { value: "outdoors", label: "Mainly when I expect to be outdoors" },
      { value: "rarely", label: "Rarely or never" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
  {
    id: "impact",
    title: "Are you experiencing discomfort or a persistent problem?",
    hint: "This helps us tell you when general skincare guidance may not be enough.",
    type: "single",
    options: [
      { value: "none", label: "No discomfort" },
      { value: "mild", label: "Mild or occasional discomfort" },
      { value: "recurring", label: "Recurring irritation or concern" },
      { value: "persistent-painful", label: "Persistent, painful, swollen, or worsening symptoms" },
      { value: "not-sure", label: "I’m not sure" },
    ],
  },
];

export const concernDetailIds: QuestionId[] = ["areas", "duration", "frequency", "triggers"];

export function createEmptyAnswers(): QuizAnswers {
  return {
    skinFeel: [],
    dryness: [],
    sensitivity: [],
    concerns: [],
    areas: [],
    duration: [],
    frequency: [],
    triggers: [],
    environment: [],
    routine: [],
    sunscreen: [],
    impact: [],
  };
}

export function getVisibleQuestions(answers: QuizAnswers): QuizQuestion[] {
  const generalCareOnly = answers.concerns.length === 1 && answers.concerns[0] === "general-care";
  return quizQuestions.filter((question) => !(generalCareOnly && question.concernDetail));
}

export function updateQuizAnswer(answers: QuizAnswers, questionId: QuestionId, value: string): QuizAnswers {
  const question = quizQuestions.find((item) => item.id === questionId);
  if (!question) return answers;

  const current = answers[questionId];
  let next: string[];
  if (question.type === "single") {
    next = [value];
  } else if (question.exclusiveValues?.includes(value)) {
    next = [value];
  } else {
    const withoutExclusive = current.filter((item) => !question.exclusiveValues?.includes(item));
    next = withoutExclusive.includes(value)
      ? withoutExclusive.filter((item) => item !== value)
      : [...withoutExclusive, value];
  }

  const updated = { ...answers, [questionId]: next };
  if (questionId === "concerns" && next.length === 1 && next[0] === "general-care") {
    concernDetailIds.forEach((id) => { updated[id] = []; });
  }
  return updated;
}

export function getOptionLabel(questionId: QuestionId, value: string): string {
  return quizQuestions.find((question) => question.id === questionId)?.options.find((option) => option.value === value)?.label ?? value;
}

export function getSkinSummary(answers: QuizAnswers) {
  const feel = answers.skinFeel[0];
  const dryness = answers.dryness[0];
  const summaries: Record<string, { title: string; explanation: string }> = {
    "oily-all": { title: "Oily-leaning characteristics", explanation: "You reported oil or shine across most of your face by midday." },
    "dry-tight": { title: "Dry-leaning characteristics", explanation: "You reported that your skin usually feels dry, tight, or rough." },
    combination: { title: "Combination characteristics", explanation: "You reported more oil through the T-zone and drier cheeks." },
    balanced: { title: "Balanced characteristics", explanation: "You reported that your skin usually feels comfortable and balanced." },
    "not-sure": { title: "Skin characteristics still uncertain", explanation: "You were unsure how your skin usually feels, so this quiz cannot suggest a skin-type pattern." },
  };
  const summary = summaries[feel] ?? summaries["not-sure"];
  const drynessNote = dryness === "daily"
    ? " You also notice dryness, tightness, or flaking most days."
    : dryness === "sometimes"
      ? " You also notice some dryness or tightness at times."
      : "";
  return { title: summary.title, explanation: `${summary.explanation}${drynessNote}` };
}

export function getSensitivitySummary(answers: QuizAnswers) {
  const sensitivity = answers.sensitivity[0];
  if (sensitivity === "often") return { title: "Frequent reactivity reported", explanation: "You reported that new products often cause stinging, burning, itching, redness, or swelling. Keep changes simple and consider professional advice." };
  if (sensitivity === "sometimes") return { title: "Some reactivity reported", explanation: "You reported occasional reactions to new products, so introduce products one at a time and test them first." };
  if (sensitivity === "rarely") return { title: "Reactions are uncommon", explanation: "You reported that reactions are rare, although any new product can still irritate skin." };
  return { title: "Sensitivity is uncertain", explanation: "You were unsure about product reactions, so introduce new products cautiously." };
}

export function needsProfessionalSupport(answers: QuizAnswers): boolean {
  return answers.impact[0] === "persistent-painful" || answers.sensitivity[0] === "often";
}

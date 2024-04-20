export const progressionSummaryConfig = {
  heading: "Progression summary",
  subHeading: "8 more sessions for s16",
  progress: 40,
  stage: "S15",
  stats: [
    { title: "Max streak", value: "25 days" },
    { title: "Total prog.", value: "62%" },
    { title: "Attempted", value: "92 Qs" },
  ],
}

export const performanceSummaryConfig = {
  heading: "Performance summary",
  subHeading: "Get to 90% accuracy for G8",
  progress: 70,
  stage: "G7",
  stats: [
    { title: "Net score", value: "6,34,678" },
    { title: "Percentile", value: "Top 56" },
    { title: "Accuracy", value: "76%" },
  ],
}

export const strengthWeaknessConfig = {
  heading: "Tier 2",
  subHeading: "Strengths & Weaknesses",
  info: "info",
  strength: [
    { progress: 90, label: "Social Competency", value: "60,564" },
    { progress: 75, label: "Personal Efficiency", value: "58,467" },
    { progress: 60, label: "Peripheral Literacy", value: "32,008" },
    { progress: 90, label: "Social Competency", value: "60,564" },
    { progress: 75, label: "Personal Efficiency", value: "58,467" },
    { progress: 60, label: "Peripheral Literacy", value: "32,008" },
  ],
  weakness: [
    { progress: 55, label: "Functional Acumen", value: "60,564" },
    { progress: 45, label: "Value Dimensions", value: "58,467" },
    { progress: 25, label: "Strengths Compass", value: "32,008" },
    { progress: 55, label: "Functional Acumen", value: "60,564" },
    { progress: 45, label: "Value Dimensions", value: "58,467" },
    { progress: 25, label: "Strengths Compass", value: "32,008" },
  ],
}

export const competenciesGradesCardConfig = {
  heading: "Tier 3",
  subHeading: "Competencies & Grades",
  info: "info",
  competenceInfo: [
    {
      title: "Grade 8 (Above 90%)",
      data: [
        { label: "Networking Skills", variant: "green" },
        { label: "Networking Skills", variant: "yellow" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Probability & Statistic", variant: "green" },
        { label: "Contextual Vocabulary", variant: "yellow" },
        { label: "Probability & Statistic", variant: "blue" },
      ],
    },
    {
      title: "Grade 7 (70 -90%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 6 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 5 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
    {
      title: "Grade 4 (50 -70%)",
      data: [
        { label: "Combinatorics", variant: "blue" },
        { label: "Artistic Expression", variant: "red" },
        { label: "Antonyms & Synonyms", variant: "green" },
        { label: "Contextual Vocabulary", variant: "blue" },
        { label: "Playfulness & Humor", variant: "yellow" },
      ],
    },
  ],
}

export const facetsScoreCardConfig = {
  heading: "Tier 1",
  subHeading: "FACETS Score",
  info: "info",
  facetsScoreGraphConfig: {
    labels: [
      "G2, FLAIR",
      "G6, ASSET",
      "G3, CRAFT",
      "G7, EXTRA",
      "G6, TRAIT",
      "G8, SKILL",
    ],
    datasets: [
      {
        label: "Score",
        data: [7, 5, 5, 6, 9, 6],
        backgroundColor: "rgba(135,220,205,0.2)",
        borderColor: "rgba(135,220,205,1)",
        borderWidth: 1,
      },
    ],
  },
}

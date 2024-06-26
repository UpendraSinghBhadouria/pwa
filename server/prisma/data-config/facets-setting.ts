import { PrismaClient } from '@prisma/client';

export default async function facetsSetting(prisma: PrismaClient) {
  const facetsData = [
    {
      name: 'Flair Series',
      foregroundColor: '#005B21',
      backgroundColor: '#A7F3D0',
    },
    {
      name: 'Asset Series',
      foregroundColor: '#480C84',
      backgroundColor: '#E9D5FF',
    },
    {
      name: 'Craft Series',
      foregroundColor: '#004580',
      backgroundColor: '#BAE6FD',
    },
    {
      name: 'Extra Series',
      foregroundColor: '#834700',
      backgroundColor: '#FDE68A',
    },
    {
      name: 'Trait Series',
      foregroundColor: '#091480',
      backgroundColor: '#C7D2FE',
    },
    {
      name: 'Skill Series',
      foregroundColor: '#800000',
      backgroundColor: '#FECACA',
    },
  ];

  const tier2And3Data = [
    [
      [
        'Creative Potential',
        [
          'Ideation & Originality',
          'Fluency & Flexibility',
          'Complex Imagination',
          'Curious Exploration',
          'Effective Visualization',
          'Artistic Expression',
          'Convergent Thinking',
          'Divergent Thinking',
          'Story-Telling Skills',
          'Playfulness & Humor',
        ],
      ],
      [
        'Numerical Ability',
        [
          'Number Systems',
          'Algebra & Equations',
          'Progression & Series',
          'Averages & Percentages',
          'Ratios & Proportions',
          'Time, Distance & Work',
          'Profit, Loss & Interests',
          'Geometry & Mensuration',
          'Probability & Statistics',
          'Data Interpretation',
          'Pattern Recognition',
          'Combinatorics',
        ],
      ],
      [
        'Verbal Reasoning',
        [
          'Reading Comprehension',
          'Critical Reasoning',
          'Sentence Correction',
          'Sentence Completion',
          'Vocabulary Usage',
          'Logical Analogies',
          'Antonyms & Synonyms',
          'Idioms and Phrases',
          'Words & Para-Jumbles',
          'Paragraph Completion',
          'Inferential Reasoning',
          'Word Relationships',
          'Contextual Vocabulary',
          'Passage Summary',
          'Sequence of Words',
          'Grammar',
        ],
      ],
      [
        'General Aptitude',
        [
          'Analogy Problems',
          'Blood Relations',
          'Cause and Effect',
          'Character Puzzles',
          'Classification',
          'Clocks & Calendar',
          'Coding Decoding',
          'Cube & Cuboid',
          'Data Sufficiency',
          'Dice Problems',
          'Direction & Distance',
          'Input & Output',
          'Seating Arrangement',
          'Series Completion',
          'Syllogism Problems',
          'Venn Diagrams',
          'Verification of Truth',
        ],
      ],
    ],
    [
      [
        'Attitude Essentials',
        [
          'Forward Thinking',
          'Gratitude Practice',
          'Grit & Resilience',
          'Growth Mindset',
          'Integrity & Ethics',
          'Lifelong Learning',
          'Open-Mindedness',
          'Positive Outlook',
          'Proactive Actions',
          'Trustworthiness',
        ],
      ],
      [
        'Personal Efficiency',
        [
          'Adaptability Skills',
          'Managing Goals',
          'Managing Stress',
          'Managing Time',
          'Organization Skills',
          'Productivity Skills',
          'Self Awareness',
          'Self Confidence',
          'Self Discipline',
          'Self Motivation',
        ],
      ],
      [
        'Social Competency',
        [
          'Active Listening',
          'Assertiveness',
          'Collaboration',
          'Communication',
          'Emotional Intelligence',
          'Influencing Skills',
          'Negotiation Skills',
          'Networking Skills',
          'Presentation Skills',
          'Teamwork Skills',
        ],
      ],
      [
        'Professional Vitals',
        [
          'Accountability',
          'Attention to Detail',
          'Decision Making',
          'Leadership Skills',
          'Resourcefulness',
          'Sense of Urgency',
          'Work Etiquettes',
          'Work-Life Balance',
          'Multitasking Skills',
          'Cultural Fitness',
        ],
      ],
    ],
    [
      [
        'Industry Awareness',
        [
          'Agriculture',
          'Automotive',
          'Aviation & Aerospace',
          'Beauty & Fashion',
          'Biotech & Pharma',
          'BPO & KPO',
          'Chemicals',
          'Construction & Real Estate',
          'Defense & Military',
          'Education & Training',
          'Energy & Renewables',
          'Financial Services (BFSI)',
          'Food & FMCG',
          'Gems & Jewellery',
          'Govt. & Public Sector',
          'Healthcare & Social Care',
          'IT Hardware',
          'IT Software',
          'Manufacturing',
          'Media & Entertainment',
          'Metals & Mining',
          'Oil & Gas',
          'Professional Services',
          'Retail & E-Commerce',
          'Shipping & Maritime',
          'Sports & Wellness',
          'Telecommunications',
          'Textile & Apparels',
          'Tourism & Hospitality',
          'Transport & Logistics',
        ],
      ],
      [
        'Functional Acumen',
        [
          'Engineering',
          'Facilities Management',
          'Finance & Accounting',
          'Human Resources (HR)',
          'Information Security',
          'Information Technology',
          'Legal and Compliance',
          'Marketing',
          'Operations',
          'Planning & Strategy',
          'Procurement',
          'Production',
          'Project Management',
          'Public Relations (PR)',
          'Quality (QA/QC)',
          'Research (R&D)',
          'Risk Management',
          'Sales',
          'Supply Chain & Logistics',
          'Talent Acquisition',
          'Training & Development',
        ],
      ],
      [
        'Academic Mastery',
        [
          'Medical Sciences',
          'Physical Sciences',
          'Social Sciences',
          'Computer Science',
          'Arts & Humanities',
          'Law & Legal Studies',
          'Design & Fine Arts',
          'Hospitality',
          'Fashion Design',
          'Architecture',
          'Commerce & Finance',
          'Supply Chain Management',
          'Mass Communication',
          'Performing Arts',
          'Maths & Statistics',
          'Data Science',
          'Artificial Intelligence',
          'Education & Training',
          'Social Work',
          'Civil Services',
          'Food & Agriculture',
          'Aviation & Cabin Crew',
          'Political Science',
        ],
      ],
      [
        'Business Concepts',
        [
          'Agile Methodology',
          'Balanced Scorecard',
          'SWOT Analysis',
          'Design Thinking',
          'Six Sigma',
          'Kaizen',
          'Kanban',
          'Scrum',
          'Blue Ocean Strategy',
          'ERP Systems',
          'Root Cause Analysis',
          'Lean Thinking',
        ],
      ],
    ],
    [
      [
        'Digital Cognizance',
        [
          'Artificial Intelligence',
          'Blockchain & Crypto',
          'Cloud Computing',
          'Programming Logic',
          'Collaboration Tools',
          'Data Science Basics',
          'Digital Citizenship',
          'Digital Commerce',
          'Digital Essentials',
          'Digital Marketing',
          'Extended Reality',
          'Graphic Design',
          'Internet & Email',
          'Internet of Things',
          'Internet Security',
          'Machine Learning',
          'Nanotechnology',
          'Power Search skills',
          'Presentation Tools',
          'Prompt Engineering',
          'Quantum Computing',
          'Social Media Tools',
          'Spreadsheet Tools',
          'Video Production',
          'Word Processors',
        ],
      ],
      [
        'Lingual Proficiency',
        [
          'English L1',
          'English L2',
          'English L3',
          'Hindi L1',
          'Hindi L2',
          'Bengali',
          'Marathi',
          'Telugu',
          'Tamil',
          'Gujarati',
          'Urdu',
          'Kannada',
          'Odia',
          'Malayalam',
          'Punjabi',
          'Mandarin',
          'Spanish',
          'Arabic',
          'Portuguese',
          'Russian',
          'Japanese',
          'German',
          'Korean',
          'French',
          'Italian',
        ],
      ],
      [
        'Peripheral Literacy',
        [
          'Entrepreneurship',
          'Legal Literacy',
          'Financial Literacy',
          'Online Presence',
          'Personal Health',
          'Metacognition',
          'Study Techniques',
          'Agile Principles',
          'Common Sense',
          'Mindful Living',
          'Career Planning',
          'Public Speaking',
          'Body Language',
          'Managing Risks',
          'Delegation Skills',
          'Personal Branding',
        ],
      ],
      [
        'Semantic Memory',
        [
          'Global Business',
          'Current Affairs',
          'General Trivia',
          'Humanities',
          'Literature',
          'Famous People',
          'Pop Culture',
          'World History',
          'World Geography',
          'General Science',
          'Food & Cuisines',
          'Sports & Games',
          'Music & Movies',
          'Technology',
          'Art & Culture',
          'World Politics',
          'Astronomy',
          'Health & Medicine',
          'Fashion & Lifestyle',
        ],
      ],
    ],
    [
      [
        'Personality Profile',
        [
          'Type',
          'Traits',
          'Strengths',
          'Interests',
          'Values',
          'Styles',
          '16Types (MBTI)',
          '9Types',
          '5Traits',
          '4Traits',
        ],
      ],
      ['Strengths Compass', ['SC']],
      ['Interests Inventory', ['II']],
      ['Value Dimensions', ['VD']],
    ],
    [
      ['Speciality Skill 1', ['SS1']],
      ['Speciality Skill 2', ['SS2']],
      ['Speciality Skill 3', ['SS3']],
      ['Speciality Skill 4', ['SS4']],
      ['Speciality Skill 5', ['SS5']],
      ['Speciality Skill 6', ['SS6']],
      ['Speciality Skill 7', ['SS7']],
      ['Speciality Skill 8', ['SS8']],
      ['Speciality Skill 9', ['SS9']],
      ['Speciality Skill 10', ['SS10']],
    ],
  ];

  for (const [index, category] of facetsData.entries()) {
    const existingRecord = await prisma.tier1.findUnique({
      where: { name: category.name },
    });

    if (existingRecord) {
      continue;
    }

    await prisma.tier1.create({
      data: {
        ...category,
        tier2: {
          create: tier2And3Data[index].map((subcategory) => ({
            name: subcategory[0] as string,
            tier3: {
              createMany: {
                data: (subcategory[1] as string[]).map((skill) => ({
                  name: skill,
                })),
                skipDuplicates: true,
              },
            },
          })),
        },
      },
    });
  }
}

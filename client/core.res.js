export const res = [
	{
		testType: "Mix Mode",
		day: 25,
		questionStars: 100,
		preQ: {
			foresight: {
				tier1: {
					name: "FS",
					forgroundColor: "#014455",
					backgroundColor: "#FDE68B",
				},
				tier2: "Attitude Essentials",
				tier3: "Integrity & Ethics",
				avgTime: 9.3,
				accuracy: 98,
				timeLimit: 20,
			},
			powerUps: [
				[
					{
						name: "+4 Seconds",
						codeName: "PLUS_4_SECONDS",
						status: {
							isLocked: false,
							isConsumed: true,
							nextIn: 20,
						},
					},
					{
						name: "+8 Seconds",
						codeName: "PLUS_8_SECONDS",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
				],
				[
					{
						name: "Twice Up",
						codeName: "TWICE_UP",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
					{
						name: "Thrice Up",
						codeName: "THRICE_UP",
						status: {
							isLocked: true,
							isConsumed: false,
							nextIn: null,
						},
					},
					{
						name: "Dice Up",
						codeName: "DICE_UP",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
				],
			],
			wildCards: [
				[
					{
						name: "Ask ABA",
						codeName: "ASK_ABA",
						status: {
							isLocked: false,
							isConsumed: true,
							nextIn: 7,
						},
					},
				],
				[
					{
						name: "Better Half",
						codeName: "BETTER_HALF",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
					{
						name: "Chosen One",
						codeName: "CHOSEN_ONE",
						status: {
							isLocked: true,
							isConsumed: false,
							nextIn: null,
						},
					},
				],
				[
					{
						name: "Double Edge",
						codeName: "DOUBLE_EDGE",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
					{
						name: "Time Machine",
						codeName: "TIME_MACHINE",
						status: {
							isLocked: false,
							isConsumed: false,
							nextIn: null,
						},
					},
				],
			],
		},
		inQ: {
			currentQuestionNo: 10,
			totalQuestions: 20,
			questionType: "MCQ",
			activatedPowerUp: "THRICE_UP",
			question: "What is the capital city of India?",
			options: [
				{
					id: "d1e9c73f-8b6b-4b6e-a6ae-2cf80b6f13e5",
					text: "Mumbai",
					position: 1,
				},
				{
					id: "547c910b-0673-487f-9c0a-96af3d8d7efb",
					text: "Kolkata",
					position: null,
				},
				{
					id: "a5fd7d5a-efdd-4150-a7ae-8b3bf79a388e",
					text: "New Delhi",
					position: 3,
				},
				{
					id: "8f90a62c-1bb8-4c1e-8e2d-01b35c34f4a7",
					text: "Chennai",
					position: null,
				},
			],
			answer: "a5fd7d5a-efdd-4150-a7ae-8b3bf79a388e",
		},
		postQ: {
			isCorrectAnswer: true,
			title: "Woohoo you scored",
			subtitle: "300 stars",
			imageUrl: "",
			contentHeading: "DID YOU KNOW",
			content:
				"New Delhi, the capital city of India, was officially inaugurated as the capital on February 13, 1931. It serves as the seat of all three branches of the Government of India and hosts important landmarks such as India Gate and the Rashtrapati Bhavan. The city was designed by British architects Sir Edwin Lutyens and Sir Herbert Baker during the British colonial period.",
		},
	},
]

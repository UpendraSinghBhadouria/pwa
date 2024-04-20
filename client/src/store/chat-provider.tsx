"use client"
import { createContext, useContext, useState } from "react"
import { create } from "zustand"

type QuestionVariants = "pre-q" | "in-q" | "post-q"

export type Chat = {
  currentStage: QuestionVariants
  activeQuestionnaire: number
  activeQState: string[]
  inQAnswerVisibility: boolean
  questionCount: number
  seriesType: "trait" | "default"
  powerUp:
    | "PLUS_4_SECONDS"
    | "PLUS_8_SECONDS"
    | "TWICE_UP"
    | "THRICE_UP"
    | "DICE_UP"
    | null
  wildCard:
    | "ASK_ABA"
    | "BETTER_HALF"
    | "CHOSEN_ONE"
    | "DOUBLE_EDGE"
    | "TIME_MACHINE"
    | null
  answers: {}
}

const initialState: Chat = {
  currentStage: "pre-q",
  activeQuestionnaire: 0,
  activeQState: [],
  inQAnswerVisibility: true,
  questionCount: 1,
  seriesType: "default",
  powerUp: null,
  wildCard: null,
  answers: {},
}

const createStore = (chat: Chat) =>
  create<{
    chat: Chat
    setCurrentStage: (currentStage: Chat["currentStage"]) => void
    setActiveQuestionnaire: (currentStage: Chat["activeQuestionnaire"]) => void
    setActiveQState: (stage: string) => void
    setInQAnswerVisibility: (
      inQAnswerVisibility: Chat["inQAnswerVisibility"]
    ) => void
    setQuestionCount: (questionCount: Chat["questionCount"]) => void
    setSeriesType: (seriesType: Chat["seriesType"]) => void
    setPowerUp: (powerUp: Chat["powerUp"]) => void
    setWildCard: (wildCard: Chat["wildCard"]) => void
    setAnswersValidity: (answers: {
      [key: number]: "default" | "wrong" | "correct"
    }) => void
  }>((set) => ({
    chat,
    setCurrentStage(currentStage: Chat["currentStage"]) {
      set((prev) => ({ ...prev, chat: { ...prev.chat, currentStage } }))
    },
    setActiveQuestionnaire(activeQuestionnaire: Chat["activeQuestionnaire"]) {
      set((prev) => ({
        ...prev,
        chat: { ...prev.chat, activeQuestionnaire },
      }))
    },
    setActiveQState(stage: string) {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          activeQState: [...prev.chat.activeQState, stage],
        },
      }))
    },
    setInQAnswerVisibility(inQAnswerVisibility: Chat["inQAnswerVisibility"]) {
      set((prev) => ({
        ...prev,
        chat: { ...prev.chat, inQAnswerVisibility },
      }))
    },
    setQuestionCount(questionCount: number) {
      set((prev) => ({
        ...prev,
        chat: { ...prev.chat, questionCount },
      }))
    },
    setSeriesType: (seriesType: Chat["seriesType"]) => {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          seriesType,
        },
      }))
    },
    setPowerUp: (powerUp: Chat["powerUp"]) => {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          powerUp,
        },
      }))
    },
    setWildCard: (wildCard: Chat["wildCard"]) => {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          wildCard,
        },
      }))
    },
    setAnswersValidity(answer: {
      [key: number]: "correct" | "wrong" | "default"
    }) {
      set((prev) => ({
        ...prev,
        chat: {
          ...prev.chat,
          answers: { ...prev.chat.answers, ...answer },
        },
      }))
    },
  }))

const ChatContext = createContext<ReturnType<typeof createStore> | null>(null)

export const useChat = () => {
  if (!ChatContext)
    throw new Error("useCounter must be used within a ChatProvider")
  return useContext(ChatContext)!
}

const ChatProvider = ({
  chat = initialState,
  children,
}: {
  chat?: Chat
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(chat))
  return <ChatContext.Provider value={store}>{children}</ChatContext.Provider>
}

export default ChatProvider

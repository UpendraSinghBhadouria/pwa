"use client"

import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useEffect, useState } from "react"
import useStateRef from "react-usestateref"
import type { Answer, OptionCatagories, Validity } from "../type"
import WildCardDoubleEdge from "../wild-card-double-edge"
import AnswerDialogue from "./answer-dialogue"
import InQAnswer from "./in-q-answer"
import ChosenOne from "./question-type/chosen-one"
import Mcq from "./question-type/mqc"
import Textual from "./question-type/textual"
import QuestionWrapper from "./question-wrapper"
import TransitionWrapper from "./transition-wrapper"
import WildCardAskAba from "./wild-card-ask-aba"

const questionConfig: {
  questionNumber: number
  questionCount: number
  question: string
  options: { id: string; label: string; value: string }[]
  questionType: "mcq" | "textual" | "chosen-one"
  questionDescription?: string
  answer: string
} = {
  questionType: "mcq",
  questionNumber: 2,
  questionCount: 10,
  question: "What is the capital of India.",
  // questionDescription: "Read the statement and select agree or disagree.",
  options: [
    { id: "1", label: "Mumbai", value: "mumbai" },
    { id: "2", label: "Goa", value: "gao" },
    { id: "3", label: "Delhi", value: "delhi" },
    { id: "4", label: "Kolkata", value: "kolkata" },
  ],
  answer: "3",
}

const alphabeticOptionMap = {
  0: "A",
  1: "B",
  2: "C",
  3: "D",
}

const InQ = ({ questionnaire }: { questionnaire: number }) => {
  const {
    chat: { activeQState, currentStage, wildCard },
    setAnswersValidity,
  } = useChat()((state) => state)

  const [showInQ, setShowInQ] = useState(false)
  const [answerBarVisibility, setAnswerBarVisibility] = useState<boolean>(true)
  const [answer, setAnswer] = useState<Answer>()
  const [activeOption, setActiveOption] = useState<string>()
  const [answerValidity, setAnswerValidity, validityRef] =
    useStateRef<Validity>("default")
  const [optionsCategory, setOptionsCategory] =
    useState<OptionCatagories>("full")
  const [ansDialogueMargin, setAnsDialogueMargin] = useState<boolean>(true)
  const [questionType, setQuestionType] = useState<
    "mcq" | "textual" | "chosen-one"
  >(questionConfig.questionType)
  const [options, setOptions] = useState<
    {
      id: string
      label: string
      value: string
    }[]
  >(questionConfig.options)
  const [showDoubleEdgeAba, setShowDoubleEdgeAba] = useState<boolean>(false)
  const [attempt, setAttempt] = useState<number>(0)

  const questionTypeMap = {
    mcq: Mcq,
    textual: Textual,
    "chosen-one": ChosenOne,
  }

  const indexOfCorrect = options.findIndex(
    ({ id }) => id === questionConfig.answer
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps

  const wildCardActionsDefaultConfig = () => {
    setOptionsCategory("full")
    setOptions(questionConfig.options)
    setQuestionType("mcq")
  }

  const wildCardActions = (
    wildCard:
      | "ASK_ABA"
      | "BETTER_HALF"
      | "CHOSEN_ONE"
      | "DOUBLE_EDGE"
      | "TIME_MACHINE"
      | null
  ) => {
    wildCardActionsDefaultConfig()

    switch (wildCard) {
      case "BETTER_HALF":
        const newOptions = options.filter(
          ({ id }) => id === questionConfig.answer
        )

        if (indexOfCorrect < 3) {
          newOptions.push(options[indexOfCorrect + 1])
        } else {
          newOptions.push(options[0])
        }

        setOptionsCategory("partial")
        setOptions(newOptions)
        break

      case "CHOSEN_ONE":
        setQuestionType("chosen-one")
        break

      default:
        break
    }
  }

  useEffect(() => {
    wildCardActions(wildCard)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wildCard])

  useEffect(() => {
    setAnswersValidity({ [questionnaire]: answerValidity })
  }, [answerValidity, questionnaire, setAnswersValidity])

  const defaultQType = "mcq"

  const Question = questionTypeMap[questionType || defaultQType]

  useEffect(() => {
    if (activeQState.includes(`in-q-${questionnaire}`)) {
      setShowInQ(true)
    }
  }, [activeQState, questionnaire])

  return (
    <TransitionWrapper show={showInQ} id={`in-q-${questionnaire}`}>
      <QuestionWrapper
        className={cn(
          "mt-5",
          currentStage === "in-q" && ansDialogueMargin && "mb-[200px]"
        )}
      >
        <Question questionConfig={questionConfig} options={options} />
      </QuestionWrapper>
      {wildCard === "ASK_ABA" && (
        <WildCardAskAba
          answer={
            alphabeticOptionMap[
              indexOfCorrect as keyof typeof alphabeticOptionMap
            ]
          }
          className={cn(currentStage === "in-q" && "mt-[-175px]")}
        />
      )}
      <AnswerDialogue
        className={cn(currentStage === "in-q" && "mb-[200px]")}
        {...answer}
        validity={answerValidity}
      />
      {wildCard === "DOUBLE_EDGE" &&
        showDoubleEdgeAba &&
        answerValidity === "wrong" && (
          <WildCardDoubleEdge
            className={cn(
              currentStage === "in-q" && "mb-[200px] z-50 mt-[-175px]"
            )}
          />
        )}
      {currentStage === "in-q" && answerBarVisibility && (
        <InQAnswer
          setAnswer={setAnswer}
          setActiveOption={setActiveOption}
          activeOption={activeOption}
          options={options}
          setValidity={setAnswerValidity}
          optionsCategory={optionsCategory}
          setAnsDialogueMargin={setAnsDialogueMargin}
          answer={answer}
          questionnaire={questionnaire}
          setAnswerBarVisibility={setAnswerBarVisibility}
          correctAnswer={questionConfig.answer}
          answerValidity={answerValidity}
          setShowDoubleEdgeAba={setShowDoubleEdgeAba}
          attempt={attempt}
          setAttempt={setAttempt}
          validityRef={validityRef}
        />
      )}
    </TransitionWrapper>
  )
}

export default InQ

"use client"

import { Foresight, PowerUps, WildCards } from "../../components"
import type { QuestionProps } from "./series-type"

const Default = ({ questionnaire }: QuestionProps) => {
  return (
    <>
      <Foresight />
      <PowerUps questionnaire={questionnaire} />
      <WildCards questionnaire={questionnaire} />
    </>
  )
}

export default Default

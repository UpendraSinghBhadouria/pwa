"use client"

import { Foresight } from "../../components"
import type { QuestionProps } from "./series-type"

const Trait = ({ ad = false }: QuestionProps) => {
  return (
    <>
      <Foresight />
      {ad && (
        <div className="w-full h-[400px] rounded-[5px] bg-aero-blue animate-pulse" />
      )}
    </>
  )
}

export default Trait

import { Icons } from "@/components/icons"
import React from "react"

const Textual = ({ questionConfig }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-platinum">{`Q ${questionConfig.questionNumber} / ${questionConfig.questionCount}`}</p>
      {questionConfig?.questionDescription && (
        <p className="font-medium text-white">
          {questionConfig?.questionDescription}
        </p>
      )}
      <Icons.quoteRight className="mt-1" />
      <p className="text-sm font-medium">{questionConfig.question}</p>
      <div className="flex w-full justify-end">
        <Icons.quoteRight />
      </div>
    </div>
  )
}

export default Textual

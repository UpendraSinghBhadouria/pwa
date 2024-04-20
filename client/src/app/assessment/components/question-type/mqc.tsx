import { Separator } from "@/components/ui/separator"
import React from "react"

const Mcq = ({ questionConfig, options }: any) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-platinum">{`Q ${questionConfig.questionNumber} / ${questionConfig.questionCount}`}</p>
      <p className="font-medium">{questionConfig.question}</p>
      <div className="">
        {options.map(({ label, value }: any, idx: number) => {
          return (
            <div key={idx}>
              <div className="flex items-center">
                <div className="mr-2 rounded-lg bg-aero-blue text-foreground w-6 h-6 flex justify-center items-center">
                  {String.fromCharCode("A".charCodeAt(0) + idx)}
                </div>
                <p className="text-sm font-medium">{label}</p>
              </div>
              {idx !== options.length - 1 && (
                <Separator className="my-4 bg-celadon-green" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Mcq

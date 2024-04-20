import { Separator } from "@/components/ui/separator"
import React from "react"
import { Progress } from "@/components/ui/progress"

const CustomProgress = ({ progress = 20 }: { progress?: number }) => {
  return (
    <div className="mt-2 relative">
      <Progress
        indicatorClass="bg-eucalyptus rounded-[8px]"
        className="bg-aero-blue h-[26px] rounded-[8px]"
        value={progress}
      />
      <p className="absolute top-[6px] left-2 font-medium text-xs text-eagle-green">{`${progress}% audience choose this`}</p>
    </div>
  )
}

const ChosenOne = ({ questionConfig }: any) => {
  const progressConfig = [20, 30, 60, 23]

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-platinum">{`Q ${questionConfig.questionNumber} / ${questionConfig.questionCount}`}</p>
      <p className="font-medium">{questionConfig.question}</p>
      <div className="">
        {questionConfig.options.map(({ label, value }: any, idx: number) => {
          return (
            <div key={idx}>
              <div className="flex items-center">
                <div className="mr-2 rounded-lg bg-aero-blue text-foreground w-6 h-6 flex justify-center items-center">
                  {String.fromCharCode("A".charCodeAt(0) + idx)}
                </div>
                <p className="text-sm font-medium">{label}</p>
              </div>
              <CustomProgress progress={progressConfig[idx]} />
              {idx !== questionConfig.options.length - 1 && (
                <Separator className="my-4 bg-celadon-green" />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChosenOne

import { cn } from "@/lib/utils"
import React from "react"

type ProgressBarProps = {
  stage?: number
  progressStat?: number
}

const ProgressBar = ({ stage = 1, progressStat = 3 }: ProgressBarProps) => {
  const barManager: { [key: number]: number } = {
    1: 5,
    2: 15,
  }

  return (
    <div className="flex items-center mb-4 ">
      <div className={cn("flex h-9", stage === 1 ? "gap-[6px]" : "gap-[2px]")}>
        {Array(progressStat)
          .fill(null)
          .map((_, idx: number) => (
            <div
              key={idx}
              className={cn(
                "progress-blocks  rounded-xl",
                stage === 1 ? "w-11" : "w-[14px]"
              )}
            ></div>
          ))}

        {Array(barManager[stage] - progressStat)
          .fill(null)
          .map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "bg-skobeloff rounded-xl",
                stage === 1 ? "w-11" : "w-[14px]"
              )}
            ></div>
          ))}
      </div>
      <div className="text-xl font-medium ml-[12px]">{`${progressStat}/${barManager[stage]}`}</div>
    </div>
  )
}

export default ProgressBar

import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import React from "react"

type Stat = {
  value: string
  title: string
}

type ProgressBar = {
  progress: number
  stage?: string
}

type SummaryCardProps = {
  heading: string
  subHeading: string
  progress: number
  stage: string
  stats: Stat[]
}

const ProgressBar = ({ stage, progress }: ProgressBar) => {
  return (
    <div className="mb-6 relative mt-2 w">
      {stage && (
        <div
          style={{
            left: `${progress - 3}%`,
          }}
          className={cn("absolute z-10 top-[-15px] flex justify-center")}
        >
          <Icons.hexagon />
          <p className="absolute top-3 font-semibold text-sm text-white">
            {stage}
          </p>
        </div>
      )}
      <Progress
        indicatorClass="bg-celadon-green"
        className="bg-aero-blue rounded-sm"
        value={progress}
      />
    </div>
  )
}

const StatsRenderer = ({ value, title }: Stat) => {
  return (
    <div className="flex flex-col">
      <p className="text-dark-charcoal text-xs">{title}</p>
      <p className="text-smoky-black font-medium">{value}</p>
    </div>
  )
}

const SummaryCard = ({
  heading,
  progress,
  stage,
  stats,
  subHeading,
}: SummaryCardProps) => {
  return (
    <div className="flex flex-col card-shadow p-[18px] rounded-[10px] bg-white">
      <p className="font-semibold text-lg text-black mb-2">{heading}</p>
      <p className="text-eagle-green text-xs font-medium mb-4">{subHeading}</p>
      <ProgressBar progress={progress} stage={stage} />
      <div className="flex gap-8">
        {stats.map(({ ...rest }, idx) => (
          <StatsRenderer key={idx} {...rest} />
        ))}
      </div>
    </div>
  )
}

export default SummaryCard

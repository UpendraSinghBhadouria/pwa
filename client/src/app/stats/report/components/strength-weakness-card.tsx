"use client"

import { Icons } from "@/components/icons"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useState } from "react"

type ProgressRendererProps = {
  progress: number
  label: string
  value: string
  type?: "strength" | "weakness"
}

type StrengthWeaknessCardProps = {
  heading: string
  subHeading: string
  strength: ProgressRendererProps[]
  weakness: ProgressRendererProps[]
  info?: string
}

const ProgressRenderer = ({
  progress,
  label,
  value,
  type = "strength",
}: ProgressRendererProps) => {
  const variant = {
    strength: {
      indicatorClass: "bg-celadon-green",
      className: "h-3 bg-aero-blue rounded-sm",
    },
    weakness: {
      indicatorClass: "bg-international-orange",
      className: "h-3 bg-light-red rounded-sm",
    },
  }

  return (
    <div>
      <div className="flex text-granite-gray items-center w-[65%] justify-between mb-1">
        <div className="text-sm">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
      <Progress value={progress} {...variant[type]} />
    </div>
  )
}

const StrengthWeaknessCard = ({
  heading,
  subHeading,
  info,
  strength,
  weakness,
}: StrengthWeaknessCardProps) => {
  const [showAll, setShowAll] = useState<boolean>(false)

  const handelClick = () => {
    setShowAll((prev) => !prev)
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col card-shadow p-[18px] rounded-t-[10px] bg-white">
        <p className="font-semibold text-sm text-dark-charcoal mb-2 uppercase">
          {heading}
        </p>
        <div className="flex gap-1 items-center mb-4">
          <p className="text-black text-lg font-medium ">{subHeading}</p>
          {info && (
            <Icons.info className="w-[14px] h-[14px] text-granite-gray cursor-pointer" />
          )}
        </div>
        <div>
          <div className={cn("flex flex-col gap-5")}>
            {(showAll ? strength : strength.slice(0, 3)).map(
              ({ ...rest }, idx) => (
                <ProgressRenderer key={`strength-${idx}`} {...rest} />
              )
            )}
          </div>
          <hr className="mt-5 mb-3 border-dashed border-philippine-silver" />
          <div
            className={cn("flex flex-col gap-5", {
              expand: showAll,
            })}
          >
            {(showAll ? weakness : weakness.slice(0, 3)).map(
              ({ ...rest }, idx) => (
                <ProgressRenderer
                  key={`strength-${idx}`}
                  {...rest}
                  type="weakness"
                />
              )
            )}
          </div>
        </div>
      </div>
      <button
        onClick={handelClick}
        className="h-8 border border-crystal rounded-b-[10px] bg-aero-blue text-sm text-eagle-green flex items-center justify-center gap-1 transition-all duration-200"
      >
        {`View ${showAll ? "less" : "all"}`}
        <Icons.downArrow
          className={cn(
            "w-4 h-4 transition-transform duration-300",
            showAll && "rotate-180"
          )}
        />
      </button>
    </div>
  )
}

export default StrengthWeaknessCard

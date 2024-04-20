import { Icons } from "@/components/icons"
import React from "react"

type CardProps = {
  children: React.ReactNode
  heading: string
  subHeading: string
  info?: string
}

const Card = ({ heading, subHeading, info, children }: CardProps) => {
  return (
    <div className="flex flex-col card-shadow p-[18px] rounded-[10px] bg-white">
      <p className="font-semibold text-sm text-dark-charcoal mb-2 uppercase">
        {heading}
      </p>
      <div className="flex gap-1 items-center mb-4">
        <p className="text-black text-lg font-medium ">{subHeading}</p>
        {info && (
          <Icons.info className="w-[14px] h-[14px] text-granite-gray cursor-pointer" />
        )}
      </div>
      {children}
    </div>
  )
}

export default Card

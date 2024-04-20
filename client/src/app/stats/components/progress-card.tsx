import { Icons } from "@/components/icons"
import React from "react"
import ProgressBar from "./progress-bar"

const ProgressCard = () => {
  return (
    <div className="h-[265px] relative rounded-2xl">
      <div className="w-full h-full bg-eagle-green rounded-2xl absolute z-0 opacity-80" />
      <Icons.statsAba className="absolute z-10 top-[-15px] right-5" />
      <div className="flex p-5 flex-col relative opacity-1">
        <p className="text-sm uppercase text-platinum">Journey</p>
        <p className="font-medium text-[26px] leading-10 mb-6">Stage 1</p>
        <ProgressBar />
        <p className="text-sm text-platinum mb-4">
          Attend 3 more sessions to move to stage 2
        </p>
        <button className="p-3 bg-black font-medium text-lg rounded-lg h-12 flex items-center justify-center">
          View full journey
        </button>
      </div>
    </div>
  )
}

export default ProgressCard

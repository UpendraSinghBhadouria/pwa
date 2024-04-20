import { Icons } from "@/components/icons"
import React from "react"

const RankingPlaceholder = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      <Icons.placeHolderAba />
      <div className="w-[230px] flex items-center justify-center flex-col">
        <p className="text-center text-[26px] text-black font-bold">
          You have no teammates yet
        </p>
        <p className="text-center mt-[10px] text-sm">
          Invite your friends to earn exciting rewards
        </p>
      </div>
      <button className="font-medium w-full bg-black h-12 text-white rounded-lg mt-[30px]">
        Create team
      </button>
    </div>
  )
}

export default RankingPlaceholder

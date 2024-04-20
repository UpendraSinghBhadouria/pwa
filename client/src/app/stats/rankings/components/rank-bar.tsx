import React from "react"
import { Icons } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"

type RankBarProps = {
  avatar: string
  rank: string
  stars: string
  name: string
  stage: string
  href: string
}

const RankBar = ({ avatar, rank, stars, name, stage, href }: RankBarProps) => {
  return (
    <Link
      href={href}
      className="card-shadow px-[10px] h-[54px] w-full bg-white flex items-center rounded-[10px] justify-between"
    >
      <div className="flex items-center">
        <div className="bg-middle-blue-green rounded-full font-medium text-dark-charcoal text-sm min-h-6 min-w-6 items-center justify-center flex mr-3 px-1">
          {rank}
        </div>
        <div className="flex items-center">
          <div className="rounded-full overflow-hidden  w-7 h-7 relative mr-[14px]">
            {avatar ? (
              <Image src={avatar} alt={avatar} layout="fill" />
            ) : (
              <Icons.user />
            )}
          </div>
          <div>
            <p className="font-medium text-[16px] text-eerie-black mb-[-5px] w-[120px] truncate">
              {name}
            </p>
            <p className="font-medium text-[14px] text-skobeloff mt-[-5px]">
              {stage}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 w-[100px]">
        <Icons.rankBarStar />
        <p className="font-medium text-lg text-eerie-black">{stars}</p>
      </div>
    </Link>
  )
}

export default RankBar

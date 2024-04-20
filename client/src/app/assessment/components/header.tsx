"use client"

import { Icons } from "@/components/icons"
import Image from "next/image"
import Link from "next/link"
import Timer from "./timer"

const Header = () => {
  return (
    <header className="flex relative">
      <div className="pt-3 px-2 sm:px-5 gap-2 flex w-[70%] bg-background rounded-t-[22px]  items-center">
        <Link href="/">
          <Icons.leftArrow className="h-7 w-7 cursor-pointer text-primary" />
        </Link>
        <Link href="/">
          <Image src="/bezt-logo.svg" height={36} width={36} alt="bezt-logo" />
        </Link>
        <div>
          <h1 className="text-lg font-medium text-primary relative top-[2px]">
            FACETS
          </h1>
          <p className="text-base text-primary-foreground relative top-[-2px]">
            MIX MODE | DAY 25
          </p>
        </div>
      </div>

      {/* bottom right curve */}
      <div className="relative w-[40px] h-[40px] top-[24px]">
        <div className="absolute w-[32px] h-[32px] left-[-14px] top-[22px] rounded-full bg-background" />
        <div className="absolute bg-background w-[40px] h-[40px] bg-white rounded-full" />
      </div>
      <Timer />
    </header>
  )
}

export default Header

"use client"

import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import React from "react"
import Link from "next/link"

type MobileNavigationBarProps = {
  navigationConfig?: {
    label?: string
    icon: string
    href: string
    fill?: boolean
  }[]
  className?: string
}

const MobileNavigationBar = ({
  navigationConfig = [
    { label: "Stats", icon: "stats", href: "/stats" },
    { label: "Teams", icon: "team", href: "/teams" },
    { label: "Home", icon: "bezt", href: "/" },
    { label: "Jobs", icon: "briefCase", href: "/jobs" },
    { label: "More", icon: "more", href: "/more" },
  ],
  className,
}: MobileNavigationBarProps) => {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed w-inherit bottom-0 p-4 px-6 bg-white h-20 flex rounded-t-lg border-t border-t-aero-blu justify-between",
        className
      )}
    >
      {navigationConfig.map(({ href, icon, label, fill = true }) => {
        const Icon = Icons[icon as keyof typeof Icons]
        const isActive = pathname === href

        return (
          <Link key={href} href={href}>
            <div
              className={cn(
                "relative flex flex-col justify-center items-center gap-1"
              )}
            >
              {isActive && (
                <div className="absolute w-12 h-[2px] bg-dark-slate-gray top-[-17px] rounded-full" />
              )}
              <Icon
                className={cn(
                  "w-6 h-6",
                  isActive && "fill-dark-slate-gray",
                  fill ? "fill-moonstone-blue" : "text-moonstone-blue"
                )}
              />
              {label && (
                <p
                  className={cn(
                    "text-xs text-moonstone-blue",
                    isActive && "text-dark-slate-gray"
                  )}
                >
                  {label}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default MobileNavigationBar

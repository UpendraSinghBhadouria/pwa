"use client"

import { usePathname } from "next/navigation"
import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import React from "react"
import Link from "next/link"

const navigationConfig = [
  { label: "Stats", icon: "stats", href: "/stats" },
  { label: "Teams", icon: "team", href: "/teams" },
  { icon: "bezt", href: "/" },
  { label: "Jobs", icon: "briefCase", href: "/jobs" },
  { label: "More", icon: "more", href: "/more" },
]

const MobileNavigationBar = () => {
  const pathname = usePathname()

  return (
    <div className="fixed w-inherit bottom-0 p-4 px-6 bg-white h-20 flex rounded-t-lg border-t border-t-aero-blu justify-between">
      {navigationConfig.map(({ href, icon, label }) => {
        const Icon = Icons[icon as keyof typeof Icons]
        const isLogo = icon === "bezt"
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
                  "w-6 h-6 fill-moonstone-blue",
                  isActive && "fill-dark-slate-gray",
                  isLogo && "w-12 h-12"
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

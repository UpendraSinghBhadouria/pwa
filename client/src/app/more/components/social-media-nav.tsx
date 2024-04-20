import { Icons } from "@/components/icons"
import Link from "next/link"
import React from "react"
import { socialNavConfig } from "./constants"

type SocialNavItemProps = {
  icon: string
  href: string
}

const SocialNavItem = ({ href, icon }: SocialNavItemProps) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <Link
      href={href}
      className="flex items-center justify-center w-[62px] h-[62px] bg-white rounded-[10px]"
    >
      <Icon className="w-6 h-6" />
    </Link>
  )
}

const SocialNavbar = () => {
  return (
    <div className="mt-5 flex gap-3">
      {socialNavConfig.map(({ ...rest }, idx) => (
        <SocialNavItem key={idx} {...rest} />
      ))}
    </div>
  )
}

export default SocialNavbar

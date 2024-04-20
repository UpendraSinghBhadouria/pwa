import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Link from "next/link"
import type { StatCardProp } from "../type"

const Partial = ({
  icon,
  title,
  description,
  className,
  href,
}: StatCardProp) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <Link className={cn("h-full", className)} href={href}>
      <div
        className={cn(
          "h-full flex flex-col p-4 gap-1 bg-white rounded-[10px] cursor-pointer card-shadow"
        )}
      >
        <div className="progress-blocks w-9 h-9 flex items-center justify-center rounded-[7px]">
          <Icon />
        </div>
        <p className="text-eerie-black text-base font-semibold">{title}</p>
        <p className="text-dark-charcoal text-sm">{description}</p>
      </div>
    </Link>
  )
}

const Cover = ({
  icon,
  title,
  description,
  className,
  href,
  cta = "View full report",
}: StatCardProp) => {
  const Icon = Icons[icon as keyof typeof Icons]

  return (
    <Link className={cn("min-h-32", className)} href={href}>
      <div
        className={cn(
          "relative flex flex-col p-4 gap-1 bg-white rounded-[10px] cursor-pointer card-shadow h-full"
        )}
      >
        <p className="text-eerie-black text-base font-semibold">{title}</p>
        <p className="text-dark-charcoal text-sm w-40">{description}</p>
        <div className="flex items-center gap-2">
          <p className="font-medium text-eerie-black text-sm">{cta}</p>
          <Icons.rightArrow className="w-5 h-4 mt-[-4px] text-eerie-black" />
        </div>
        <Icon className="absolute right-0 top-0" />
      </div>
    </Link>
  )
}

const StatCard = ({ type = "partial", ...rest }: StatCardProp) => {
  const isPartial = type === "partial"

  return <>{isPartial ? <Partial {...rest} /> : <Cover {...rest} />}</>
}

export default StatCard

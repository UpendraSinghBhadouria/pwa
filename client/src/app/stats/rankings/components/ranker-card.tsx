import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

type RankerCardProps = {
  avatar?: string
  stars: string
  rank: number
  name: string
  href: string
}

const RankerCard = ({
  avatar = "/avatar.jpeg",
  stars = "8,56,679",
  rank = 3,
  name = "John",
  href = "#",
}: RankerCardProps) => {
  const rankManager = {
    1: "bg-pink-lace text-dark-magenta border-pink-lace fill-pink-lace",
    2: "bg-crayola text-maroon border-crayola fil-crayola",
    3: "bg-aero-blue text-dark-slate-gray border-aero-blue fill-aero-blue",
  }

  const Icon = Icons[`rank${rank}` as keyof typeof Icons]

  const className = rank as keyof typeof rankManager

  return (
    <Link href={href}>
      <div
        className={cn(
          "relative py-[10px] flex flex-col w-[100px] h-[115px] items-center bg-white rounded-lg",
          rank === 1 ? "h-[125px]" : "h-[115px]"
        )}
      >
        <Icons.rankStar1
          className={cn(
            "absolute left-4 top-8",
            rankManager[className],
            "bg-transparent"
          )}
        />
        <Icons.rankStar2
          className={cn(
            "absolute right-3 top-11",
            rankManager[className],
            "bg-transparent"
          )}
        />
        <div className="flex gap-1 items-center mb-1">
          <p className="font-medium text-xs text-black">{rank}</p>
          <Icon />
        </div>
        <div
          className={cn(
            "rounded-full overflow-hidden border-2 w-8 h-8 relative mb-1",
            `${rankManager[className]}`
          )}
        >
          {avatar ? (
            <Image src={avatar} alt={`rank-${rank}`} layout="fill" />
          ) : (
            <Icons.user />
          )}
        </div>
        <p className="font-medium text-sm text-black">{name}</p>
        <div
          className={cn(
            "h-[22px] w-full flex items-center justify-center text-black text-xs font-medium",
            `${rankManager[className]}`,
            rank === 1 && "mt-[10px]"
          )}
        >
          {stars} {`stars`}
        </div>
      </div>
    </Link>
  )
}

export default RankerCard

import { cn } from "@/lib/utils"
import StatCard from "./components/stat-card"
import type { StatCardProp } from "./type"
import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import Header from "./components/header"

const cardConfig = [
  {
    icon: "rank",
    title: "Ranking",
    description: "Know where you stand",
    href: "/stats/rankings",
  },
  {
    icon: "badge",
    title: "Rewards",
    description: "Powerups, badges and more",
    href: "/stats/rewards",
  },
  {
    icon: "reportGraph",
    title: "Report",
    type: "cover",
    description: "Detailed insights about your performance",
    href: "/stats/report",
  },
]

export default async function Stats() {
  return (
    <>
      <Header />
      <div className="p-5 pb-[105px] relative pt-[376px]">
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
          {cardConfig.map(
            ({ icon, title, description, type, href }: StatCardProp, idx) => {
              const isCover = type === "cover"
              return (
                <StatCard
                  key={idx}
                  href={href}
                  icon={icon}
                  title={title}
                  description={description}
                  type={type}
                  className={cn(
                    isCover ? "col-span-4 row-span-1" : "col-span-2 row-span-1"
                  )}
                />
              )
            }
          )}
        </div>
      </div>
      <MobileNavigationBar className="!w-[380px]" />
    </>
  )
}

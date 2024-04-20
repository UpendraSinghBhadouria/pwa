import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import { cn } from "@/lib/utils"
import StatCard from "./stats/components/stat-card"
import type { StatCardProp } from "./stats/type"

export default async function Home() {
  const cardConfig = [
    {
      icon: "reportGraph",
      title: "Assessment",
      description: "Know where you stand",
      href: "/assessment",
      type: "cover",
      cta: "Take an assessments",
    },
    {
      icon: "aba",
      title: "Profile",
      type: "cover",
      description: "Complete your profile",
      href: "/more/profile",
      cta: "View profile",
    },
  ]

  return (
    <div className="bg-alice-blue w-[380px] no-scrollbar h-screen mx-auto relative z-1 overflow-y-scroll">
      <div className="p-5 pt-0">
        <div className="text-smoky-black h-[65px] flex items-center gap-2">
          <h1 className="font-medium text-lg">Home</h1>
        </div>
        <div className="grid grid-cols-4 grid-rows-2 gap-3">
          {cardConfig.map(
            (
              { icon, title, description, type, href, cta }: StatCardProp,
              idx
            ) => {
              const isCover = type === "cover"
              return (
                <StatCard
                  key={idx}
                  href={href}
                  icon={icon}
                  title={title}
                  description={description}
                  type={type}
                  cta={cta}
                  className={cn(
                    isCover ? "col-span-4 row-span-1" : "col-span-2 row-span-1"
                  )}
                />
              )
            }
          )}
        </div>
      </div>

      <MobileNavigationBar
        navigationConfig={[
          { label: "Stats", icon: "stats", href: "/stats" },
          {
            label: "Rankings",
            icon: "medal",
            href: "/stats/rankings",
            fill: false,
          },
          { icon: "beztLogo", href: "/" },
          {
            label: "Reports",
            icon: "clipboard",
            href: "/stats/report",
            fill: false,
          },
          { label: "More", icon: "more", href: "/more" },
        ]}
      />
    </div>
  )
}

import RankBar from "./components/rank-bar"
import RankingPlaceholder from "./components/ranking-placeholder"

type RankConfig = {
  rank: string
  avatar: string
  stars: string
  name: string
  stage: string
  href: string
}

const rankConfig: RankConfig[] = [
  {
    rank: "4",
    avatar: "/my-avatar.jpeg",
    stars: "2,34,678",
    name: "Paul C. Ramos",
    stage: "S2G5",
    href: "#",
  },
  {
    rank: "5",
    avatar: "/my-avatar.jpeg",
    stars: "1,00,678",
    name: "Maria George Thomson",
    stage: "S2G5",
    href: "#",
  },
  {
    rank: "7",
    avatar: "/my-avatar.jpeg",
    stars: "34,678",
    name: "Paul C. Ramos",
    stage: "S2G5",
    href: "#",
  },
]

export default async function Rankings() {
  return (
    <div className="p-5 pt-[276px] text-black flex flex-col gap-3 bg-alice-blue pb-[84px]">
      {rankConfig.length ? (
        rankConfig.map(({ ...rest }, idx) => <RankBar key={idx} {...rest} />)
      ) : (
        <RankingPlaceholder />
      )}
    </div>
  )
}

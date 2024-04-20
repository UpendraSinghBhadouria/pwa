"use client"

import { Icons } from "@/components/icons"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { parseAsString, useQueryState } from "nuqs"
import RankerCard from "./ranker-card"

const rankConfig = [
  {
    stars: "5,67,234",
    rank: 2,
    name: "Kevin",
    href: "#",
  },
  {
    stars: "8,56,679",
    rank: 1,
    name: "Maria",
    href: "#",
  },
  {
    stars: "7,75,000",
    rank: 3,
    name: "John",
    href: "#",
  },
]

const TopRankers = () => {
  const [type, setType] = useQueryState(
    "rank-type",
    parseAsString.withDefault("my-team")
  )

  return (
    <Tabs defaultValue={type}>
      <div className="flex w-full gap-2 items-center justify-center">
        <TabsList>
          <TabsTrigger
            className="w-[128px]"
            onClick={() => setType("my-team")}
            value="my-team"
          >
            My Teams
          </TabsTrigger>
          <TabsTrigger
            className="w-[128px]"
            onClick={() => setType("overall")}
            value="overall"
          >
            Overall
          </TabsTrigger>
        </TabsList>
        <button className="w-11 h-10 rounded-lg bg-eagle-green flex justify-center items-center">
          <Icons.filter />
        </button>
      </div>

      <TabsContent value="my-team">
        <div className="flex gap-[10px] justify-center items-end mt-4">
          {rankConfig.map(({ ...rest }, idx) => (
            <RankerCard key={idx} {...rest} />
          ))}
        </div>
      </TabsContent>
      <TabsContent value="overall">
        <div className="flex gap-[10px] justify-center items-end mt-4">
          {rankConfig.map(({ ...rest }, idx) => (
            <RankerCard key={idx} {...rest} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default TopRankers

"use client"

import { Icons } from "@/components/icons"
import { useChat } from "@/store/chat-provider"
import { useState } from "react"
import PowerUpCard from "./power-up-card"
import PreQHeading from "./pre-q-heading"
import { cn } from "@/lib/utils"

const WildCards = ({ questionnaire }: { questionnaire: number }) => {
  const [active, setActive] = useState<number | string | undefined>()

  const { setWildCard } = useChat()((state) => state)

  const commonPowerUpProps = {
    activeCard: active,
    setActive,
    active,
    questionnaire,
  }

  return (
    <div>
      <PreQHeading heading="WILDCARDS" />
      <div className="grid grid-cols-6 grid-rows-2 gap-[6px]">
        <div
          className={cn(
            "col-span-2 row-span-2 flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-2 cursor-pointer  transition-all duration-500",
            active === 123 && "bg-eucalyptus"
          )}
          onClick={() => {
            setWildCard("ASK_ABA")
            setActive(123)
          }}
        >
          <Icons.aba className="ml-[-12px]" />
          <p
            className={cn(
              "text-xs font-medium",
              active === 123 ? "text-white" : "text-black"
            )}
          >
            Ask ABA
          </p>
        </div>
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Better Half"
          icon="half2"
          id={1}
          onClick={() => setWildCard("BETTER_HALF")}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Chosen One"
          icon="chart"
          id={2}
          onClick={() => setWildCard("CHOSEN_ONE")}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Double edge"
          icon="heartDouble"
          id={3}
          onClick={() => setWildCard("DOUBLE_EDGE")}
          {...commonPowerUpProps}
        />
        <PowerUpCard
          className="col-span-2 row-span-1"
          description="Time Machine"
          icon="timeMachine"
          onClick={() => setWildCard("TIME_MACHINE")}
          id={4}
          {...commonPowerUpProps}
        />
      </div>
    </div>
  )
}

export default WildCards

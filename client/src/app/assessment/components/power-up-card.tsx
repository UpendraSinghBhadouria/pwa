"use client"

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import { Dispatch, SetStateAction } from "react"
import { useChat } from "@/store/chat-provider"

type CardProps = {
  className: string
  icon: string
  description: string
  id: string | number
  state?: "default" | "locked" | "in-active"
  setActive: Dispatch<SetStateAction<string | number | undefined>>
  activeCard: string | number | undefined
  questionnaire: number
  onClick?: () => void
}

function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

const DefaultCard = ({
  className,
  icon,
  description,
  state,
  id,
  setActive,
  activeCard,
  questionnaire,
  onClick,
}: CardProps) => {
  const isInActive = state === "in-active"

  const {
    chat: { currentStage, activeQuestionnaire },
  } = useChat()((state) => state)

  const isCurrentStagePreQ = currentStage === "pre-q"
  const isActive = !isInActive
  const isQuestionnaireActive = questionnaire === activeQuestionnaire

  const isCardClickable =
    isCurrentStagePreQ && isActive && isQuestionnaireActive

  const iconKey =
    activeCard === id
      ? (`active${capitalizeFirstLetter(icon)}` as keyof typeof Icons)
      : icon

  const Icon = Icons[iconKey as keyof typeof Icons]

  const handleClick = () => {
    if (isCardClickable) {
      activeCard === id ? setActive(undefined) : setActive(id)
      onClick && onClick()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={cn(
        "relative flex flex-col gap-1 bg-white justify-center items-center rounded-lg p-1 overflow-hidden transition-all duration-300",
        className,
        activeCard === id && "bg-eucalyptus",
        isCardClickable ? "cursor-pointer" : "cursor-default"
      )}
    >
      {isInActive && (
        <div className="absolute w-full h-full bg-moonstone-blue opacity-80 cursor-default" />
      )}
      <Icon className={cn(activeCard === id && "stroke-white")} />
      <p
        className={cn(
          "text-black text-xs text-center font-medium transition-all duration-500",
          activeCard === id && "text-white"
        )}
      >
        {description}
      </p>
    </div>
  )
}

const LockedCard = ({ className }: { className: string }) => (
  <div
    className={cn(
      className,
      "flex flex-col gap-1 bg-transparent justify-center items-center rounded-lg p-2 border border-crystal-blue"
    )}
  >
    <Icons.lock />
    <p className="text-xs font-medium">Unlock with streak</p>
  </div>
)

const PowerUpCard = ({ state = "default", ...rest }: CardProps) => {
  const isLocked = state === "locked"

  return (
    <>
      {isLocked ? (
        <LockedCard className={rest.className} />
      ) : (
        <DefaultCard state={state} {...rest} />
      )}
    </>
  )
}

export default PowerUpCard

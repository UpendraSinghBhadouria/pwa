"use client"

import useTimeManager from "@/hooks/useTimeManager"
import useTimer from "@/hooks/useTimer"
import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useEffect, useState } from "react"

const Timer = () => {
  const timeManager = useTimeManager()

  const {
    chat: { currentStage },
  } = useChat()((state) => state)

  const [currentTimeStage, setCurrentTimeStage] = useState(
    timeManager[currentStage]
  )

  const [{ sec }, reset, isTimedOut] = useTimer(currentTimeStage.initialTime)

  useEffect(() => {
    if (isTimedOut) {
      currentTimeStage.onTimeOut()
    }
  }, [currentTimeStage, isTimedOut])

  useEffect(() => {
    reset()
    setCurrentTimeStage(timeManager[currentStage])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStage, reset])

  useEffect(() => {
    const chatBody = document.getElementById("chat-body")

    if (chatBody && currentStage === "post-q") {
      chatBody.classList.add("post-q-scroll")
    } else {
      chatBody && chatBody.classList.remove("post-q-scroll")
    }
  }, [currentStage])

  function getBackgroundColor(sec: number) {
    return sec <= 5
      ? "bg-jelly-bean"
      : sec <= 10
        ? "bg-royal-orange"
        : "bg-mountain-meadow"
  }

  return (
    <div
      className={cn(
        getBackgroundColor(sec),
        "absolute text-sm text-center w-[20%] right-5 bottom-4 font-semibold rounded-[10px] text-white px-4 py-2 transition-all duration-200"
      )}
    >
      {`${sec} | ${currentTimeStage.initialTime}`}
    </div>
  )
}

export default Timer

"use client"

import { Icons } from "@/components/icons"
import { useState } from "react"

type AssessmentButtonProps = {
  onClick?: () => void
}

const AssessmentButton = ({ onClick }: AssessmentButtonProps) => {
  const [buttonVisibility, setButtonVisibility] = useState<boolean>(true)

  return (
    <>
      {buttonVisibility && (
        <button
          className="h-14 w-14 play-button absolute bottom-5 right-5 z-[12]"
          onClick={onClick}
        >
          <Icons.play />
        </button>
      )}
    </>
  )
}

export default AssessmentButton

"use client"

import { cn } from "@/lib/utils"
import QuestionWrapper from "./question-wrapper"

const ChatLoading = ({ load }: { load: boolean }) => {
  return (
    <QuestionWrapper
      className={cn(
        "transition-all duration-500 w-[57px] flex space-x-2 justify-center items-center h-10 p-0",
        load ? "opacity-100 visible" : "opacity-0 invisible absolute top-0"
      )}
    >
      <div className="!ml-0 flex space-x-2 justify-center items-center bg-transparent">
        <div className="h-1 w-1 bg-gray-300 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="h-1 w-1 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="h-[5px] w-[5px] bg-gray-50 rounded-full animate-bounce"></div>
      </div>
    </QuestionWrapper>
  )
}

export default ChatLoading

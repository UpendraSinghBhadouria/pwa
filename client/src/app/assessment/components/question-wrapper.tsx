import React from "react"

const QuestionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={`${className} relative p-5 max-w-[300px] bg-foreground rounded-b-2xl rounded-e-2xl rounded-br-none overflow-hidden flex flex-col gap-7`}
    >
      <div className="border-gradient top-0 left-0 absolute" />
      {children}
    </div>
  )
}

export default QuestionWrapper

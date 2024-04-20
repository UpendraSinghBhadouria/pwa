import React from "react"

const PreQChip = ({
  info = "Next question for 100 stars.",
}: {
  info?: string
}) => {
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-fit h-8 rounded-xl text-sm flex px-2 justify-center bg-dark-slate-gray items-center z-10">
        {info}
      </div>
    </div>
  )
}

export default PreQChip

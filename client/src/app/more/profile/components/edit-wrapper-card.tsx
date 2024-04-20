import { Icons } from "@/components/icons"
import React from "react"

type EditWrapperCardProps = {
  heading?: string | React.ReactNode
  children: React.ReactNode
  onClick?: () => void
  endowment?: React.ReactNode
}

const EditWrapperCard = ({
  children,
  heading,
  onClick,
  endowment,
}: EditWrapperCardProps) => {
  return (
    <div className="relative p-5 card-shadow flex flex-col w-full rounded-[10px]">
      <div className="flex justify-between items-center w-full mb-4">
        {typeof heading === "string" ? (
          <p className="text-[20px] font-medium">{heading}</p>
        ) : (
          <>{heading && heading}</>
        )}
        {onClick && !endowment ? (
          <Icons.edit
            onClick={onClick}
            className="absolute right-5 top-5 cursor-pointer"
          />
        ) : (
          endowment
        )}
      </div>
      {children}
    </div>
  )
}

export default EditWrapperCard

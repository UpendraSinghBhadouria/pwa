import { cn } from "@/lib/utils"
import React from "react"

type ButtonProps = {
  label: string
  onClick?: () => void
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, onClick, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-eagle-green rounded-[8px] font-medium text-white h-12",
        className
      )}
      onClick={onClick}
      {...rest}
    >
      {label}
    </button>
  )
}

export default Button

import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"
import type { Answer, Validity } from "../type"

type AnswerDialogueProps = Answer & {
  validity: Validity
  className?: string
}

const AnswerDialogue = ({
  selectedOption,
  optionValue,
  validity,
  className,
}: AnswerDialogueProps) => {
  const dialogueVariant = (variant: Validity) => {
    const variantUiConfig = {
      icon: { correct: "check", wrong: "cross", default: false },
      className: {
        correct: "!bg-aero-blue",
        wrong: "!bg-light-red",
        default: "",
      },
    }

    return {
      icon: variantUiConfig.icon[variant],
      className: variantUiConfig.className[variant],
    }
  }

  const isDefault = validity === "default"

  const Icon = Icons[dialogueVariant(validity).icon as keyof typeof Icons]

  return (
    <div
      className={cn(
        "w-full flex justify-end my-5 transition-all duration-500",
        className
      )}
    >
      {selectedOption && (
        <div
          className={cn(
            dialogueVariant(validity).className,
            "p-4 max-w-[300px] bg-white rounded-b-2xl rounded-tl-2xl overflow-hidden flex gap-2 justify-center items-center z-10"
          )}
        >
          <div
            className={cn(
              "mr-2 rounded-lg text-foreground h-6 flex justify-center items-center transition-all duration-500",
              isDefault ? "bg-aero-blue" : "bg-white",
              ["A", "B", "C", "D"].includes(optionValue as string)
                ? "w-6"
                : "px-1 w-fit"
            )}
          >
            {optionValue}
          </div>
          <p className="text-black font-medium text-base">
            {selectedOption.label}
          </p>
          {dialogueVariant(validity).icon && <Icon className="w-6 h-6 ml-2" />}
        </div>
      )}
    </div>
  )
}

export default AnswerDialogue

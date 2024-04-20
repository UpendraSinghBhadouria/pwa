import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

const WildCardAskAba = ({
  answer,
  className,
}: {
  answer: string
  className?: string
}) => {
  return (
    <div className={cn("relative w-[90px] mt-[25px]", className)}>
      <div className="rounded-full absolute w-[215px] h-10 bg-ask-aba bottom-[86px] left-[65px] text-sm font-medium px-4 py-[10px]">{`I think ${answer} is the correct answer`}</div>
      <div className="rounded-full absolute w-[10px] h-[10px] bg-ask-aba right-1 bottom-[73px]" />
      <div className="rounded-full absolute w-2 h-2 bg-ask-aba right-3 bottom-[63px]" />
      <div className="rounded-full absolute w-[6px] h-[6px] bg-ask-aba right-5 bottom-[55px]" />
      <Icons.askAba />
    </div>
  )
}

export default WildCardAskAba

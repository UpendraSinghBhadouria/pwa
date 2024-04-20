import { Icons } from "@/components/icons"
import { cn } from "@/lib/utils"

const WildCardDoubleEdge = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative w-[90px] mt-[25px]", className)}>
      <div className="rounded-[13px] absolute w-[118px] h-[80px] bg-ask-aba bottom-[63px] left-[72px] text-sm font-medium px-4 py-[10px]">
        That’s okay , you get one more chance
      </div>
      <div className="rounded-full absolute w-2 h-2 bg-ask-aba right-3 bottom-[50px]" />
      <div className="rounded-full absolute w-[6px] h-[6px] bg-ask-aba right-5 bottom-[40px]" />
      <Icons.askAba />
    </div>
  )
}

export default WildCardDoubleEdge

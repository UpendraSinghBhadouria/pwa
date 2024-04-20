import { cn } from "@/lib/utils"
import { useChat } from "@/store/chat-provider"
import { useEffect, useState } from "react"
import ChatLoading from "./chat-loading"

const TransitionWrapper = ({
  children,
  show,
  id,
  className,
}: {
  children: React.ReactNode
  id: string
  className?: string
  show?: boolean
}) => {
  const {
    chat: { activeQState },
  } = useChat()((state) => state)

  const [load, setLoad] = useState<boolean>(false)

  useEffect(() => {
    let loader = setTimeout(() => {
      setLoad(true)
    }, 100)

    return () => clearTimeout(loader)
  }, [])

  return (
    <div id={id}>
      {!show && activeQState.includes(id) && <ChatLoading load={load} />}
      <div
        className={cn(
          className,
          "transition-all duration-500",
          show ? "opacity-100 visible" : "opacity-0 invisible absolute top-0"
        )}
      >
        {children}
      </div>
    </div>
  )
}

export default TransitionWrapper

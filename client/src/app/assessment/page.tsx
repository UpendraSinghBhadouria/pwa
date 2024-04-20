"use client"

import { useChat } from "@/store/chat-provider"
import { useEffect } from "react"
import { res } from "../../../core.res"
import InQ from "./components/in-q"
import PostQ from "./components/post-q"
import { PreQ } from "./components/pre-q"
import PreQChip from "./components/pre-q-chip"

export default function Chat() {
  const { setQuestionCount } = useChat()((state) => state)

  useEffect(() => {
    setQuestionCount(res.length - 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <PreQChip />
      {res.map(({ preQ, inQ, postQ }, index) => (
        <div key={index}>
          <PreQ {...preQ} questionnaire={index} />
          <InQ {...inQ} questionnaire={index} />
          <PostQ {...postQ} questionnaire={index} />
        </div>
      ))}
    </>
  )
}

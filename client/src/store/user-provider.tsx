"use client"
import { createContext, useContext, useState } from "react"
import { create } from "zustand"

export type User = {
  id: string | number
}

const initialState: User = {
  id: 1,
}

const createStore = (user: User) =>
  create<{
    user: User
    setUser: (data: User) => void
  }>((set) => ({
    user,
    setUser(data: User) {
      set((prev) => ({ ...prev, ...data }))
    },
  }))

const UserContext = createContext<ReturnType<typeof createStore> | null>(null)

export const useUser = () => {
  if (!UserContext)
    throw new Error("useCounter must be used within a ChatProvider")
  return useContext(UserContext)!
}

const UserProvider = ({
  user = initialState,
  children,
}: {
  user?: User
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(user))
  return <UserContext.Provider value={store}>{children}</UserContext.Provider>
}

export default UserProvider

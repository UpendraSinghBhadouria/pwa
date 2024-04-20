import { getUser } from "@/lib/api/user"
import { useQuery } from "@tanstack/react-query"

export const getUsersKey = () => ["userId"]

export const useUsers = () => {
  const result = useQuery({
    queryKey: getUsersKey(),
    queryFn: getUser,
  })

  return result
}

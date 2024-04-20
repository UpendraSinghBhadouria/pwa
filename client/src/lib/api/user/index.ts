import dataProvider from "@/dataProvider"

let fetcher = dataProvider("userInstance")

export const getUser = async () => {
  return fetcher.get("https://jsonplaceholder.typicode.com/users")
}

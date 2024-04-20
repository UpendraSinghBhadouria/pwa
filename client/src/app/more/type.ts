import { UseQueryResult } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { Options } from "nuqs"

export type PageProps = {
  setEdit: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
  profile?: UseQueryResult<AxiosResponse<any, any>, Error>
}

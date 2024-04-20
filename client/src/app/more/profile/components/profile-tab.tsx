"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs"
import { parseAsString, useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import type { EditVariants } from "../type"
import {
  Awards,
  BasicInformation,
  Education,
  Licenses,
  Profile,
  Projects,
  Resume,
  WorkExperience,
} from "./cards"
import { Icons } from "@/components/icons"

type ProfileProps = PageProps & {}

const ProfileTab = ({ setEdit, profile }: ProfileProps) => {
  const [type, setType] = useQueryState(
    "details",
    parseAsString.withDefault("personal")
  )

  const handelEditClick = (card: EditVariants) => {
    setEdit(card)
  }

  const commonProps = {
    onClick: handelEditClick,
    setEdit: setEdit,
  }

  return (
    <Tabs defaultValue={type}>
      <div className="flex w-full gap-2 items-center justify-center">
        <TabsList className="w-full bg-celadon-green">
          <TabsTrigger
            className="w-1/2"
            onClick={() => setType("personal")}
            value="personal"
          >
            Personal details
          </TabsTrigger>
          <TabsTrigger
            className="w-1/2"
            onClick={() => setType("elective")}
            value="elective"
          >
            Electives
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="personal" className="my-5">
        {profile?.isLoading ? (
          <div className="flex flex-col gap-5">
            <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
            <Skeleton className="h-[200px] w-full rounded-xl" />{" "}
            <Skeleton className="h-[200px] w-full rounded-xl" />
            <Skeleton className="h-[200px] w-full rounded-xl" />
          </div>
        ) : (
          <>
            {profile?.isError ? (
              <div className="w-full h-[70vh] flex flex-col justify-center items-center">
                <Icons.sadAba className="ml-[-30px] w-52 h-56" />
                <p className="mt-5 text-2xl font-semibold">
                  Failed to fetch data
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-5 pb-5">
                <Profile {...commonProps} />
                <WorkExperience {...commonProps} />
                <Projects {...commonProps} />
                <Licenses {...commonProps} />
                <Education {...commonProps} />
                <Awards {...commonProps} />
                <Resume />
                <BasicInformation {...commonProps} />
              </div>
            )}
          </>
        )}
      </TabsContent>
      <TabsContent value="elective" className="my-5">
        <div className="flex gap-[10px] justify-center items-end mt-4">
          Test 2
        </div>
      </TabsContent>
    </Tabs>
  )
}

export default ProfileTab

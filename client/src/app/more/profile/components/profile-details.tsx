import { Options } from "nuqs"
import React from "react"
import { EditVariants } from "../type"
import Awards from "./awards"
import BasicInformation from "./basic-information"
import { Profile, WorkExperience, Projects, Resume } from "./cards"
import Education from "./education"
import Licenses from "./licenses"

const ProfileDetails = (props: {
  onClick: (card: EditVariants) => void
  setEdit: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
}) => {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <Profile {...props} />
      <WorkExperience {...props} />
      <Projects {...props} />
      <Licenses {...props} />
      <Education {...props} />
      <Awards {...props} />
      <Resume />
      <BasicInformation {...props} />
    </div>
  )
}

export default ProfileDetails

"use client"

import { useProfile } from "@/query/profile"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddAwards from "./add-awards"
import AddBasicInformation from "./add-basic-information"
import AddEducation from "./add-education"
import AddExperience from "./add-experience"
import AddLicenses from "./add-licenses"
import AddProjects from "./add-projects"
import Awards from "./awards"
import BasicInformation from "./basic-information"
import Education from "./education"
import Licenses from "./licenses"
import ProfileEdit from "./profile-edit"
import ProfileTab from "./profile-tab"
import Projects from "./projects"
import Resume from "./resume"
import WorkExperience from "./work-experience"

const Default = ({ setEdit, ...rest }: PageProps) => (
  <ProfileTab setEdit={setEdit} {...rest} />
)

const PageRenderer = () => {
  const [edit, setEdit] = useQueryState("edit")

  const { profile } = useProfile()

  const pageMap = {
    "work-experience": WorkExperience,
    "add-experience": AddExperience,

    projects: Projects,
    "add-projects": AddProjects,

    licenses: Licenses,
    "add-licenses": AddLicenses,

    education: Education,
    "add-education": AddEducation,

    awards: Awards,
    "add-awards": AddAwards,

    "basic-information": BasicInformation,
    "add-basic-information": AddBasicInformation,

    profile: ProfileEdit,
    resume: Resume,
    default: Default,
  }

  const Page = pageMap[edit as keyof typeof pageMap] || pageMap["default"]

  return <Page profile={profile} setEdit={setEdit} />
}

export default PageRenderer

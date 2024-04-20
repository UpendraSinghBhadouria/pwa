"use client"

import { Icons } from "@/components/icons"
import { useProfileFromData } from "@/store/profile-form-provider"
import Link from "next/link"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const Projects = ({ setEdit }: PageProps) => {
  const [_, setProject] = useQueryState("project")

  const {
    profileFormData: { projects },
  } = useProfileFromData()((state) => state)

  return (
    <AddLayout onClick={() => setEdit && setEdit("add-projects")}>
      {projects.map(({ title, link, description }, idx) => {
        return (
          <EditWrapperCard
            onClick={() => {
              setProject(`${idx}`)
              setEdit && setEdit("add-projects")
            }}
            key={`${title}_${idx}`}
          >
            <p className="text-smoky-black font-medium mb-1">{title}</p>
            <div className="text-eerie-black text-sm" key={`${title}-${idx}`}>
              {description}
            </div>
            <Link
              href={link}
              className="flex gap-2 items-center text-skobeloff font-semibold mt-1"
            >
              <p className=""> Link to credential</p>
              <Icons.rightArrow className="w-4 h-4" />
            </Link>
          </EditWrapperCard>
        )
      })}
    </AddLayout>
  )
}

export default Projects

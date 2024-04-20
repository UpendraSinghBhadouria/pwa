"use client"

import { Icons } from "@/components/icons"
import { useProfileFromData } from "@/store/profile-form-provider"
import Link from "next/link"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const Awards = ({ setEdit }: PageProps) => {
  const [_, setAward] = useQueryState("awards")

  const {
    profileFormData: { awards },
  } = useProfileFromData()((state) => state)

  return (
    <AddLayout onClick={() => setEdit && setEdit("add-awards")}>
      {awards.map(({ title, link, description }, idx) => {
        return (
          <EditWrapperCard
            onClick={() => {
              setAward(`${idx}`)
              setEdit && setEdit("add-awards")
            }}
            key={`${title}_${idx}`}
          >
            <p className="text-smoky-black font-medium">{title}</p>
            <p className="text-eerie-black text-sm">{description}</p>
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

export default Awards

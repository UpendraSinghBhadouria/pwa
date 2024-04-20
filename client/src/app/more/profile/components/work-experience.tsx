"use client"

import { dateDiffInYearsOrMonths, monthNames } from "@/lib/utils"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const WorkExperience = ({ setEdit }: PageProps) => {
  const [_, setWork] = useQueryState("work")

  const {
    profileFormData: { experience },
  } = useProfileFromData()((state) => state)

  return (
    <AddLayout
      onClick={() => {
        setEdit && setEdit("add-experience")
      }}
    >
      {experience?.map(
        ({ company, title, startDate: sDate, endDate: eDate }, idx: number) => {
          const startDate = new Date(sDate)
          const endDate = new Date(eDate)

          const timeDiff = dateDiffInYearsOrMonths(endDate, startDate)

          return (
            <EditWrapperCard
              onClick={() => {
                setWork(`${idx}`)
                setEdit && setEdit("add-experience")
              }}
              key={`${company}_${idx}`}
            >
              <p className="text-smoky-black font-medium">{title}</p>
              <p className="text-eerie-black text-sm font-medium">{company}</p>
              <div className="flex gap-2 items-center text-sm mt-1">
                <p className="text-eerie-black">
                  {`${startDate.getFullYear()} ${monthNames[startDate.getMonth()]}`}
                  -
                  {`${endDate.getFullYear()} ${monthNames[endDate.getMonth()]}`}
                </p>
                <div className="w-1 h-1 rounded-full bg-eerie-black" />
                <p className="text-eerie-black">{timeDiff}</p>
              </div>
            </EditWrapperCard>
          )
        }
      )}
    </AddLayout>
  )
}

export default WorkExperience

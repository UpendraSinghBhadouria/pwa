"use client"

import { useProfileFromData } from "@/store/profile-form-provider"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const Education = ({ setEdit }: PageProps) => {
  const [_, setEducation] = useQueryState("education")

  const {
    profileFormData: { education },
  } = useProfileFromData()((state) => state)

  return (
    <AddLayout onClick={() => setEdit && setEdit("add-education")}>
      {education.map(
        ({ institution, degree, startDate: sDate, endDate: eDate }, idx) => {
          const startDate = new Date(sDate)
          const endDate = new Date(eDate)

          return (
            <EditWrapperCard
              onClick={() => {
                setEducation(`${idx}`)
                setEdit && setEdit("add-education")
              }}
              key={`${institution}_${idx}`}
            >
              <p className="text-smoky-black font-medium">{institution}</p>
              <p className="text-eerie-black text-sm">{degree}</p>

              <p className="text-eerie-black text-sm mt-1">{`${startDate.getFullYear()}-${endDate.getFullYear()}`}</p>
            </EditWrapperCard>
          )
        }
      )}
    </AddLayout>
  )
}

export default Education

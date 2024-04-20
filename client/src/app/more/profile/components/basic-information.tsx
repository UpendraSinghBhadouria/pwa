"use client"

import { cn } from "@/lib/utils"
import { useProfileFromData } from "@/store/profile-form-provider"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const BasicInformation = ({ setEdit }: PageProps) => {
  const [_, setBasicInfo] = useQueryState("basic")

  const {
    profileFormData: { basicInformation },
  } = useProfileFromData()((state) => state)

  const { address, dob, email, phoneNumber } = basicInformation

  return (
    <AddLayout onClick={() => setEdit && setEdit("add-basic-information")}>
      <EditWrapperCard
        onClick={() => {
          setEdit && setEdit("add-basic-information")
        }}
      >
        <div className="mb-4">
          <p className="text-dark-charcoal text-sm">Email</p>
          <p
            className={cn(
              "text-smoky-black font-medium",
              email ? "text-smoky-black" : "text-dark-slate-gray"
            )}
          >
            {email ? email : "No email added"}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-dark-charcoal text-sm">Date of birth</p>
          <p
            className={cn(
              "text-smoky-black font-medium",
              dob ? "text-smoky-black" : "text-dark-slate-gray"
            )}
          >
            {dob
              ? new Date(dob).toISOString().slice(0, 10)
              : "No date of birth added"}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-dark-charcoal text-sm">Phone number</p>
          <p
            className={cn(
              "text-smoky-black font-medium",
              phoneNumber ? "text-smoky-black" : "text-dark-slate-gray"
            )}
          >
            {phoneNumber ? phoneNumber : "No phone number added"}
          </p>
        </div>
        <div>
          <p className="text-dark-charcoal text-sm">Address</p>
          <p
            className={cn(
              "text-smoky-black font-medium",
              address ? "text-smoky-black" : "text-dark-slate-gray"
            )}
          >
            {address ? address : "No address added"}
          </p>
        </div>
      </EditWrapperCard>
    </AddLayout>
  )
}

export default BasicInformation

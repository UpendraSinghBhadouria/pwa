"use client"

import { Icons } from "@/components/icons"
import { monthNames } from "@/lib/utils"
import { useProfileFromData } from "@/store/profile-form-provider"
import Image from "next/image"
import Link from "next/link"
import { useQueryState } from "nuqs"
import type { PageProps } from "../../type"
import AddLayout from "./add-layout"
import EditWrapperCard from "./edit-wrapper-card"

const Licenses = ({ setEdit }: PageProps) => {
  const [_, setLicense] = useQueryState("license")

  const {
    profileFormData: { licenses },
  } = useProfileFromData()((state) => state)

  return (
    <AddLayout onClick={() => setEdit && setEdit("add-licenses")}>
      {licenses.map(
        (
          {
            certification,
            startDate: sDate,
            expiryDate: eDate,
            link,
            provider,
            companyImage,
          },
          idx
        ) => {
          const startDate = new Date(sDate)
          const expiryDate = new Date(eDate)

          return (
            <EditWrapperCard
              onClick={() => {
                setLicense(`${idx}`)
                setEdit && setEdit("add-licenses")
              }}
              key={`${certification}_${idx}`}
            >
              <div key={idx} className="flex items-start gap-3">
                {companyImage && (
                  <Image
                    src={companyImage}
                    alt="company-img"
                    width={40}
                    height={40}
                  />
                )}

                <div>
                  <p className="text-smoky-black font-medium max-w-[200px] truncate">
                    {certification}
                  </p>
                  <p className="text-eerie-black text-sm">{provider}</p>
                  <div className="flex gap-2 items-center text-sm mt-1">
                    <p className="text-dark-liver">
                      Issued{" "}
                      {`${monthNames[startDate.getMonth()]} ${startDate.getFullYear()}`}
                    </p>
                    <div className="w-1 h-1 rounded-full bg-eerie-black" />
                    <p className="text-dark-liver">
                      Expires{" "}
                      {`${monthNames[expiryDate.getMonth()]} ${expiryDate.getFullYear()}`}
                    </p>
                  </div>
                  <Link
                    href={link}
                    className="flex gap-2 items-center text-skobeloff font-semibold"
                  >
                    <p className=""> Link to credential</p>
                    <Icons.rightArrow className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </EditWrapperCard>
          )
        }
      )}
    </AddLayout>
  )
}

export default Licenses

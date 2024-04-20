import { Icons } from "@/components/icons"
import { cn, dateDiffInYearsOrMonths, monthNames } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { ChangeEvent, useRef, useState } from "react"
import type { EditVariants } from "../type"
import EditWrapperCard from "./edit-wrapper-card"
import { Options } from "nuqs"
import { useProfileFromData } from "@/store/profile-form-provider"

type CommonCardProps = {
  onClick: (card: EditVariants) => void
  setEdit?: <Shallow>(
    value: string | ((old: string | null) => string | null) | null,
    options?: Options<Shallow> | undefined
  ) => Promise<URLSearchParams>
}

export const Profile = ({ onClick }: CommonCardProps) => {
  const {
    profileFormData: { profileEdit },
  } = useProfileFromData()((state) => state)

  const {
    avatar,
    email,
    username,
    bio: description,
    firstName,
    lastName,
  } = profileEdit

  const name = firstName + " " + lastName

  return (
    <EditWrapperCard
      onClick={() => onClick("profile")}
      heading={
        <div
          className={cn(
            "relative h-[60px] w-[60px] flex items-center rounded-full justify-center overflow-hidden",
            avatar?.initials && `bg-pastel-yellow`
          )}
        >
          {avatar?.src ? (
            <Image src={avatar?.src} alt="profile-img" layout="fill" />
          ) : (
            <p className="text-[23px] font-semibold text-skobeloff">
              {avatar?.initials}
            </p>
          )}
        </div>
      }
    >
      <p className="font-medium text-[22px] mb-1">{name}</p>
      <p className="text-smoky-black mb-9">{description}</p>
      <p className="text-granite-gray text-sm">@{username}</p>
    </EditWrapperCard>
  )
}

export const WorkExperience = ({ onClick, setEdit }: CommonCardProps) => {
  const workExConfig: any = {
    profileCompletion: "6%",
  }

  const {
    profileFormData: { experience },
  } = useProfileFromData()((state) => state)

  const isEmpty = experience?.length === 0

  return (
    <EditWrapperCard
      onClick={() => {
        isEmpty
          ? onClick("add-experience")
          : setEdit && setEdit("work-experience")
      }}
      heading="Work Experience"
      endowment={
        isEmpty ? (
          <div className="bg-azureish-white px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${workExConfig?.profileCompletion} profile`}
          </div>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        experience?.map(
          (
            { company, title, startDate: date, endDate: eDate },
            idx: number
          ) => {
            const startDate = new Date(date)
            const endDate = new Date(eDate)

            const timeDiff = dateDiffInYearsOrMonths(
              new Date(endDate),
              new Date(startDate)
            )

            return (
              <React.Fragment key={`${company}_${idx}`}>
                <p className="text-smoky-black font-medium">{title}</p>
                <p className="text-eerie-black text-sm font-medium">
                  {company}
                </p>
                <div className="flex gap-2 items-center text-sm mt-1">
                  <p className="text-eerie-black">
                    {`${startDate.getFullYear()} ${monthNames[startDate.getMonth()]}`}
                    -
                    {`${endDate.getFullYear()} ${monthNames[endDate.getMonth()]}`}
                  </p>
                  <div className="w-1 h-1 rounded-full bg-eerie-black" />
                  <p className="text-eerie-black">{timeDiff}</p>
                </div>
                {idx !== experience.length - 1 && (
                  <hr className="border-platinum my-4" />
                )}
              </React.Fragment>
            )
          }
        )
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer "
            onClick={() => setEdit && setEdit("add-experience")}
          />
          <p className="text-skobeloff font-medium">Add work experience</p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Projects = ({ onClick, setEdit }: CommonCardProps) => {
  const projectConfig: any = {
    profileCompletion: "2%",
  }

  const {
    profileFormData: { projects },
  } = useProfileFromData()((state) => state)

  const isEmpty = projects?.length === 0

  return (
    <EditWrapperCard
      onClick={() =>
        isEmpty ? onClick("add-projects") : setEdit && setEdit("projects")
      }
      heading="Projects"
      endowment={
        isEmpty ? (
          <div className="bg-azureish-white px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${projectConfig?.profileCompletion} profile`}
          </div>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        <>
          {projects?.map(({ title, link, description }, idx) => {
            return (
              <React.Fragment key={idx}>
                <p className="text-smoky-black font-medium mb-1">{title}</p>
                <div
                  className="text-eerie-black text-sm"
                  key={`${title}-${idx}`}
                >
                  {description}
                </div>
                <Link
                  href={link}
                  className="flex gap-2 items-center text-skobeloff font-semibold mt-1"
                >
                  <p className=""> Link to credential</p>
                  <Icons.rightArrow className="w-4 h-4" />
                </Link>
                {idx !== projects.length - 1 && (
                  <hr className="border-platinum my-4" />
                )}
              </React.Fragment>
            )
          })}
        </>
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer "
            onClick={() => setEdit && setEdit("add-projects")}
          />
          <p className="text-skobeloff font-medium">Add your main projects</p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Licenses = ({ onClick, setEdit }: CommonCardProps) => {
  const licensesConfig: any = {
    profileCompletion: "2%",
  }

  const {
    profileFormData: { licenses },
  } = useProfileFromData()((state) => state)

  const isEmpty = licenses?.length === 0

  return (
    <EditWrapperCard
      onClick={() => onClick("licenses")}
      heading="Licenses & certifications"
      endowment={
        isEmpty ? (
          <div className="bg-azureish-white px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${licensesConfig?.profileCompletion} profile`}
          </div>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        <>
          {licenses?.map(
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
                <React.Fragment key={idx}>
                  <div className="flex items-start gap-3">
                    {companyImage && (
                      <Image
                        src={companyImage}
                        alt="company-img"
                        width={40}
                        height={40}
                      />
                    )}
                    <div>
                      <p className="text-smoky-black font-medium">
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
                  {idx !== licenses.length - 1 && (
                    <hr className="border-platinum my-4" />
                  )}
                </React.Fragment>
              )
            }
          )}
        </>
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer"
            onClick={() => setEdit && setEdit("add-licenses")}
          />
          <p className="text-skobeloff font-medium">
            Add any certifications you hve
          </p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Education = ({ onClick, setEdit }: CommonCardProps) => {
  const educationConfig: any = {
    profileCompletion: "2%",
  }

  const {
    profileFormData: { education },
  } = useProfileFromData()((state) => state)

  const isEmpty = education?.length === 0

  return (
    <EditWrapperCard
      onClick={() => onClick("education")}
      heading="Education"
      endowment={
        isEmpty ? (
          <div className="bg-azureish-white px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${educationConfig?.profileCompletion} profile`}
          </div>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        <>
          {education?.map(
            (
              { institution, degree, startDate: sDate, endDate: eDate },
              idx
            ) => {
              const startDate = new Date(sDate)
              const endDate = new Date(eDate)

              return (
                <React.Fragment key={`${institution}_${idx}`}>
                  <p className="text-smoky-black font-medium">{institution}</p>
                  <p className="text-eerie-black text-sm">{degree}</p>

                  <p className="text-eerie-black text-sm mt-1">{`${startDate.getFullYear()}-${endDate.getFullYear()}`}</p>
                  {idx !== education.length - 1 && (
                    <hr className="border-platinum my-4" />
                  )}
                </React.Fragment>
              )
            }
          )}
        </>
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer "
            onClick={() => setEdit && setEdit("add-education")}
          />
          <p className="text-skobeloff font-medium">
            Add your education details.
          </p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Awards = ({ onClick, setEdit }: CommonCardProps) => {
  const awardsConfig: any = {
    profileCompletion: "2%",
  }

  const {
    profileFormData: { awards },
  } = useProfileFromData()((state) => state)

  const isEmpty = awards?.length === 0

  return (
    <EditWrapperCard
      onClick={() => onClick("awards")}
      heading="Awards and achievements"
      endowment={
        isEmpty ? (
          <p className="bg-azureish-white min-w-20 px-2 py-[2px] rounded-[4px] text-sm text-eagle-green">
            {`${awardsConfig?.profileCompletion} profile`}
          </p>
        ) : (
          false
        )
      }
    >
      {!isEmpty ? (
        <>
          {awards?.map(({ title, link, description }, idx) => {
            return (
              <React.Fragment key={idx}>
                <p className="text-smoky-black font-medium">{title}</p>
                <p className="text-eerie-black text-sm">{description}</p>
                <Link
                  href={link}
                  className="flex gap-2 items-center text-skobeloff font-semibold mt-1"
                >
                  <p className=""> Link to credential</p>
                  <Icons.rightArrow className="w-4 h-4" />
                </Link>
                {idx !== awards.length - 1 && (
                  <hr className="border-platinum my-4" />
                )}
              </React.Fragment>
            )
          })}
        </>
      ) : (
        <div className="h-full flex items-center gap-4">
          <Icons.add
            className="cursor-pointer "
            onClick={() => setEdit && setEdit("add-awards")}
          />
          <p className="text-skobeloff font-medium">
            Add awards or achievements
          </p>
        </div>
      )}
    </EditWrapperCard>
  )
}

export const Resume = () => {
  const [file, setFile] = useState<File>()
  const fileInputRef = useRef(null)

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    ;(fileInputRef?.current as HTMLInputElement | null)?.click()
  }

  return (
    <EditWrapperCard heading="Resume">
      <input
        className="hidden"
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <button
        className="h-20 border-dashed border border-philippine-silver rounded-xl p-5"
        onClick={handleButtonClick}
      >
        <div className="flex justify-between items-center h-full">
          <div className="text-left">
            <p className="font-medium text-smoky-black">Upload your resume</p>
            <p className="text-dark-charcoal font-medium text-sm">
              File format: PDF, Doc
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl text-white bg-celadon-green flex items-center justify-center">
            <Icons.upload />
          </div>
        </div>
      </button>
    </EditWrapperCard>
  )
}
export const BasicInformation = ({ onClick }: CommonCardProps) => {
  const {
    profileFormData: { basicInformation },
  } = useProfileFromData()((state) => state)

  const { address, dob, email, phoneNumber } = basicInformation

  return (
    <EditWrapperCard
      onClick={() => onClick("basic-information")}
      heading="Basic Information"
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
  )
}

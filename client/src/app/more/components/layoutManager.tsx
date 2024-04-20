"use client"

import { Icons } from "@/components/icons"
import MobileNavigationBar from "@/components/shared/mobile-navigation-bar"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import React, { Suspense } from "react"
import { Header as MoreHeader } from "./header"

type LayoutProps = { children: React.ReactNode }

const More = ({ children }: LayoutProps) => {
  return (
    <>
      <MoreHeader />
      <div>{children}</div>
      <MobileNavigationBar />
    </>
  )
}

const Profile = ({ children }: LayoutProps) => {
  const searchParams = useSearchParams()

  const edit = searchParams.get("edit")
  const work = searchParams.get("work")
  const project = searchParams.get("project")
  const license = searchParams.get("license")
  const education = searchParams.get("education")
  const awards = searchParams.get("awards")
  const basic = searchParams.get("basic")

  const navHeadingMap = {
    profile: "Basic Information",
    "work-experience": "Work experiences",
    "add-experience": work ? "Edit experience" : "Add experience",

    projects: "Projects",
    "add-projects": project ? "Edit projects" : "Add Projects",

    licenses: "Licenses & certifications",
    "add-licenses": license
      ? "Edit licenses & certifications"
      : "Add licenses & certifications",

    education: "Education",
    "add-education": education ? "Edit education" : "Add Education",

    awards: "Awards and achievements",
    "add-awards": awards
      ? "Edit awards and achievements"
      : "Add awards and achievements",

    "basic-information": "Basic Information",
    "add-basic-information": basic
      ? "Edit basic information"
      : "Add basic Information",

    default: "My profile",
  }

  const url = Object.keys(navHeadingMap).includes(edit as string)
    ? "/more/profile"
    : "/"

  const heading =
    navHeadingMap[edit as keyof typeof navHeadingMap] ||
    navHeadingMap["default"]

  return (
    <>
      <div className="h-[65px] flex items-center gap-2 text-black p-5">
        <Link href={url}>
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">{heading}</h1>
      </div>
      {children}
    </>
  )
}

const Filter = ({ children }: LayoutProps) => {
  return (
    <>
      <div className="h-[65px] flex items-center gap-2 text-black p-5">
        <Link href="/more/profile?details=elective">
          <Icons.leftArrow className="w-7 h-7" />
        </Link>
        <h1 className="font-medium text-lg">Filter</h1>
      </div>
      {children}
    </>
  )
}

function LayoutManager({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const layoutMap = {
    "/more/profile/filter": Filter,
    "/more/profile": Profile,
    "/more": More,
  }

  const CurrentLayout = layoutMap[pathname as keyof typeof layoutMap]

  return (
    <Suspense>
      <CurrentLayout>{children}</CurrentLayout>
    </Suspense>
  )
}

export default LayoutManager

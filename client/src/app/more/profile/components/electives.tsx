"use client"

import React, { useState } from "react"
import ElectiveCard from "./elective-card"
import { Icons } from "@/components/icons"
import Link from "next/link"

const electiveConfig = [
  {
    heading: "Lingual Proficiency",
    subHeading: "extra series",
    proficiencies: ["Spanish", "Telugu", "Malayalam"],
  },
  {
    heading: "Industry Awareness",
    subHeading: "craft series",
    proficiencies: ["Media & Entertainment", "Chemicals", "Food & FMCG"],
  },
  {
    heading: "Academic Mastery",
    subHeading: "craft series",
    proficiencies: [
      "Class 8, 9 and 10",
      "Class 11, 12 - PCM",
      "Engineering (Core)",
    ],
  },
  {
    heading: "Digital Cognizance",
    subHeading: "Extra series",
    proficiencies: [
      "Internet Security",
      "Quantum Computing",
      "Spreadsheet Tools",
    ],
  },
]

const Elective = ({
  proficiencies: skills,
  heading,
  subHeading,
}: {
  heading: string
  subHeading: string
  proficiencies: string[]
}) => {
  const [proficiencies, setProficiencies] = useState<string[]>(skills)

  return (
    <ElectiveCard
      heading={heading}
      subHeading={subHeading}
      proficiencies={proficiencies}
      setProficiencies={setProficiencies}
    />
  )
}

const Electives = () => {
  return (
    <div className="flex flex-col gap-[18px] justify-center items-end mt-4 pb-5">
      <Link
        href="/more/profile/filter?details=elective"
        className="absolute top-3 cursor-pointer right-5"
      >
        <Icons.electiveFilter />
      </Link>
      {electiveConfig.map((elective, idx) => {
        return (
          <Elective
            key={`elective_${idx}`}
            {...elective}
            proficiencies={elective.proficiencies}
          />
        )
      })}
    </div>
  )
}

export default Electives

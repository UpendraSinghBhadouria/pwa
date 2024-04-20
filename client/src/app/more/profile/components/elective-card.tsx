import { Icons } from "@/components/icons"
import React, { useEffect, useState } from "react"
import ElectiveDrawer from "./elective-drawer"

type ElectiveCardProps = {
  heading: string
  subHeading: string
  proficiencies: string[]
  setProficiencies: React.Dispatch<React.SetStateAction<string[]>>
}

const otherOptions = [
  "Malayalam",
  "Telugu",
  "Spanish",
  "Gujarati",
  "Spanish",
  "Kannada",
  "Odia",
  "Punjabi",
  "Mandarin",
  "Arabic",
  "Portuguese",
  "Russian",
  "Japanese",
]

const OptionRenderer = ({
  proficiencies,
  options,
  setProficiencies,
}: {
  proficiencies: string[]
  options: string[]
  setProficiencies: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const [otherOptions, setOtherOptions] = useState<string[]>(options)

  useEffect(() => {
    setOtherOptions((prev) =>
      prev?.filter((itm) => !proficiencies.includes(itm))
    )
  }, [proficiencies])

  return (
    <div className="flex flex-col gap-7 max-h-96 overflow-scroll no-scrollbar">
      <div>
        <div className="flex justify-between">
          <p className="mb-4 text-xl font-medium text-black">
            Your current selection
          </p>
          <p className="text-smoky-black">{`${proficiencies.length}/${otherOptions.length + proficiencies.length}`}</p>
        </div>
        <div className="flex gap-[10px] flex-wrap">
          {proficiencies.map((option, idx) => (
            <div
              className="bg-azureish-white py-[2px] px-[6px] flex items-center gap-[6px] rounded-sm border border-crystal"
              key={`${option}_${idx}`}
            >
              {option}
              <Icons.cancel
                onClick={() => {
                  setProficiencies((prev) =>
                    prev.filter((itm) => itm !== option)
                  )
                  setOtherOptions((prev) => [...prev, option])
                }}
                className="cursor-pointer"
              />
            </div>
          ))}
          {proficiencies.length === 0 && (
            <p className="text-imperial-red">
              You have to select at least one option
            </p>
          )}
        </div>
      </div>
      <div>
        <p className="mb-4 text-xl font-medium text-black">Other options</p>
        <div className="flex gap-[10px] flex-wrap">
          {otherOptions?.toSorted().map((option, idx) => (
            <div
              className="bg-transparent py-[2px] px-[6px] cursor-pointer rounded-sm border border-platinum"
              key={`${option}_${idx}`}
              onClick={() => setProficiencies((prev) => [...prev, option])}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const ElectiveCard = ({
  heading,
  subHeading,
  proficiencies,
  setProficiencies,
}: ElectiveCardProps) => {
  return (
    <div className="w-full p-5 bg-white rounded-[10px]">
      <div className="flex justify-between items-center">
        <p className="font-medium text-xl">{heading}</p>
        <ElectiveDrawer
          heading={heading}
          note="Username can only be changed in 272 days2"
        >
          <OptionRenderer
            options={otherOptions}
            proficiencies={proficiencies}
            setProficiencies={setProficiencies}
          />
        </ElectiveDrawer>
      </div>
      <p className="text-sm font-medium uppercase text-dark-charcoal">
        {subHeading}
      </p>

      <div className="mt-3 flex gap-2 flex-wrap">
        {proficiencies.map((proficiency, idx) => (
          <div
            className="bg-azureish-white py-[2px] px-[6px] rounded-sm"
            key={`${proficiency}_${idx}`}
          >
            <p className="text-eagle-green text-sm">{proficiency}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ElectiveCard

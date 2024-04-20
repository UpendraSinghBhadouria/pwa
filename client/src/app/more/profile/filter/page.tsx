"use client"

import Button from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Select from "@/components/shared/select"
import React, { useState } from "react"
import { Separator } from "@/components/ui/separator"

const radioOptions = [
  {
    label: "Asset series",
    value: "asset-series",
  },
  {
    label: "Craft series",
    value: "craft-series",
  },
  {
    label: "Extra series",
    value: "extra-series",
  },
  {
    label: "Trait series",
    value: "trait-series",
  },
  {
    label: "Skill series",
    value: "skill-series",
  },
]

const Filter = () => {
  const [factes, setFactes] = useState<string>("")
  const [selections, setSelections] = useState<string[]>(["trait-series"])

  return (
    <div className="p-5 flex flex-col justify-between gap-4 h-profile">
      <div
        onClick={() => {
          setFactes("")
          setSelections([])
        }}
        className="absolute top-5 right-5 font-medium text-granite-gray cursor-pointer"
      >
        Clear Filter
      </div>
      <div className="flex flex-col gap-4 ">
        <Select
          value={factes}
          options={[
            { label: "test", value: "test" },
            { label: "test1", value: "test1" },
            { label: "test2", value: "test2" },
          ]}
          label="Filter by FACTES (Tier 1)"
          placeholder="Select Tier 1"
          onChange={(val) => setFactes(val)}
        />
        <div className="card-shadow flex flex-col bg-white rounded-[10px] p-[14px]">
          {radioOptions.map(({ label, value }, index) => (
            <div key={index} className="flex flex-col">
              <div className="flex items-center gap-[14px]">
                <div className="w-5 h-5">
                  {selections.includes(value) ? (
                    <Icons.selected
                      onClick={() =>
                        setSelections((prev) =>
                          prev.filter((itm) => itm !== value)
                        )
                      }
                      className="cursor-pointer"
                    />
                  ) : (
                    <Icons.addItem
                      onClick={() => setSelections((prev) => [...prev, value])}
                      className="cursor-pointer"
                    />
                  )}
                </div>
                <div>{label}</div>
              </div>
              {index !== radioOptions.length - 1 && (
                <Separator className="my-[10px] bg-platinum" />
              )}
            </div>
          ))}
        </div>
      </div>

      <Button
        onClick={() => console.log({ factes, selections })}
        label="Apply"
      />
    </div>
  )
}

export default Filter

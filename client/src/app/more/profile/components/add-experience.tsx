"use client"

import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userExperienceSchema } from "@/lib/validations/add-experience"
import { useWorkExperience } from "@/query/profile"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"
import { experienceManager } from "@/lib/utils"

const createMutationObj = (data: any) => {
  const { startDate, endDate, title, company, id } = data

  return {
    title,
    id,
    company,
    from: startDate,
    ...(endDate && { to: endDate }),
  }
}

const AddExperience = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const work = searchParams.get("work")

  const { addWorkExp, editWorkExp, removeWorkExp } = useWorkExperience()

  const {
    profileFormData: { experience },
    setExperience,
    setExperienceEdit,
    removeExperience,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userExperienceSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userExperienceSchema),
    defaultValues: {
      company: "",
      title: "",
      startDate: "" as any,
      endDate: "" as any,
    },
  })

  useEffect(() => {
    if (work) {
      const endDate = new Date(experience[+work]?.endDate)
        ?.toISOString()
        ?.slice(0, 10)

      const startDate = new Date(experience[+work]?.startDate)
        ?.toISOString()
        ?.slice(0, 10)

      form.reset({ ...experience[+work], endDate, startDate } as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, work])

  const handelSubmit = (data: any) => {
    if (work) {
      const mutationObj = createMutationObj({ ...experience[+work], ...data })

      editWorkExp.mutateAsync(mutationObj as any).then((res) => {
        const exp = experienceManager(res.data.data)

        setExperienceEdit(exp, +work)
      })

      setEdit(null)
    } else {
      const mutationObj = createMutationObj(data)

      addWorkExp.mutateAsync(mutationObj as any).then((res) => {
        const resp = res.data.data
        setExperience({ ...resp, ...data })
      })
      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {work && (
        <EditDrawer
          onClick={() => {
            removeWorkExp
              .mutateAsync({ id: experience[+work].id } as any)
              .then(() => {
                removeExperience(+work)
              })
          }}
        />
      )}
      <div className="flex flex-col gap-[18px]">
        <Input
          label="Title"
          name="title"
          form={form}
          placeholder="Ex : Product Designer"
        />
        <Input
          label="Company name"
          name="company"
          form={form}
          placeholder="Ex : Google Pay"
        />
        <Input label="Start date" name="startDate" type="date" form={form} />
        <Input label="End date" name="endDate" type="date" form={form} />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddExperience

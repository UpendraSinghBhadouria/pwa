"use client"

import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userProfileSchema } from "@/lib/validations/basic-profile"
import { useBasicInfo } from "@/query/profile"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"

const ProfileEdit = ({ setEdit }: PageProps) => {
  const {
    profileFormData: { profileEdit },
    setProfileEdit,
  } = useProfileFromData()((state) => state)

  const { editBasicInfo } = useBasicInfo()

  const form = useForm<z.infer<typeof userProfileSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userProfileSchema),
    defaultValues: profileEdit,
  })

  const handelSubmit = (data: any) => {
    const { avatar, username, ...rest } = form.getValues() as any

    editBasicInfo.mutateAsync({ ...rest } as any).then((res) => {
      const resp = res.data.data

      setProfileEdit({ ...resp, ...data, avatar })
    })

    setEdit(null)
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-[18px]">
        <Input
          label="First Name"
          name="firstName"
          form={form}
          placeholder="Enter your first name"
        />
        <Input
          label="Last Name"
          name="lastName"
          form={form}
          placeholder="Enter your last name"
        />
        <Input
          label="Username"
          name="username"
          form={form}
          disabled
          description="Username can only be changed in 272 days"
        />
        <TextArea
          label="Short Bio"
          name="bio"
          form={form}
          placeholder="Add a short bio about yourself"
          textArea
        />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default ProfileEdit

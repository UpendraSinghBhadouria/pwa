import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userBasicInformationSchema } from "@/lib/validations/add-basic-information"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import { useBasicInfo } from "@/query/profile"

const AddBasicInformation = ({ setEdit }: PageProps) => {
  const {
    profileFormData: {
      profileEdit: { firstName, lastName },
      basicInformation,
    },
    setBasicInfo,
  } = useProfileFromData()((state) => state)

  const { editBasicInfo } = useBasicInfo()

  const form = useForm<z.infer<typeof userBasicInformationSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userBasicInformationSchema),
    defaultValues: basicInformation as any,
  })

  useEffect(() => {
    const dob = new Date(basicInformation.dob as any).toISOString().slice(0, 10)

    form.reset({ ...basicInformation, dob, phoneNumber: "1234567890" } as any)
  }, [form, basicInformation])

  const handelSubmit = (data: any) => {
    const { address, phoneNumber, ...rest } = data

    editBasicInfo
      .mutateAsync({ firstName, lastName, ...rest } as any)
      .then(() => {
        setBasicInfo(data as any)
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
          label="Email"
          name="email"
          form={form}
          placeholder="Enter your email"
        />
        <Input
          label="Phone number"
          name="phoneNumber"
          form={form}
          placeholder="Enter your phone number"
          disabled
        />
        <Input type="date" label="Date of birth" name="dob" form={form} />
        <TextArea
          label="Address"
          name="address"
          form={form}
          placeholder="Add a address"
          textArea
        />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddBasicInformation

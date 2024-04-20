import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { userLicensesSchema } from "@/lib/validations/add-license"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"
import { useLicenseCertification } from "@/query/profile"
import { licensesManager } from "@/lib/utils"

const createMutationObj = (data: any) => {
  const { certification, provider, link, expiryDate, startDate, id } = data
  return {
    provider,
    id,
    name: certification,
    url: link,
    to: expiryDate,
    from: startDate,
  }
}

const AddLicenses = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const licenses = searchParams.get("license")

  const { addLicenseCertification, editLicenseCertification, deleteLic } =
    useLicenseCertification()

  const {
    profileFormData: { licenses: licensesConfig },
    setLicenses,
    setLicenseEdit,
    removeLicense,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userLicensesSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userLicensesSchema),
    defaultValues: {
      certification: "",
      provider: "",
      link: "",
      startDate: "" as any,
      expiryDate: "" as any,
    },
  })

  useEffect(() => {
    if (licenses) {
      const expiryDate = new Date(licensesConfig[+licenses].expiryDate)
        .toISOString()
        .slice(0, 10)

      const startDate = new Date(licensesConfig[+licenses].startDate)
        .toISOString()
        .slice(0, 10)

      form.reset({ ...licensesConfig[+licenses], startDate, expiryDate } as any)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, licenses])

  const handelSubmit = (data: any) => {
    if (licenses) {
      const mutationObj = createMutationObj({
        ...licensesConfig[+licenses],
        ...data,
      })

      editLicenseCertification.mutateAsync(mutationObj as any).then((res) => {
        const lic = licensesManager(res.data.data)

        setLicenseEdit(lic, +licenses)
      })

      setLicenseEdit(data, +licenses)
      setEdit(null)
    } else {
      const mutationObj = createMutationObj(data)

      addLicenseCertification.mutateAsync(mutationObj as any).then((res) => {
        const resp = res.data.data

        setLicenses({ ...resp, ...data })
      })

      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {licenses && (
        <EditDrawer
          onClick={() => {
            deleteLic
              .mutateAsync({ id: licensesConfig[+licenses].id } as any)
              .then(() => {
                removeLicense(+licenses)
              })
          }}
        />
      )}
      <div className="flex flex-col gap-[18px]">
        <Input
          label="License or certification name"
          name="certification"
          form={form}
          placeholder="Ex : Product Designer"
        />
        <Input
          label="Provider name"
          name="provider"
          form={form}
          placeholder="Ex : Google, Coursera"
        />
        <Input
          label="Link to to credential"
          name="link"
          form={form}
          placeholder="Paste link to proof"
        />
        <Input label="Start date" name="startDate" type="date" form={form} />
        <Input label="Expiry date" name="expiryDate" type="date" form={form} />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddLicenses

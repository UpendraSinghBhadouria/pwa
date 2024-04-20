import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userAwardSchema } from "@/lib/validations/add-award"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"
import { useAward } from "@/query/profile"
import { awardsManager } from "@/lib/utils"

const createMutationObj = (data: any) => {
  const { link, title, description, id } = data

  return { title, id, description, url: link }
}

const AddAwards = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const award = searchParams.get("awards")

  const { addAward, editAward, deleteAwa } = useAward()

  const {
    profileFormData: { awards },
    setAwards,
    setAwardEdit,
    removeAward,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userAwardSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userAwardSchema),
    defaultValues: {
      description: "",
      link: "",
      title: "",
    },
  })

  useEffect(() => {
    if (award) {
      form.reset(awards[+award])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, award])

  const handelSubmit = (data: any) => {
    if (award) {
      const mutationObj = createMutationObj({ ...awards[+award], ...data })

      editAward.mutateAsync(mutationObj as any).then((res) => {
        const awa = awardsManager(res.data.data)

        setAwardEdit(awa, +award)
      })

      setEdit(null)
    } else {
      const mutationObj = createMutationObj(data)

      addAward.mutateAsync(mutationObj as any).then((res) => {
        const resp = res.data.data

        setAwards({ ...resp, ...data })
      })

      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {award && (
        <EditDrawer
          onClick={() => {
            deleteAwa.mutateAsync({ id: awards[+award].id } as any).then(() => {
              removeAward(+award)
            })
          }}
        />
      )}
      <div className="flex flex-col gap-[18px]">
        <Input
          label="Project title"
          name="title"
          form={form}
          placeholder="Ex : Face detection model"
        />
        <TextArea
          label="Description"
          name="description"
          form={form}
          placeholder="Add details about things you did in the project"
          textArea
        />
        <Input
          label="Link to to project"
          name="link"
          form={form}
          placeholder="Paste link to more details about project"
        />
      </div>
      <Button type="submit" label="Continue" />
    </form>
  )
}

export default AddAwards

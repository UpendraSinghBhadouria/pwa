import Button from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TextArea } from "@/components/ui/text-area"
import { userProjectSchema } from "@/lib/validations/add-project"
import { useProfileFromData } from "@/store/profile-form-provider"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import type { PageProps } from "../../type"
import EditDrawer from "./edit-drawer"
import { useProject } from "@/query/profile"
import { projectsManager } from "@/lib/utils"

const createMutationObj = (data: any) => {
  const { description, title, link, id } = data

  return { id, title, description, ...(link && { url: link }) }
}

const AddProjects = ({ setEdit }: PageProps) => {
  const searchParams = useSearchParams()
  const project = searchParams.get("project")

  const { addProject, editProject, removeProj } = useProject()

  const {
    profileFormData: { projects },
    setProject,
    setProjectEdit,
    removeProject,
  } = useProfileFromData()((state) => state)

  const form = useForm<z.infer<typeof userProjectSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(userProjectSchema),
    defaultValues: {
      description: "",
      link: "",
      title: "",
    },
  })

  useEffect(() => {
    if (project) {
      form.reset({ ...projects[+project] })
    }
  }, [projects, form, project])

  const handelSubmit = (data: any) => {
    if (project) {
      const mutationObj = createMutationObj({ ...projects[+project], ...data })

      editProject.mutateAsync(mutationObj as any).then((res) => {
        const projectData = projectsManager(res.data.data)

        setProjectEdit(projectData, +project)
      })

      setEdit(null)
    } else {
      const mutationObj = createMutationObj(data)

      addProject.mutateAsync(mutationObj as any).then((res) => {
        const resp = res.data.data

        setProject({ resp, ...data })
      })

      setEdit(null)
    }
  }

  return (
    <form
      onSubmit={form.handleSubmit(handelSubmit)}
      className="flex flex-col justify-between h-full relative"
    >
      {project && (
        <EditDrawer
          onClick={() => {
            removeProj
              .mutateAsync({ id: projects[+project].id } as any)
              .then(() => {
                removeProject(+project)
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

export default AddProjects

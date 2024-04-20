import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userAwardSchema = z.object({
  title: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  description: z.string().min(1, messages.mandatory),
  link: z.string().min(1, messages.mandatory),
})

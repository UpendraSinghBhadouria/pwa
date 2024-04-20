import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userEducationSchema = z.object({
  institution: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  degree: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
})

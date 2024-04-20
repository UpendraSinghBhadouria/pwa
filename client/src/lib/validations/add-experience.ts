import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userExperienceSchema = z.object({
  title: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  company: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  startDate: z.coerce.date(),
  endDate: z.unknown(),
})

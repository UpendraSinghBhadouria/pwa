import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  lastName: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  username: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  bio: z.string().min(1, messages.mandatory),
})

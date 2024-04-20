import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userLicensesSchema = z.object({
  certification: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  provider: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  link: z.string(),
  startDate: z.coerce.date(),
  expiryDate: z.coerce.date(),
})

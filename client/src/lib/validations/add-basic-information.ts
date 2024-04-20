import * as z from "zod"

const messages = {
  mandatory: "This is a mandatory field",
  exceedCharrCount: "Field exceed character count",
}

export const userBasicInformationSchema = z.object({
  email: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  phoneNumber: z
    .string()
    .min(1, messages.mandatory)
    .max(50, messages.exceedCharrCount),
  address: z.string().min(1, messages.mandatory),
  dob: z.coerce.date(),
})

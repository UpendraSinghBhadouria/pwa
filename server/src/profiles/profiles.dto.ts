import { z } from 'zod';
import { GENDER } from '../utils';

export const basicDtoSchema = z
  .object({
    avatar: z.string().trim().optional(),
    username: z.string().trim().optional(),
    fullName: z.string().trim().optional(),
    firstName: z
      .string()
      .trim()
      .min(1, { message: 'Must be 1 or more characters long' }),
    lastName: z
      .string()
      .trim()
      .min(1, { message: 'Must be 1 or more characters long' }),
    bio: z.string().trim().optional(),
    email: z.string().trim().email({ message: 'Must be a valid email' }),
    dob: z.coerce.date().optional(),
    gender: z.enum(GENDER).optional(),
  })
  .strict();
export type BasicDtoSchema = z.infer<typeof basicDtoSchema>;

export const addressDtoSchema = z
  .object({
    line1: z.string().trim().optional(),
    country: z.string().trim(),
    state: z.string().trim(),
    cityDistrict: z.string().trim(),
    pincode: z.string().trim(),
  })
  .strict();
export type AddressDtoSchema = z.infer<typeof addressDtoSchema>;

export const workExperienceDtoSchema = z.object({
  title: z.string().trim(),
  company: z.string().trim(),
  from: z.coerce.date(),
  to: z.coerce.date().optional(),
});
export type WorkExperienceDtoSchema = z.infer<typeof workExperienceDtoSchema>;

export const projectDtoSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  url: z.string().trim().url().optional(),
});
export type ProjectDtoSchema = z.infer<typeof projectDtoSchema>;

export const licenseCertificationDtoSchema = z.object({
  name: z.string().trim(),
  provider: z.string().trim(),
  from: z.coerce.date(),
  to: z.coerce.date(),
  url: z.string().trim().url(),
});
export type LicenseCertificationDtoSchema = z.infer<
  typeof licenseCertificationDtoSchema
>;

export const educationDtoSchema = z.object({
  schoolCollage: z.string().trim(),
  university: z.string().trim().optional(),
  degree: z.string().trim(),
  from: z.coerce.date(),
  to: z.coerce.date().optional(),
});
export type EducationDtoSchema = z.infer<typeof educationDtoSchema>;

export const awardAchievementDtoSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  url: z.string().trim().url(),
});
export type AwardAchievementDtoSchema = z.infer<
  typeof awardAchievementDtoSchema
>;

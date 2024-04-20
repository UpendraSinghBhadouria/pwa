"use client"

import { createContext, useContext, useState } from "react"
import { create } from "zustand"

type ProfileEdit = {
  firstName?: string
  lastName?: string
  username?: string
  bio?: string
  email?: string
  avatar?: {
    initials: string
    bgColor: string
    src: null
  }
}

type Experience = {
  title: string
  company: string
  startDate: Date | string
  endDate: Date | string
  profileId?: string | number
  id?: string | number
}

type Project = {
  title: string
  description: string
  link: string
  id?: string | number
}

type Licenses = {
  certification: string
  provider: string
  startDate: string | Date
  expiryDate: string | Date
  link: string
  companyImage?: string
  id?: string | number
}

type Education = {
  institution: string
  degree: string
  startDate: string
  endDate: string
  id?: string | number
}

type Awards = {
  title: string
  description: string
  link: string
  id?: string | number
}
type BasicInformation = {
  email?: string
  phoneNumber?: string
  dob?: string
  address?: string
}

export type ProfileFromData = {
  profileEdit: ProfileEdit
  experience: Experience[]
  projects: Project[]
  licenses: Licenses[]
  education: Education[]
  awards: Awards[]
  basicInformation: BasicInformation
}

const initialState: ProfileFromData = {
  profileEdit: {},
  experience: [],
  projects: [],
  licenses: [],
  education: [],
  awards: [],
  basicInformation: {},
}

const createStore = (profileFormData: ProfileFromData) =>
  create<{
    profileFormData: ProfileFromData
    setProfileFormData: (data: ProfileFromData) => void

    setProfileEdit: (data: ProfileEdit) => void

    setExperience: (data: Experience) => void
    setExperienceEdit: (data: Experience, idx: number) => void
    removeExperience: (idx: number) => void

    setProject: (data: Project) => void
    setProjectEdit: (data: Project, idx: number) => void
    removeProject: (idx: number) => void

    setLicenses: (data: Licenses) => void
    setLicenseEdit: (data: Licenses, idx: number) => void
    removeLicense: (idx: number) => void

    setEducation: (data: Education) => void
    setEducationEdit: (data: Education, idx: number) => void
    removeEducation: (idx: number) => void

    setAwards: (data: Awards) => void
    setAwardEdit: (data: Awards, idx: number) => void
    removeAward: (idx: number) => void

    setBasicInfo: (data: BasicInformation) => void
  }>((set) => ({
    profileFormData,
    setProfileFormData(data: ProfileFromData) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, ...data },
      }))
    },

    setProfileEdit(data: ProfileEdit) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, profileEdit: data },
      }))
    },

    setExperience(data: Experience) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          experience: [...prev.profileFormData.experience, data],
        },
      }))
    },
    setExperienceEdit(data: Experience, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          experience: prev.profileFormData.experience.map((exp, i) =>
            i === index ? { ...exp, ...data } : exp
          ),
        },
      }))
    },
    removeExperience(index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          experience: prev.profileFormData.experience.filter(
            (_, i) => i !== index
          ),
        },
      }))
    },

    setProject(data: Project) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          projects: [...prev.profileFormData.projects, data],
        },
      }))
    },
    setProjectEdit(data: Project, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          projects: prev.profileFormData.projects.map((exp, i) =>
            i === index ? { ...exp, ...data } : exp
          ),
        },
      }))
    },
    removeProject(index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          projects: prev.profileFormData.projects.filter((_, i) => i !== index),
        },
      }))
    },

    setLicenses(data: Licenses) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          licenses: [...prev.profileFormData.licenses, data],
        },
      }))
    },
    setLicenseEdit(data: Licenses, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          licenses: prev.profileFormData.licenses.map((lic, i) =>
            i === index ? { ...lic, ...data } : lic
          ),
        },
      }))
    },
    removeLicense(index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          licenses: prev.profileFormData.licenses.filter((_, i) => i !== index),
        },
      }))
    },

    setEducation(data: Education) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          education: [...prev.profileFormData.education, data],
        },
      }))
    },
    setEducationEdit(data: Education, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          education: prev.profileFormData.education.map((edu, i) =>
            i === index ? { ...edu, ...data } : edu
          ),
        },
      }))
    },
    removeEducation(index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          education: prev.profileFormData.education.filter(
            (_, i) => i !== index
          ),
        },
      }))
    },

    setAwards(data: Awards) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          awards: [...prev.profileFormData.awards, data],
        },
      }))
    },
    setAwardEdit(data: Awards, index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          awards: prev.profileFormData.awards.map((award, i) =>
            i === index ? { ...award, ...data } : award
          ),
        },
      }))
    },
    removeAward(index: number) {
      set((prev) => ({
        profileFormData: {
          ...prev.profileFormData,
          awards: prev.profileFormData.awards.filter((_, i) => i !== index),
        },
      }))
    },

    setBasicInfo(data: BasicInformation) {
      set((prev) => ({
        profileFormData: { ...prev.profileFormData, basicInformation: data },
      }))
    },
  }))

const ProfileFromDataContext = createContext<ReturnType<
  typeof createStore
> | null>(null)

export const useProfileFromData = () => {
  if (!ProfileFromDataContext)
    throw new Error(
      "useProfileFromData must be used within a ProfileFromDataProvider"
    )
  return useContext(ProfileFromDataContext)!
}

const ProfileFromDataProvider = ({
  profileFormData = initialState,
  children,
}: {
  profileFormData?: ProfileFromData
  children: React.ReactNode
}) => {
  const [store] = useState(() => createStore(profileFormData))
  return (
    <ProfileFromDataContext.Provider value={store}>
      {children}
    </ProfileFromDataContext.Provider>
  )
}

export default ProfileFromDataProvider

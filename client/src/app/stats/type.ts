import { Icons } from "@/components/icons"

export type StatCardProp = {
  icon: keyof typeof Icons | string
  title: string
  href: string
  description: string
  className?: string
  type?: string
  cta?: string
}

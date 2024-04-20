import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Profile",
  description: "Generated by Bezt",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}
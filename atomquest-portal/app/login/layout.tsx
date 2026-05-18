import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sign in | AtomQuest HR",
  description: "Sign in to the AtomQuest HR performance management portal",
}

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

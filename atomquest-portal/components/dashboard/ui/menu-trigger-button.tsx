"use client"

import type { ComponentProps } from "react"
import type { VariantProps } from "class-variance-authority"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type MenuTriggerButtonProps = ComponentProps<typeof DropdownMenuTrigger> &
  VariantProps<typeof buttonVariants>

export function MenuTriggerButton({
  className,
  variant = "ghost",
  size = "default",
  children,
  ...props
}: MenuTriggerButtonProps) {
  return (
    <DropdownMenuTrigger
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </DropdownMenuTrigger>
  )
}

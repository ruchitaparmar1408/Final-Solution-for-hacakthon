"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Building2, Loader2, Lock, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RoleSelector } from "@/components/auth/role-selector"
import {
  type UserRole,
  roleRoutes,
  saveAuthSession,
} from "@/lib/auth"
import { cn } from "@/lib/utils"

interface FormErrors {
  email?: string
  password?: string
  role?: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(
  email: string,
  password: string,
  role: UserRole | null
): FormErrors {
  const errors: FormErrors = {}

  if (!email.trim()) {
    errors.email = "Email is required"
  } else if (!emailPattern.test(email.trim())) {
    errors.email = "Enter a valid email address"
  }

  if (!password) {
    errors.password = "Password is required"
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters"
  }

  if (!role) {
    errors.role = "Please select a role"
  }

  return errors
}

export function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("employee")
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setFormError(null)

    const nextErrors = validate(email, password, role)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 900))

      saveAuthSession({ email: email.trim(), role })
      router.push(roleRoutes[role])
    } catch {
      setFormError("Unable to sign in. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <Card
      className={cn(
        "w-full max-w-md border-white/10 bg-slate-900/40 py-0 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl",
        "ring-1 ring-white/10"
      )}
    >
      <CardHeader className="space-y-4 border-b border-white/10 px-6 pb-6 pt-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 shadow-lg shadow-cyan-500/20">
          <Building2 className="h-6 w-6 text-white" />
        </div>
        <div className="space-y-1.5">
          <CardTitle className="text-2xl font-semibold tracking-tight text-white">
            Welcome back
          </CardTitle>
          <CardDescription className="text-slate-400">
            Sign in to AtomQuest HR — performance management portal
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 py-6">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Work email
            </Label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                }}
                aria-invalid={!!errors.email}
                disabled={isLoading}
                className="h-10 border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
              />
            </div>
            {errors.email && (
              <p className="text-xs font-medium text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                }}
                aria-invalid={!!errors.password}
                disabled={isLoading}
                className="h-10 border-white/10 bg-white/5 pl-10 text-white placeholder:text-slate-500 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
              />
            </div>
            {errors.password && (
              <p className="text-xs font-medium text-red-400" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <RoleSelector
            value={role}
            onChange={(next) => {
              setRole(next)
              if (errors.role) setErrors((prev) => ({ ...prev, role: undefined }))
            }}
            error={errors.role}
          />

          {formError && (
            <p
              className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
              role="alert"
            >
              {formError}
            </p>
          )}

          <Button
            type="submit"
            disabled={isLoading}
            className="h-10 w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/20 hover:from-blue-500 hover:to-cyan-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>

          <p className="text-center text-xs text-slate-500">
            Demo access — any valid email and password (6+ chars)
          </p>
        </form>
      </CardContent>
    </Card>
  )
}

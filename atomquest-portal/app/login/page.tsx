import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="dark relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.18),transparent),radial-gradient(ellipse_50%_40%_at_100%_50%,rgba(6,182,212,0.1),transparent),radial-gradient(ellipse_40%_30%_at_0%_80%,rgba(99,102,241,0.08),transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22 opacity=%220.04%22/%3E%3C/svg%3E')] opacity-40"
      />

      <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
        <LoginForm />
      </div>

      <p className="relative z-10 mt-8 text-center text-xs text-slate-600">
        © {new Date().getFullYear()} AtomQuest HR · Enterprise Performance Management
      </p>
    </div>
  )
}

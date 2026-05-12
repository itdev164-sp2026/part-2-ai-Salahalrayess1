import { AuthForm } from "@/components/auth-form"

export default function LoginPage() {
  return (
    <div className="relative min-h-svh overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(0,0,0,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.06),_transparent_30%)] px-4 py-10 dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.04),_transparent_30%)]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background to-muted/30" />
      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-lg items-center">
        <div className="w-full space-y-8">
          <section className="space-y-3 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-muted-foreground">
              ITDEV-164 Dashboard
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Welcome back
            </h1>
            <p className="mx-auto max-w-md text-muted-foreground">
              Sign in to manage your projects, or create a new account if you are joining for the first time.
            </p>
          </section>

          <AuthForm />
        </div>
      </div>
    </div>
  )
}
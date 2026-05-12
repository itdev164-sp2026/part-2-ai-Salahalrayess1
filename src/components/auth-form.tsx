"use client"

import { useActionState, useEffect, useMemo, useState } from "react"

import { authenticate, type AuthFormState } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const initialState: AuthFormState = {
  error: null,
  message: null,
}

export function AuthForm() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn")
  const [state, formAction, pending] = useActionState(authenticate, initialState)

  const isSignUp = mode === "signUp"

  const title = useMemo(
    () => (isSignUp ? "Create your account" : "Sign in to continue"),
    [isSignUp]
  )

  useEffect(() => {
    if (state.message && !state.error) {
      const form = document.getElementById("auth-form") as HTMLFormElement | null
      form?.reset()
    }
  }, [state])

  return (
    <Card className="overflow-hidden border-border/70 shadow-2xl shadow-foreground/5">
      <CardHeader className="space-y-3 border-b border-border/60 bg-muted/30">
        <div className="flex items-center justify-between gap-3">
          <div>
            <CardTitle className="text-2xl tracking-tight">{title}</CardTitle>
            <CardDescription className="mt-1">
              Use your email and password to access the dashboard.
            </CardDescription>
          </div>
          <div className="grid shrink-0 grid-cols-2 rounded-lg border bg-background p-1 text-sm">
            <button
              type="button"
              onClick={() => setMode("signIn")}
              className={cn(
                "rounded-md px-3 py-1.5 font-medium transition-colors",
                !isSignUp ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode("signUp")}
              className={cn(
                "rounded-md px-3 py-1.5 font-medium transition-colors",
                isSignUp ? "bg-primary text-primary-foreground" : "text-muted-foreground"
              )}
            >
              Sign Up
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <form id="auth-form" action={formAction} className="space-y-5">
          <input type="hidden" name="mode" value={mode} />

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" autoComplete="email" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
            />
          </div>

          {state.error ? (
            <p className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {state.error}
            </p>
          ) : state.message ? (
            <p className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
              {state.message}
            </p>
          ) : null}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create account"
                : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
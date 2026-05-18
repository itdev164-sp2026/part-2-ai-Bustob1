"use client"

import { FormEvent, useState, useTransition } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Toaster } from "@/components/ui/sonner"
import { signInAction, signUpAction } from "@/app/actions"

const authText = {
  signin: {
    title: "Sign in to your account",
    description: "Enter your email and password to continue.",
    button: "Sign in",
  },
  signup: {
    title: "Create a new account",
    description: "Enter your details to register and start tracking projects.",
    button: "Sign up",
  },
} as const

type AuthMode = keyof typeof authText

export function AuthCard() {
  const [mode, setMode] = useState<AuthMode>("signin")
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    startTransition(async () => {
      const result =
        mode === "signin"
          ? await signInAction(formData)
          : await signUpAction(formData)

      if (!result.success) {
        toast.error(result.error)
      }
    })
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center p-4">
      <div className="mx-auto w-full max-w-md">
        <Card className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <CardHeader className="space-y-4">
            <div>
              <CardTitle className="text-3xl">{authText[mode].title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">
                {authText[mode].description}
              </CardDescription>
            </div>
            <div className="grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
              {(["signin", "signup"] as AuthMode[]).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setMode(tab)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    mode === tab
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab === "signin" ? "Sign In" : "Sign Up"}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Toaster />
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="********" required minLength={8} />
              </div>

              <Button type="submit" className="w-full" disabled={isPending}>
                {authText[mode].button}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

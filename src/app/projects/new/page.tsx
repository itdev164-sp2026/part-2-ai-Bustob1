import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-10">
      <section className="space-y-4 rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-primary">
            Projects
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            New Project
          </h1>
          <p className="max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
            Add a new project to your collection and track its status.
          </p>
        </div>
      </section>

      <Card className="rounded-3xl border border-border bg-background p-8 shadow-sm">
        <CardHeader>
          <div className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Create a project</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  )
}

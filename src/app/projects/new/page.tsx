import { ProjectForm } from "@/components/project-form"

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Create new
        </p>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
          <p className="max-w-2xl text-muted-foreground">
            Add a new project to your dashboard. Fill in the details below to get started.
          </p>
        </div>
      </section>

      <div className="max-w-2xl">
        <ProjectForm />
      </div>
    </div>
  )
}

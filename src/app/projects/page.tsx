import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

type Project = {
  id: string | number
  title: string | null
  description: string | null
  status: string | null
}

function getStatusVariant(status: string | null) {
  switch (status?.toLowerCase()) {
    case "active":
      return "success"
    case "completed":
      return "info"
    case "archived":
      return "muted"
    default:
      return "outline"
  }
}

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, title, description, status")
    .order("title", { ascending: true })

  const rows = (projects ?? []) as Project[]

  return (
    <div className="space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Dashboard data
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="max-w-2xl text-muted-foreground">
              A live overview of project records loaded directly from Supabase.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            {rows.length} record{rows.length === 1 ? "" : "s"}
          </div>
        </div>
      </section>

      {error ? (
        <Card>
          <CardHeader>
            <CardTitle>Unable to load projects</CardTitle>
            <CardDescription>
              Supabase returned an error while fetching the projects table.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </CardContent>
        </Card>
      ) : rows.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((project) => (
            <Card key={project.id} className="overflow-hidden transition-shadow hover:shadow-md">
              <CardHeader className="space-y-3 border-b border-border/60 bg-muted/30">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-xl">{project.title ?? "Untitled project"}</CardTitle>
                  <Badge variant={getStatusVariant(project.status)}>
                    {project.status ?? "unknown"}
                  </Badge>
                </div>
                <CardDescription>Project ID: {project.id}</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-sm leading-6 text-muted-foreground">
                  {project.description ?? "No description was provided for this project."}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No projects found</CardTitle>
            <CardDescription>
              The projects table is connected, but it does not contain any rows yet.
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  )
}
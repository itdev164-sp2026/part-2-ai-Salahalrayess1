"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { projectSchema } from "@/lib/schemas"
import { createProject } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"

type ProjectFormData = {
  title: string
  description: string
  status: "active" | "completed" | "archived"
}

export function ProjectForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      status: "active",
    },
  })

  const status = watch("status")

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true)

    const result = await createProject(data)

    if (result.success) {
      toast.success("Project created successfully!")
      // Reset form
      const form = document.querySelector("form") as HTMLFormElement
      form?.reset()
    } else {
      toast.error(result.error || "Failed to create project")
    }

    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <Field>
          <FieldContent>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="Enter project title"
              aria-invalid={!!errors.title}
              {...register("title")}
            />
            {errors.title && (
              <FieldError>{errors.title.message}</FieldError>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Enter project description"
              aria-invalid={!!errors.description}
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </FieldContent>
        </Field>

        <Field>
          <FieldContent>
            <FieldLabel htmlFor="status">Status</FieldLabel>
            <Select value={status} onValueChange={(value) => setValue("status", value as ProjectFormData["status"])}>
              <SelectTrigger id="status" aria-invalid={!!errors.status}>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            {errors.status && (
              <FieldError>{errors.status.message}</FieldError>
            )}
          </FieldContent>
        </Field>
      </FieldSet>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create Project"}
      </Button>
    </form>
  )
}

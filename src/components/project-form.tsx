"use client"

import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { projectSchema, type Project } from "@/lib/schemas"
import { createProjectAction } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toaster } from "@/components/ui/sonner"

export function ProjectForm() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "active",
    },
  })

  const onSubmit = async (data: Project) => {
    const result = await createProjectAction(data)

    if (!result.success) {
      toast.error(result.error ?? "Unable to create project")
      return
    }

    toast.success("Project created successfully")
    reset()
  }

  return (
    <>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Field>
          <FieldLabel htmlFor="title">Title</FieldLabel>
          <Input id="title" placeholder="Project title" {...register("title")} />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description</FieldLabel>
          <Textarea
            id="description"
            placeholder="Project description"
            rows={5}
            {...register("description")}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="status">Status</FieldLabel>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                defaultValue="active"
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{errors.status?.message}</FieldError>
        </Field>

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          Create Project
        </Button>
      </form>
    </>
  )
}

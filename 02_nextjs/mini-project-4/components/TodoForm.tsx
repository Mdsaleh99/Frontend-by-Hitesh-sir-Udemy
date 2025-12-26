"use client";
import React from "react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import {
  CreateTodoForm,
  createTodoSchema,
  PriorityEnum,
} from "@/validations/todo";
import { useCreateTodo } from "@/hooks/use-create-todo";
import { toast } from "sonner";
import { CreateTodoInput } from "@/actions/todo-actions";

export default function TodoForm() {
  const [isOpen, setIsOpen] = useState(false);
  const createTodoMutation = useCreateTodo();

  // Subscribe ONLY to the `priority` field
  // - Memo-safe
  // - Compiler-friendly
  // - No warnings

  const form = useForm<CreateTodoForm>({
    resolver: zodResolver(createTodoSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: PriorityEnum.MEDIUM,
    },
  });
  const priority = useWatch({
    control: form.control,
    name: "priority",
  });

  const onSubmit = async (data: CreateTodoInput) => {
    try {
      // ----------------------------------
      // ❌ DON'T DO THIS:
      // ----------------------------------
      // This sends RAW form data directly
      // - priority may be undefined
      // - defaults not applied
      // - TypeScript correctly errors
      //
      // const result = await createTodoMutation.mutateAsync(data);
      //   -----------------------------------------------

      // At this point:
      // - data comes directly from the form
      // - priority may be undefined
      // - data is NOT safe for DB yet

      // Zod parses the input:
      // - validates all fields
      // - applies default values
      // - throws error if invalid
      const parsedData = createTodoSchema.parse(data);
    //   console.log("Parsed Data: ", parsedData);

      // parsedData type === CreateTodoOutput

      // SAFE:
      // - priority is guaranteed
      // - data is fully validated
      // - ready for API / database
      const result = await createTodoMutation.mutateAsync(parsedData);
    //   console.log("Result: ", result);

      if (result.success) {
        toast.success("Todo created successfully");
        form.reset();
        setIsOpen(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      const err = error as Error;
      toast.error(`${err.message}`);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="w-full mb-6"
        size="lg"
      >
        Add New Todo
      </Button>
    );
  }
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Todo</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter todo title..."
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter description (optional)..."
              rows={3}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              value={priority}
              onValueChange={(value: PriorityEnum) =>
                form.setValue("priority", value)
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={createTodoMutation.isPending}
            >
              {createTodoMutation.isPending ? "Creating..." : "Create Todo"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setIsOpen(false);
                form.reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

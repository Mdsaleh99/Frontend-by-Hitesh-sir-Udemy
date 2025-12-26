import { z } from "zod";

export enum PriorityEnum {
  ALL = "all",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  COMPLETED = "completed",
  ACTIVE = "active",
}

export interface ICreateTodo {
  title: string;
  description: string;
  priority: PriorityEnum;
  completed: boolean;
}

export const createTodoSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(100, "Title must be less than 100 characters long")
    .trim(),
  description: z
    .string()
    .min(3, "Description must be at least 3 characters long")
    .max(1000, "Description must be less than 1000 characters long")
    .trim(),
  priority: z
    .enum([
      PriorityEnum.LOW,
      PriorityEnum.MEDIUM,
      PriorityEnum.HIGH,
      PriorityEnum.ALL,
    ])
    .default(PriorityEnum.MEDIUM),
  completed: z.boolean().default(false),
});

export type CreateTodoForm = z.input<typeof createTodoSchema>;

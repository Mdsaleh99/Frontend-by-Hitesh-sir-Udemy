"use server";
import connectToDatabase from "@/lib/db";
import TodoModel from "@/model/Todo";
import { createTodoSchema } from "@/validations/todo";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createTodo(data: CreateTodoOutput) {
  try {
    await connectToDatabase();
    const validateData = createTodoSchema.parse(data);
    console.log(validateData);

    const todo = await TodoModel.create(validateData);
    console.log(todo);

    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function getTodo() {
  try {
    await connectToDatabase();

    const todos = await TodoModel.find({}).sort({ createdAt: -1 });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todos)),
    };
  } catch (error) {
    const err = error as Error;
    return {
      success: false,
      message: err.message,
    };
  }
}

export async function toggleTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findById(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }

    todo.completed = !todo.completed;

    await todo.save();

    revalidatePath("/");
    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error toggling todo:", error);
    return {
      success: false,
      error: "Failed to toggle todo",
    };
  }
}

export async function deleteTodo(id) {
  try {
    await connectDB();

    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return {
        success: false,
        error: "Todo not found",
      };
    }
    revalidatePath("/");

    return {
      success: true,
      data: JSON.parse(JSON.stringify(todo)),
    };
  } catch (error) {
    console.error("Error deleting todo:", error);
    return {
      success: false,
      error: "Failed to delete todo",
    };
  }
}

// ==============================
// ZOD TYPE EXPLANATION
// ==============================

// CreateTodoInput
// ----------------
// This represents RAW DATA coming from the form (user input).
// - Values may be missing
// - Defaults are NOT applied yet
// - This is what react-hook-form works with
// - Example: priority can be undefined
export type CreateTodoInput = z.input<typeof createTodoSchema>;

// CreateTodoOutput
// ----------------
// This represents VALIDATED & TRANSFORMED data after Zod parsing.
// - Defaults ARE applied
// - Data is guaranteed to be complete
// - Safe to send to API / DB
// - Example: priority is ALWAYS present
export type CreateTodoOutput = z.output<typeof createTodoSchema>;

// ==============================
// GOLDEN RULE (REMEMBER THIS)
// ==============================

// ❌ Never send z.input data to DB
// ❌ Never trust form data directly
// ✅ Always parse once with Zod
// ✅ API / DB only accept z.output

// ==============================
// SIMPLE REAL-LIFE ANALOGY
// ==============================

// CreateTodoInput
// ===============
// "User filled the form"
// - maybe forgot something
// - maybe left optional fields empty

// createTodoSchema.parse()
// =======================
// "Teacher checks the exam"
// - fills missing default answers
// - rejects invalid ones

// CreateTodoOutput
// =================
// "Final evaluated paper"
// - complete
// - correct
// - ready to be stored

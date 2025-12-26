import { PriorityEnum } from "@/validations/todo";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface Todo {
  title: string;
  description: string;
  completed: boolean;
  priority: PriorityEnum;
  createdAt: Date;
  updatedAt: Date;
}

interface TodoState {
  todos: Todo[];
  filter: PriorityEnum;
  isLoading: boolean;
  setTodos: (todos: Todo[]) => void;
  addTodo: (todo: Todo) => void;
    removeTodo: (id: string) => void;
    updateTodo: (id: string, updates: Partial<Todo>) => void;
  setFilter: (filter: PriorityEnum) => void;
  setIsLoading: (isLoading: boolean) => void;
  filteredTodos: () => Todo[];
  completedCount: () => number;
  activeCount: () => number;
}

export const useTodoStore = create(
  devtools<TodoState>(
    (set, get) => ({
      todos: [],
      filter: PriorityEnum.ALL,
      isLoading: true,
      setTodos: (todos) => set({ todos }),
      addTodo: (todo) =>
        set((state) => ({
          todos: [todo, ...state.todos],
        })),
      setFilter: (filter) => set({ filter }),
      setIsLoading: (isLoading) => set({ isLoading }),
      filteredTodos: () => {
        const { todos, filter } = get();
        switch (filter) {
          case "active":
            return todos.filter((todo) => !todo.completed);
          case "completed":
            return todos.filter((todo) => todo.completed);
          default:
            return todos;
        }
      },

      completedCount: () => get().todos.filter((todo) => todo.completed).length,
      updateTodo: (id, updates) =>
        set((state) => ({
          todos: state.todos.map((todo) =>
            todo._id === id ? { ...todo, ...updates } : todo
          ),
        })),

      removeTodo: (id) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo._id !== id),
        })),
      activeCount: () => get().todos.filter((todo) => !todo.completed).length,
    }),
    {
      name: "todo-store",
    }
  )
);

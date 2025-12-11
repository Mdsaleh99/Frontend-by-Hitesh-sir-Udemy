import { create } from "zustand";

export const useCounterStore = create((set) => ({
  /*
   * When a value in the Zustand store changes, only the components that use that specific value will re-render.
        * If increment() is called → only Component A re-renders.
        * If set({ user: { name: "John" } }) happens → only Component B re-renders.
        * Other components do NOT re-render unless they use the updated slice.
   */

  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })), // state is like whole container in that we taking the count
  decrement: () => set((state) => ({ count: state.count - 1 })),
  // decrement: () => set({count: 1}) // short hand
  reset: () => set({ count: 0 }),
}));

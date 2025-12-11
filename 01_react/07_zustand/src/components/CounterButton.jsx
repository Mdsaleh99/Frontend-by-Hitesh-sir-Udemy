import { useCounterStore } from "../store/counterStore"

export default function CounterButton() {
    const increment = useCounterStore((state) => state.increment)
    const decrement = useCounterStore((state) => state.decrement)
  return (
      <div>
          <button onClick={increment}>+</button>
          <button onClick={decrement}>-</button>
    </div>
  )
}
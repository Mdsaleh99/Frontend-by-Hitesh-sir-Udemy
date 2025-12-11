import { useCounterStore } from "../store/counterStore"

export default function CounterValue() {
    const count = useCounterStore((state) => state.count) // component re-render only when 'state.count' changes
  return <h2>Count: {count}</h2>
}
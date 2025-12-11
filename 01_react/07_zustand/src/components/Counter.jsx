import { useCounterStore } from "../store/counterStore";

export default function Counter() {
  const { increment, decrement, reset, count } = useCounterStore();
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

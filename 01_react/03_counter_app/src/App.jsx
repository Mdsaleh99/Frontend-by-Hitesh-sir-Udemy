import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0)
  const [countToSet, setCountToSet] = useState(0)
  // count = count + 1; DO NOT DO THIS

  // const incrementalHandler = (numVal) => {
  //   setCount((prevVal) => prevVal + 1) // prevVal always what state value is holding
  //   setCount((prevVal) => prevVal + numVal + 1)
  // }

  return (
    <>
      <h1>Counter App</h1>
      <div className="card">Count is: {count}</div>
      <div>
        <button
          // if function does not accept any arguments then just give function reference. e.g: onClick={incrementalHandler}
          // if function accept any arguments then we have to pass that function in callback function. e.g: onClick={() => incrementalHandler(10)}
          // onClick={() => {incrementalHandler(5)}}
          onClick={() => setCount(count + 1)}
          style={{ margin: "0 5px" }}
        >
          Increase
        </button>
        <button
          onClick={() => setCount((prevCount) => Math.max(prevCount - 1, 0))}
          style={{ margin: "0 5px" }}
        >
          Decrease
        </button>
        <button
          onClick={() => setCount(() => 0)}
          style={{ margin: "0 5px" }}
        >
          Reset
        </button>
      </div>
      <div style={{ margin: "10px 0" }}>
        <input
          style={{
            width: "100px",
            border: "1px solid white",
            margin: "0 5px",
            padding: "0.6em 1.2em",
          }}
          value={countToSet}
          onChange={(e) => setCountToSet(Number(e.target.value))}
          type="text"
        />
      </div>
      <button
        style={{
          margin: "0 5px",
        }}
        onClick={() => {
          setCount(Number(countToSet))
          setCountToSet(0)
        }}
      >
        Set to {countToSet}
      </button>
    </>
  );
}

export default App;

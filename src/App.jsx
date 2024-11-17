import { useState } from "react";
import Todo from "./components/Todo";

function App() {
  return (
    <>
      <div className="bg-orange-400 grid py-4 min-h-screen">
        <Todo />
      </div>
    </>
  );
}

export default App;

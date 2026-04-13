import { useState } from "react";
import "./App.css";
import { addTodo, deleteSelected, toggleSelect } from "./features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";



function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);

  const handleAdd = () => {
    if (!text.trim()) return
    dispatch(addTodo(text))
    setText("")
  }


  // add todo 
  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="text-3xl font-bold pb-2">Todo app</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}
            <label htmlFor="check"></label>
            <input type="checkbox" aria-label="check" checked={todo.selected || false} onChange={() => dispatch(toggleSelect(todo.id))} /></li>
        ))}
      </ul>
      <label htmlFor="input"></label>
      <input type="text" aria-label="input" value={text} className="border outline-0 rounded" onChange={(e) => setText(e.target.value)} />
      <button title="Add" type="button" onClick={handleAdd} className="font-bold p-2 border rounded cursor-pointer">Add</button>
      <button title="Add" type="button" onClick={() => dispatch(deleteSelected())} className="font-semibold p-2 border rounded cursor-pointer">Delete</button>
    </div>
  );
}

export default App;
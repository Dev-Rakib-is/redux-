import { useState } from "react";
import "./App.css";
import { addTodo, deleteSelected, toggleSelect, toggleComplete, deleteTodo, editTodo } from "./features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";



function App() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todo.todos);
  const [editId, setEditId] = useState<string | null>(null)
  const [editText, setEditText] = useState("")

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
          <li key={todo.id}>

            {/* Complete */}
            <label htmlFor="checkbox"></label>
            <input
              aria-label="checkbox"
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
            />

            {/* 🟢 Edit Mode */}
            {editId === todo.id ? (
              <>
                <label htmlFor="editText"></label>
                <input
                  aria-label="editText"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    dispatch(editTodo({ id: todo.id, text: editText }))
                    setEditId(null)
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? "line-through" : "" }}>
                  {todo.text}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    setEditId(todo.id)
                    setEditText(todo.text)
                  }}
                >
                  Edit
                </button>
              </>
            )}

            {/* Select */}
            <label htmlFor="checkbox"></label>
            <input
              aria-label="checkbox"
              type="checkbox"
              checked={todo.selected || false}
              onChange={() => dispatch(toggleSelect(todo.id))}
            />

            {/* Delete single */}
            <button type="button" onClick={() => dispatch(deleteTodo(todo.id))}>
              Delete
            </button>

          </li>
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
import { useState } from "react";
import "./App.css";
import {
  addTodo,
  deleteSelected,
  toggleSelect,
  toggleComplete,
  deleteTodo,
  editTodo,
  setFilter
} from "./features/todo/todoSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./app/store";

function App() {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");

  const dispatch = useDispatch();

  const { todos, filter } = useSelector((state: RootState) => state.todo);

  // 🔥 Filter logic
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (!text.trim()) return;
    dispatch(addTodo(text));
    setText("");
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="text-3xl font-bold pb-4 text-center">Todo App</h1>

      {/* Input */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={text}
          className="border outline-0 rounded px-2 py-1 flex-1"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          placeholder="Add todo..."
        />

        <button
          onClick={handleAdd}
          disabled={!text.trim()}
          className="font-bold px-3 py-1 border rounded disabled:opacity-50"
        >
          Add
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {["all", "completed", "pending"].map((f) => (
          <button
            key={f}
            onClick={() => dispatch(setFilter(f as any))}
            className={`px-2 py-1 border rounded ${filter === f ? "bg-blue-500 text-white" : ""
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* List */}
      <ul className="space-y-2">
        {filteredTodos.length === 0 && (
          <p className="text-gray-500">No todos found</p>
        )}

        {filteredTodos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 border p-2 rounded"
          >
            {/* Complete */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch(toggleComplete(todo.id))}
            />

            {/* Edit */}
            {editId === todo.id ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="border px-1 flex-1"
                />
                <button
                  onClick={() => {
                    dispatch(editTodo({ id: todo.id, text: editText }));
                    setEditId(null);
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span
                  className="flex-1"
                  style={{
                    textDecoration: todo.completed ? "line-through" : ""
                  }}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => {
                    setEditId(todo.id);
                    setEditText(todo.text);
                  }}
                >
                  Edit
                </button>
              </>
            )}

            {/* Select */}
            <input
              type="checkbox"
              checked={todo.selected || false}
              onChange={() => dispatch(toggleSelect(todo.id))}
            />

            {/* Delete */}
            <button onClick={() => dispatch(deleteTodo(todo.id))}>
              ❌
            </button>
          </li>
        ))}
      </ul>

      {/* Bulk delete */}
      <button
        onClick={() => dispatch(deleteSelected())}
        className="mt-4 border px-3 py-1 rounded"
      >
        Delete Selected
      </button>
    </div>
  );
}

export default App;
import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo, TodoState, FilterType } from "./types";


const initialState: TodoState = {
    todos: [],
    filter: "all",
    loading: false,
    error: null
}

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                id: Date.now().toString(),
                text: action.payload,
                completed: false
            }
            state.todos.push(newTodo)
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((t) => (t.id !== action.payload))
        },
        toggleSelect: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.selected = !todo.selected
            }
        },
        deleteSelected: (state) => {
            state.todos = state.todos.filter(t => !t.selected);
        },
        editTodo: (state, action: PayloadAction<{ id: string, text: string }>) => {
            const todo = state.todos.find(t => t.id === action.payload.id)
            if (todo) {
                todo.text = action.payload.text
            }
        },
        toggleComplete: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find(t => t.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        selectAll: (state) => {
            const allSelected = state.todos.every(t => t.selected)
            state.todos.forEach(t => { t.selected = !allSelected })
        },
        setFilter: (state, action: PayloadAction<FilterType>) => {
            state.filter = action.payload
        }

    }
})
export const { addTodo, deleteTodo, toggleSelect, deleteSelected, editTodo, toggleComplete, selectAll, setFilter } = todoSlice.actions
export default todoSlice.reducer

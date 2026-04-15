import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Todo } from "./types";


interface TodoState {
    todos: Todo[]
}

const initialState: TodoState = {
    todos: []
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
        editTodo: () => { },
        toggleComplete: () => { },
        selectAll: () => { },
        setFilter: () => { },

    }
})
export const { addTodo, deleteTodo, toggleSelect, deleteSelected } = todoSlice.actions
export default todoSlice.reducer
export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    selected?: boolean
}
export type FilterType = "all" | "completed" | "pending";

export interface TodoState {
    todos: Todo[]
    filter: FilterType
    loading: boolean
    error: string | null
}
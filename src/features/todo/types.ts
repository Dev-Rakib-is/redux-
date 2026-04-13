export interface Todo {
    id: string;
    text: string;
    completed: boolean;
    selected?: boolean
}
type FilterType = "all" | "completed" | "pending";

interface TodoState {
    todos: Todo[]
    filter: FilterType
    loading: boolean
    error: string | null
}
export type Status = "all" | "done" | "todo";

export interface Todo {
  id: string;
  name: string;
  isDone: boolean;
}

export interface InitialState {
  todos: Todo[];
  status: Status;
  search: string;
}

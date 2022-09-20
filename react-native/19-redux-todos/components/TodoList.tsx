
import { Component, useMemo } from "react";
import { Todo, TodoStatus} from "../model/todo.model";
import TodoItem from "./TodoItem";
import { FlatList } from "react-native";
import React from "react";
import memoize from "memoize-one";

export type FilterType = TodoStatus | undefined;

export interface TodoListener {
  (todo: Todo): void;
}

export interface FilterChangeListener {
  (filter: FilterType): void;
}



interface Props{
    todos: Todo[];
    search: string;
    filter: FilterType;
    onUpdate: TodoListener;
    onDelete: TodoListener;
    onCancel: TodoListener;
    onEdit: TodoListener
}

export default class TodoList extends Component<Props, {}> {
  
  visibleTodos = memoize((todos: Todo[], filter: FilterType, search) => todos.filter(todo => !filter ? true : todo.status === filter).filter(todo => todo.text.includes(search)));
 

  render() {

    const memizedVisibleTodos = this.visibleTodos(this.props.todos, this.props.filter, this.props.search);

    return (
      <FlatList
      data={memizedVisibleTodos}
      renderItem={({item: todo}) => <TodoItem key={todo.id} todo={todo} {...this.props}  />}
      />
    )
  }
}

import React from "react";
import { Todo, TodoStatus } from "../model/todo.model";
import { Button, GestureResponderEvent, Pressable, StyleSheet, Text, View } from "react-native";
import TodoItemStyle from "../css/TodoItemStyle";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TodoListener } from "./TodoList";
import Btn from "./CustomButton";

interface TodoItemProps{
    todo: Todo;
    onUpdate: TodoListener;
    onDelete: TodoListener;
    onCancel: TodoListener;
    onEdit: TodoListener
}

const TodoItem = ({todo,  onDelete, onUpdate, onCancel, onEdit}: TodoItemProps) => {
    function handleComplition(event: GestureResponderEvent){
        event.preventDefault();
        onUpdate({...todo, status: TodoStatus.Completed})
    }
    function handleCancelation(event: GestureResponderEvent){
        event.preventDefault();
        onCancel({...todo, status: TodoStatus.Canceled})
    }
    function handleEdit(event: GestureResponderEvent){
        event.preventDefault();
        onEdit(todo)
    }
    return (
        <View style={TodoItemStyle.TodoItem}>
            <View style={TodoItemStyle.TodoItemLeft}>
                <Text style={[TodoItemStyle.TodoItemId, TodoItemStyle.textColor]}>{todo.id}</Text>
                <Text style={TodoItemStyle.textColor}>  {todo.text} - {todo.deadline.toString()}</Text>
                
            </View>
            <View style={TodoItemStyle.TodoItemRight}>
                <Text style={[TodoItemStyle.TodoItemId, TodoItemStyle.textColor]} >{TodoStatus[todo.status]}</Text>
                {todo.status === TodoStatus.Active ?
                    <View  style={TodoItemStyle.TodoItemButtons}>
                       
                        <FontAwesome name="check-circle" size={30} style={TodoItemStyle.TodoItemButton} onPress={handleComplition}/>
                        <FontAwesome name="times-circle" size={30} style={[TodoItemStyle.TodoItemButton, TodoItemStyle.cancelBg]} onPress={handleComplition}/>
                        <FontAwesome name="pencil-square" size={30} style={[TodoItemStyle.TodoItemButton, TodoItemStyle.editBg]} onPress={handleEdit}/>
                       
                    </View>
                    :
                    <>
                    <FontAwesome name="times-circle" size={30} style={[TodoItemStyle.TodoItemButton, TodoItemStyle.dangerBg]} onPress={() => onDelete(todo)}/>
                    <FontAwesome name="times-circle" size={30} style={[TodoItemStyle.TodoItemButton, TodoItemStyle.cancelBg]} onPress={() => onCancel()}/>
                    </>
                    
                }
            </View>
        </View>
    );
}

export default TodoItem;

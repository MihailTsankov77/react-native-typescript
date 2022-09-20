import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Dispatch } from "redux";
import TodoInput from '../components/TodoInput';
import TodoList, { FilterType } from '../components/TodoList';
import {EditTodos, fiterTodos, SearchTodosListening } from "../redux/actions/todo-actions";
import { StoreState } from "../redux/reducers";
import { Todo } from '../model/todo.model';
import TodoFilter from '../components/TodoFilter';
import { TodoAction, TodoAsyncActions } from '../redux/actions/actionTypes';
import { AddTodoStart, DeleteTodoCancel, DeleteTodoStart, EditTodoStart } from '../redux/actions/todo-AsyncActions';
import Toast from 'react-native-root-toast';

function mapStateToProps({ todos: {todos, edited, filter, error, isLoading, search}}: StoreState) {
    return {
        todos,
        edited,
        filter,
        error,
        isLoading,
        search
    }
}

function mapDispatchToProps(dispatch: Dispatch<TodoAction | TodoAsyncActions>) {
    return {
        onDeleteCancel: () => dispatch(DeleteTodoCancel()),
        onSearch: (text: string) => dispatch(SearchTodosListening(text)),
        onAddTodo: (todo: Todo) => dispatch(AddTodoStart(todo)),
        onDeleteTodo: (todo: Todo) => dispatch(DeleteTodoStart(todo)),
        onEditTodo: (todo: Todo) => dispatch(EditTodoStart(todo)),
        onEdit: (todo: Todo) => dispatch(EditTodos(todo)),
        onFilter: (filter: FilterType) => dispatch(fiterTodos(filter)),
    }
}

type TodoCallback = (todo: Todo) => void;

interface EnthusiasmProps {
    todos: Todo[];
    edited: Todo | undefined;
    filter: FilterType;
    error: undefined | string;
    isLoading: boolean;
    search: string;

    onDeleteCancel: () => void;
    onSearch: (text: string)=> void;
    onAddTodo: TodoCallback;
    onDeleteTodo: TodoCallback;
    onEditTodo: TodoCallback;
    onEdit: TodoCallback;
    onFilter: (filter: FilterType) => void;
}

interface State{
    search: string;
}


class TodoContainer extends PureComponent<EnthusiasmProps,State> {

    state: Readonly<State> ={
        search: '',
    }

    handleTextChange = (text: string) =>{
        this.props.onSearch(text);
        this.setState({search: text});
    }


    render() {
        if(this.props.error!==undefined){
            Toast.show(this.props.error, {
                position: Toast.positions.CENTER,
                backgroundColor: 'red',
                duration: Toast.durations.LONG,
            });
        }
        
       
        return (
        <View style={styles.cont}>
            
                <Text>TODO Demo</Text>
                <TodoInput onCreateTodo={this.props.edited? this.props.onEditTodo : this.props.onAddTodo} todo={this.props.edited} />

 
                <TodoFilter filter={this.props.filter} onFilterChange={this.props.onFilter} />
                <TextInput style={{borderColor: "black", borderWidth:25}} onChangeText={this.handleTextChange} value={this.state.search}/>                
                <View style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" animating={this.props.isLoading}/>
                </View>
                {this.props.error &&
                    <View style={[styles.container, styles.horizontal]}>
                        <Text>Error: {this.props.error}</Text>
                    </View>
                }
                <TodoList
                    todos={this.props.todos}
                    filter={this.props.filter}
                    search={this.props.search}
                    onUpdate={this.props.onEditTodo}
                    onDelete={this.props.onDeleteTodo} onCancel={this.props.onDeleteCancel} onEdit={this.props.onEdit} />
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

const styles = StyleSheet.create({
    buttons: {
        display: 'flex',
        flexDirection: 'row',
    },
    text: {
        fontSize: 28,
        fontWeight: 'bold',
    },
    cont:{
        width: '100%'
    },
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})
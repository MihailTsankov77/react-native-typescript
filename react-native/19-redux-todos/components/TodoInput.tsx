import { text } from 'node:stream/consumers';
import React, { Component, JSXElementConstructor, ReactElement, ReactNode, useCallback } from 'react';
import { Optional } from '../model/shared-types';
import { Todo } from '../model/todo.model';
import { Button, NativeSyntheticEvent, Platform, Pressable, Text, TextInput, TextInputChangeEventData, TouchableOpacity, View } from 'react-native';
import TodoInputStyle from '../css/TodoInputStyle';
import Btn from './CustomButton';
import Input, { onChangeFunction } from './CustomFormInput';
import Form, { FormViewStyle } from './CustomForm';
import { TodoListener } from './TodoList';
import { DatePickerModal } from 'react-native-paper-dates';
import { CalendarDate, SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';

import { Provider as PaperProvider } from 'react-native-paper';

interface TodoInputProps {
  todo: Optional<Todo>
  onCreateTodo: TodoListener;
}

type TodoInputState = {
  id: undefined | number
  text: string;
  deadline: string;
  showDatepicker: boolean;
}
type FieldToLabel = {
  [field in keyof Partial<TodoInputState>]: ReactNode;
}

export default class TodoInput extends Component<TodoInputProps, TodoInputState> {
  state: Readonly<TodoInputState> = {
    id: this.props.todo?.id || undefined,
    text: this.props.todo?.text || '',
    deadline: this.props.todo?.deadline || '',
    showDatepicker:false
  }
  componentDidUpdate(prevProps: Readonly<TodoInputProps>, prevState: Readonly<TodoInputState>, snapshot?: any): void {
    
    if(this.props === prevProps) return;
    if(this.props.todo===undefined) return;

    this.setState({
      id: this.props.todo.id!,
      text: this.props.todo.text,
      deadline: this.props.todo.deadline,
      showDatepicker:false
    })
  }

  handleTodoSubmit = () => {
    this.props.onCreateTodo(new Todo(this.state.text, new Date(this.state.deadline).toDateString(), this.state.id));
  }

  handleTextChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name as keyof TodoInputState;
    const stateUpdate = { [fieldName]: event.target.value } as unknown as TodoInputState;
    this.setState(stateUpdate);
  }


  handleTextChange: onChangeFunction = (target: string) => {
    return (text: string) => {
      const fieldUpdate = { [target]: text } as unknown as TodoInputState;
      this.setState(fieldUpdate);
    }
  }

  handleFormReset = () => {
    for(const key in this.state){
      const fieldUpdate = { [key]: "" } as unknown as TodoInputState;
      this.setState(fieldUpdate);
    }
  }

  handleFieldChanged(field: string, text: string) {
    const stateUpdate = { [field]: text } as unknown as TodoInputState;
    this.setState(stateUpdate);
}

handleDateChange = ({ date }: { date: CalendarDate }) => {
  this.handleFieldChanged('deadline', date ? getIsoDate(date) : '');
  this.setState({ showDatepicker: false });
}

  render() {

const ShowPickerTitle = this.state.deadline===''? "Show picker!": this.state.deadline;
    return (
      <Form>
       
         <View style={FormViewStyle.rowLebel}>
            <Input lebelText='What to do next?' value={this.state.text} onChange={this.handleTextChange} target='text' len='r1'/>
            {/* <Input lebelText='What to do next?' value={this.state.text} onChange={this.handleTextChange} target='text' len='r2'/>
            <Input lebelText='What to do next?' value={this.state.text} onChange={this.handleTextChange} target='text' len='r2'/> */}
         </View>
         
         <View >
                    <TextInput value={this.state.deadline}
                        onChangeText={this.handleFieldChanged.bind(this, 'deadline')}
                    />
                    <Button
                        color='gray'
                        onPress={() => this.setState({ showDatepicker: true })}
                        title="Choose Date"
                    />
                </View>
           
            <View>
        <PaperProvider>
          <DatePickerModal
                  locale="en"
                  mode="single"
                  visible={this.state.showDatepicker}
                  onDismiss={() => this.setState({ showDatepicker: false })}
                  date={new Date()}
                  onConfirm={this.handleDateChange}
                  onChange={this.handleDateChange}
                  saveLabel="Save"
              />
      </PaperProvider>
      </View>
        <View style={FormViewStyle.rowLebel}>
            <Btn value='Add Todo' event={this.handleTodoSubmit} />
            <Btn value='Reset' bgColor='red' event={this.handleFormReset}/>
        </View>
      </Form>
     
      )
  }
}


export function getIsoDate(date: Date) {
  return date.toISOString().split('T')[0];
}

// import {
//   en,
//   registerTranslation,
// } from 'react-native-paper-dates'
// registerTranslation('en', en)
// import React, { Component, ReactNode, Fragment, ReactElement, JSXElementConstructor } from 'react';
// import { Button, Text, TextInput, View, StyleSheet, Platform } from 'react-native';
// import { Optional} from '../model/shared-types';
// import { Todo, TodoStatus } from '../model/todo.model';
// import { DatePickerModal } from 'react-native-paper-dates';
// import { CalendarDate, SingleChange } from 'react-native-paper-dates/lib/typescript/Date/Calendar';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import { TodoListener } from './TodoList';

// interface TodoInputProps {
//   todo: Optional<Todo>;
//   onCreateTodo: TodoListener;
//   children?: ReactNode;
// }

// interface TodoInputState {
//   id: number;
//   text: string;
//   deadline: string;
//   showDatepicker: boolean;
// }

// interface FieldToLabelMap {
//   [field: string]: ReactNode;
// }

// class TodoInput extends Component<TodoInputProps, TodoInputState> {
//   state: Readonly<TodoInputState> = {
//       id: this.props.todo?.id || 0,
//       text: this.props.todo?.text || '',
//       deadline: this.props.todo?.deadline || getIsoDate(new Date()),
//       showDatepicker: false
//   }

//   componentDidUpdate(prevProps: Readonly<TodoInputProps>, prevState: Readonly<TodoInputState>, snapshot?: any): void {
    
//         if(this.props === prevProps) return;
//         if(this.props.todo===undefined) return;
    
//         this.setState({
//           id: this.props.todo.id,
//           text: this.props.todo.text,
//           deadline: this.props.todo.deadline,
//           showDatepicker:false
//         })
//       }
//   handleTodoSubmit = () => {
//       this.props.onCreateTodo(
//           new Todo(this.state.text, getIsoDate(new Date(this.state.deadline)), TodoStatus.Active,
//               this.props.todo ? this.props.todo.id : this.state.id));
//       this.setState({ text: '', deadline: '' , id: this.state.id+1})
//   }

//   handleFieldChanged(field: string, text: string) {
//       const stateUpdate = { [field]: text } as unknown as TodoInputState;
//       this.setState(stateUpdate);
//   }

//   handletodoReset = () => {
//       this.setState({ text: '', deadline: getIsoDate(new Date()), id: '' })
//   }

//   handleDateChange = ({ date }: { date: CalendarDate }) => {
//       this.handleFieldChanged('deadline', date ? getIsoDate(date) : '');
//       this.setState({ showDatepicker: false });
//   }

//   render() {
//       return (
//         Pape
//           <View style={styles.form}>
//               <Text style={styles.label}>ID</Text>
//               <Text style={styles.idField}>{this.state.id}</Text>
//               <Text style={styles.label}>What to do next?</Text>
//               <TextInput style={styles.input} value={this.state.text}
//                   onChangeText={this.handleFieldChanged.bind(this, 'text')}
//               />
//               <Text style={styles.label}>What's the deadline?</Text>
//               <View style={styles.dateChooser}>
//                   <TextInput style={styles.dateInput} value={this.state.deadline}
//                       onChangeText={this.handleFieldChanged.bind(this, 'deadline')}
//                   />
//                   <Button
//                       color='gray'
//                       onPress={() => this.setState({ showDatepicker: true })}
//                       title="Choose Date"
//                   />
//               </View>



//               {/* <DateTimePickerModal
//                   isVisible={this.state.showDatepicker}
//                   date={new Date(this.state.deadline)}
//                   mode='date'
//                   onConfirm={(date) => {
//                       this.handleFieldChanged('deadline', date ? date.toISOString().split('T')[0] : '');
//                       this.setState({ showDatepicker: false });
//                   }}
//                   onCancel={() => this.setState({ showDatepicker: false })}
//               /> */}

//               <DatePickerModal
//                   locale="en"
//                   mode="single"
//                   visible={this.state.showDatepicker}
//                   onDismiss={() => this.setState({ showDatepicker: false })}
//                   date={new Date(this.state.deadline)}
//                   onConfirm={this.handleDateChange}
//                   onChange={this.handleDateChange}
//                   saveLabel="Save"
//               />
//               <View style={styles.buttons}>
//                   <FontAwesome.Button backgroundColor="green" size={45} onPress={this.handleTodoSubmit} name='check-circle'>
//                       <Text style={styles.buttonText}>Add TODO</Text>
//                   </FontAwesome.Button>
//                   <FontAwesome.Button backgroundColor="red" size={45} onPress={this.handletodoReset} name='times-circle'>
//                       <Text style={styles.buttonText}>Reset</Text>
//                   </FontAwesome.Button>
//               </View>
//           </View>
//           </PaperProvider> 
//       );
//   }
// }

// export default TodoInput;

// const styles = StyleSheet.create({
//   form: {
//       padding: 10,
//       width: '100%',
//   },
//   label: {
//       paddingTop: 15,
//       fontSize: 20,
//       alignSelf: 'flex-start',
//   },
//   input: {
//       fontSize: 24,
//       padding: 5,
//       borderColor: 'gray',
//       borderWidth: 1,
//   },
//   idField: {
//       fontSize: 24,
//       width: '100%',
//       height: 45,
//       padding: 5,
//       borderColor: 'gray',
//       borderWidth: 1,
//   },
//   dateChooser: {
//       display: 'flex',
//       flexDirection: 'row',
//   },
//   dateInput: {
//       flex: 1,
//       fontSize: 20,
//       padding: 5,
//       borderColor: 'gray',
//       borderWidth: 1,
//   },
//   buttons: {
//       fontSize: 45,
//       marginTop: 20,
//       marginBottmo: 30,
//       display: 'flex',
//       flexDirection: 'row',
//       gap: 10,
//       width: '100%',
//   },
//   buttonText: {
//       fontSize: 24,
//       color: 'white',
//   },
// });

// export function getIsoDate(date: Date) {
//   return date.toISOString().split('T')[0];
// }
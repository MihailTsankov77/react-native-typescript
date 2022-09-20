import { StyleSheet } from "react-native";

const TodoItemStyle = StyleSheet.create({
    TodoItem: {
      
        display: 'flex' ,
        flexFlow: "row nowrap",
        justifyContent: 'space-between',
        padding: 5,
        width: 90,
     
    },
    TodoItemLeft: {
      display: 'flex' ,
      flexFlow: "row nowrap",
      
     width:300,
      // width: 'fit-content',
    backgroundColor: "lemonchiffon"
  },
    TodoItemId: {
        paddingRight: 10,
    },
    TodoItemRight: {
        display: "flex",
        flexFlow: "row nowrap",
        gap: 10,
        alignItems: "center",
        backgroundColor: "lemonchiffon",
    },
    

    TodoItemButtons: {
      
      display: "flex",
      flexFlow: "row nowrap",
      gap: 5,
    },
    
    TodoItemButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width:30,
      color: 'lightgreen',
      borderRadius: 4,
      elevation: 3,
     cursor:"pointer"
      
    },
    
    textColor: {
      color: "black",
    },
    btnColor: {
      color: "white",
    },
    
    
    dangerBg: {
      color: "lightcoral",
    },
    
    cancelBg: {
      color: "gray"
    },
    
    editBg: {
      color: "cornflowerblue",
    }
    
   

})

export default TodoItemStyle
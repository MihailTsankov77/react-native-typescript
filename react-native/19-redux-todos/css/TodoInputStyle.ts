import { StyleSheet } from "react-native";

const color = 'gray'
const TodoInputStyle = StyleSheet.create({
    form:{
        display: "flex",
        flexFlow: "colum nowrap",
        alignItems: "center",
        width: '80%',
        padding:10
    },

    row:{
        alignSelf: 'center',
        display:'flex',
        flexFlow: 'row wrap',
        width: '100%',
    },
    lebel:{
        width: '80%',
        color:"rgba(0,0,0, 0.7)",
        alignSelf: "center",
    },
    
    input: {
        width: '50%',
        margin:3,
        padding:5,
        paddingLeft:20,
        borderBottomWidth: 4,
        borderColor: "rgba(230,230,230, 1)",
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        backgroundColor: "rgba(236,236,236, 0.3)",
        alignSelf: "center"
    },

   
})

export default TodoInputStyle

import React, { ReactNode, useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Colorable } from "./shared-interfaces";




interface FormProps extends Colorable{
    title?: string;
    children?: ReactNode
}

const Form = ({children, title, bgColor, color}: FormProps) => {
    const [prestine, setPrestine] = useState(true);

    return (
        <View style={formStyle.form}>
            {children}
        </View>
    );


}

const formStyle = StyleSheet.create({

    form:{
        display: "flex",
        flexFlow: "colum nowrap",
        alignItems: "center",
        width: '90%',
        padding:10
    },

   
});

export const FormViewStyle = StyleSheet.create({
    row:{
        alignSelf: 'center',
        display:'flex',
        flexFlow: 'row wrap',
        width: '100%',
    },
    rowLebel:{
        
        justifyContent: 'space-between',
    },
    

});

export default Form;
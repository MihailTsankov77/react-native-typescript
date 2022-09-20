import React, { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { getSizeF } from "../shared/shared-functions";
import { Colorable, InputField, Resizeable} from "../shared/shared-interfaces";

interface InputProps extends Colorable, Resizeable, InputField {
   child: ReactNode;
   prestine: boolean;
}

const getSize = getSizeF(3, 2, 1, 520);

const InputContainer = ({child, prestine, label, error, color, len = 'r1'}: InputProps) => {

    let mainStyle = {};
    switch(getSize(len)){
        case 1: mainStyle = inputContainerStyle.mainR1; break;
        case 2: mainStyle = inputContainerStyle.mainR2; break;
        case 3: mainStyle = inputContainerStyle.mainR3; break;
    }
   
    return (
        <View style={{...inputContainerStyle.main, ...mainStyle}}>
            <View style={inputContainerStyle.column}>

                <Text style={{...inputContainerStyle.label, color: color}}>{label}</Text>

                {child}

                {(error && !prestine) ? 
                    (<Text style={inputContainerStyle.error}>{error}</Text>) :
                    (<Text> </Text>)}
            </View>
        </View>
    );

}


const inputContainerStyle = StyleSheet.create({
    main:{
        minWidth:200,
        padding:5,
        margin:2,
    },

    mainR1:{
        width: '100%',
    },

    mainR2:{
        width: '48%',
    },

    mainR3:{
        width: '30%',
    },

    column: {
        alignSelf: 'center',
        display: 'flex',
        flexFlow: 'column wrap',
        alignItems: "center",
        width: '100%',
    },

    label: {
        width: '100%',
        color: "rgba(0,0,0, 0.7)",
        alignSelf: "center",
    },

    error: {
        marginLeft: 50,
        width: '50%',
        color: "red",
        alignSelf: "center",
    },
});

export const inputStyle  = StyleSheet.create({
    input: {  
        width: '100%',
        margin: 3,
        padding: 5,
        paddingLeft: 20,
        borderBottomWidth: 4,
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        alignSelf: "center",
    },
});

export default InputContainer;
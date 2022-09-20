import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, TextInput, View } from "react-native";
import { Colorable, RowLenght } from "./shared-interfaces";

export type onChangeFunction = (target: string) => (text: string) => void;

interface inputProps extends Colorable {
    value: string;
    onChange: onChangeFunction;
    target: string;

    lebelText?: string
    error?: string;
    len?: RowLenght;
}

const Input = ({ value, onChange, target, lebelText, bgColor = "rgba(236,236,236, 0.3)", color, error, len ='r1' }: inputProps) => {
    const [prestine, setPrestine] = useState(true);
    const mainStyle = (len==="r1")? inputStyle.mainR1 : (len==="r2")? inputStyle.mainR2 : inputStyle.mainR3;
   
    return (
        <View style={{...inputStyle.main, ...mainStyle}}>
            <View style={inputStyle.column}>
                <Text style={{...inputStyle.lebel, color: color}}>{lebelText}</Text>

                <TextInput onChange={() => setPrestine(false)} 
                    onChangeText={onChange(target)} value={value} 
                    style={{...inputStyle.input, backgroundColor: bgColor}}/>

                {(error && !prestine) ? 
                    (<Text style={inputStyle.error}>{error}</Text>) :
                    (<Text> </Text>)}
            </View>
        </View>
    );


}

const inputStyle = StyleSheet.create({
    main:{
        padding:5,
        margin:2,
    },
    mainR1:{
        width: '100%',
    },
    mainR2:{
        width: '45%',
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
    lebel: {
        width: '100%',
        color: "rgba(0,0,0, 0.7)",
        alignSelf: "center",
    },

    input: {
        width: '100%',
        margin: 3,
        padding: 5,
        paddingLeft: 20,
        borderBottomWidth: 4,
        borderColor: "rgba(230,230,230, 1)",
        borderBottomStartRadius: 40,
        borderBottomEndRadius: 40,
        alignSelf: "center"
    },

    error: {
        marginLeft: 50,
        width: '50%',
        color: "red",
        alignSelf: "center",
    },
});


export default Input;
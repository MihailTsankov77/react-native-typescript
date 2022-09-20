import React from "react";
import { Pressable, StyleSheet, Text} from "react-native";
import { Colorable } from "./shared-interfaces";

interface BtnProps extends Colorable{
    value: string;
    event: () => void;
    disable?: boolean;
}

const Btn = ({ value, color = 'white', bgColor = 'lightgreen', event, disable = false }: BtnProps) => {
    
    
    return (
        <Pressable style={{...btnStyle.button, backgroundColor: bgColor}} onPress={event} disabled={disable}>
            <Text style={{...btnStyle.buttonText, color: color}}>{value}</Text>
        </Pressable>
    );
}

const btnStyle = StyleSheet.create({
    button: {
        width: 100,
        padding: 5,
        margin: 3,
        borderRadius: 10,
        alignSelf: "center",
    },

    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
});

export default Btn;
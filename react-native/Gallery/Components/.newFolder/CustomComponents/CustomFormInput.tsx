import React, { useState } from "react";
import { TextInput } from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable} from "./shared/shared-interfaces";
import InputContainer, { inputStyle } from "./CustomElements/CustomInputContainer";

type multilineT = {
    enable: boolean;
    lines?: number;
}

interface inputProps extends Colorable, Resizeable, InputField, onChangeInterface {
    multiline?: multilineT;
    isPassword?: boolean;
}

const Input = ({ value, onChange, bgColor = "rgba(236,236,236, 0.9)", color ="grey", borderColor = "rgba(230,230,230, 1)", 
                multiline = {enable: false ,lines :1}, prestine = true, isPassword = false, ...rest}: inputProps) => {
    
   
   
    return (
        
        <InputContainer color={color} {...rest}

            child={
                <TextInput 
                        onChangeText={onChange} value={value} 
                        style={{...inputStyle.input, backgroundColor: bgColor, borderColor: borderColor}} 
                        multiline={multiline.enable} numberOfLines={multiline.lines}
                        secureTextEntry={isPassword}/>
                } 
            prestine={prestine} value={""} />
    );
}

export default Input;
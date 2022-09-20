import React, { useState } from "react";
import { StyleSheet} from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable } from "./shared/shared-interfaces";
import InputContainer, { inputStyle } from "./CustomElements/CustomInputContainer";
import DropdownMain from "./CustomElements/CustomDropdownMain";
import { notImplemeneted } from "./shared/shared-functions";


interface DropdownProps extends Colorable, Resizeable, InputField, onChangeInterface{
    defaultValue?: [string, number];
    data: [string, number][];
}

const Dropdown = ({value, onChange = notImplemeneted, data, label = "Dropdown", defaultValue = [label, -1], bgColor = "rgba(236,236,236, 0.9)", 
                  color ="grey", borderColor = "rgba(230,230,230, 1)", prestine = true, ...rest}: DropdownProps) => {
    
   
   
    const allProps = {value, bgColor, color, borderColor, data, defaultValue, prestine};
    
    
    return (
        <InputContainer label={label}  color={color} {...rest}

            child={
                <DropdownMain target={""} onChange={(target: string) => {
                    onChange(target);
                } } {...allProps}/>
            } 
         prestine={prestine} value={""} />
    );
}


const DropdownStyle = StyleSheet.create({
    
    input: {
        ...inputStyle.input,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
    },

    item:{
        fontSize: 20,
    }
});

export default Dropdown;
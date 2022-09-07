

import React, { ReactNode, useState } from "react";
import { ScrollView, StyleSheet, Text, View} from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable } from "./shared/shared-interfaces";
import InputContainer, { inputStyle } from "./CustomElements/CustomInputContainer";
import { CustomStyle } from "./shared/shared-styles";
import Chip from "./CustomElements/CustomChipElement";
import DropdownMain from "./CustomElements/CustomDropdownMain";
import { notImplemeneted } from "./shared/shared-functions";



interface ChipsProps extends Colorable, Resizeable, InputField, onChangeInterface{
    defaultValue?: [string, number];
    data: [string, number][];
    chipProps?: Colorable
}

const Chips = ({value ="", onChange = notImplemeneted, data, label = "Chips", defaultValue = ['Choose tag', -1], bgColor = "rgba(236,236,236, 0.9)", 
                  color ="grey", borderColor = "rgba(230,230,230, 1)", chipProps, prestine = true, ...rest}: ChipsProps) => {
  
    const allProps = {value, bgColor, color, borderColor, defaultValue, prestine};
    
    const values: string[] = value.split(", ");

    const chips: ReactNode[] =[];
    
    values.filter(V => V)
            .forEach((V, index) => chips.push(
                <Chip {...chipProps} key={index} value={V} event={()=>handleRemove(V)} ></Chip>
            ));
    chips.push(<Text key={-1}>   </Text>);

   
    function handleOnChange(itemValue: string){
        values.push(itemValue);
        onChange(values.join(", "));
    }
    function handleRemove(itemValue: string){
        onChange(values.filter(V=> V!=itemValue).join(", "));
    }

    return (
        <InputContainer label={label}  color={color} {...rest}

        child={
            <View style={ChipsStyle.outerContainer}>
                <ScrollView nestedScrollEnabled style={{...ChipsStyle.constainer, borderColor: borderColor}} horizontal={true}>
                    {chips}  
                </ScrollView>
                
                <DropdownMain target={""} basicDropdown={false} data={data.filter(item => values.indexOf(item[0]) < 0)} onChange={handleOnChange} {...allProps} height={50}/>
            </View>}
            prestine={prestine} value={""} />
    );
}


const ChipsStyle = StyleSheet.create({
    outerContainer:{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    constainer:{
        ...inputStyle.input,
        ...CustomStyle.row,
        flexWrap: 'nowrap',
        position: 'absolute',

        width: "85%",
        height: 50,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 0,
        zIndex: 5,
        paddingTop:10,
    },
    
    item:{
        fontSize: 20,
    }
});

export default Chips;
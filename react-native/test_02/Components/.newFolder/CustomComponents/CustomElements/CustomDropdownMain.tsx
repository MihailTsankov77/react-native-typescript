import React, { ReactNode} from "react";
import { Platform, StyleSheet, Text} from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable } from "../shared/shared-interfaces";
import {Picker} from '@react-native-picker/picker';
import SelectDropdown from "react-native-select-dropdown";
import { inputStyle } from "./CustomInputContainer";

interface DropdownMainProps extends Colorable, Resizeable, InputField, onChangeInterface{
    defaultValue: [string, number];
    data:  [string, number][];
    basicDropdown?: boolean;
    prestine: boolean;
}

//https://hossein-zare.github.io/react-native-dropdown-picker-website/docs/usage

const DropdownMain = ({onChange, data, value, defaultValue, bgColor = "rgba(236,236,236, 0.9)", 
                  color ="grey", borderColor = "rgba(230,230,230, 1)", height = 40, basicDropdown = true, prestine}: DropdownMainProps) => {
    
    let items: ReactNode[] =[];
    if(Platform.OS ==='web'){
                    
    if(basicDropdown){
        items =
            [<Picker.Item style={DropdownMainStyle.item} key={defaultValue[1]} label={defaultValue[0]}
                value={defaultValue[1]} enabled={prestine} />];
    }else{
        items= 
            [<Picker.Item style={DropdownMainStyle.item} key={defaultValue[1]} label={(!prestine)? "" : defaultValue[0]} 
                        value={defaultValue[0]} />];
    }   

    data.forEach(item => items.push(
        <Picker.Item style={{...DropdownMainStyle.item, backgroundColor: bgColor, color: color}} key={item[1]} 
                    label={item[0]} value={item[0]}/>));
  }
                 
    return (
        <>
          {(Platform.OS !=='web')?    
           (<SelectDropdown
            data={data.map(item => item[0])}
            onSelect={(itemValue, itemIndex) =>{
                onChange(itemValue);
            }}
            defaultButtonText={defaultValue[0]}
            buttonTextAfterSelection={(selectedItem, index) => {
                
                return basicDropdown? selectedItem : '';
            }}
            rowTextForSelection={(item, index) => { return item;}}

            buttonStyle={{...DropdownMainStyle.inputWeb, height: height, backgroundColor: bgColor, borderColor: borderColor}}
            buttonTextStyle={{...DropdownMainStyle.dropdownTxtStyle, color: color}}
            rowStyle={{...DropdownMainStyle.rowStyle, backgroundColor: bgColor, borderColor: borderColor}}
            rowTextStyle={{...DropdownMainStyle.rowTxtStyle,color: color}}
            
            renderDropdownIcon={(isOpened) => {
              return (
                <Text>fdgf</Text>
              );
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={DropdownMainStyle.dropdownStyle}
          />)
        :
            (<Picker 
            style={{...DropdownMainStyle.input, height: height, backgroundColor: bgColor, color: color, borderColor: borderColor}}
            itemStyle={DropdownMainStyle.item}
            dropdownIconColor={color}
            mode="dropdown"

            selectedValue={value}
            onValueChange={(itemValue, itemIndex) =>{
                onChange(itemValue);
            }}>
            {items}
        </Picker>)
        }
        </>
    );
}

const DropdownMainStyle = StyleSheet.create({
    
    input: {
        ...inputStyle.input,
        borderBottomStartRadius: 20,
        borderBottomEndRadius: 20,
        
    },
    inputWeb: {
        ...inputStyle.input,
        borderBottomStartRadius: 0,
        borderBottomEndRadius: 0,
        
    },
    dropdownTxtStyle: { 
        color: "#444", 
        textAlign: "left" 
    },

    dropdownStyle: { 
        borderRadius: 10,
        backgroundColor: "transparent" 
    },
    item:{
        fontSize: 20,
    },
    rowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
      },
      rowTxtStyle: { 
        color: "#444", textAlign: "left" 
    },
});



export default DropdownMain;


import * as ImageManipulator from "expo-image-manipulator";
import { SaveFormat } from 'expo-image-manipulator';
import * as ImagePickerApi from 'expo-image-picker';
import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, TextInput, View } from "react-native";
import { Colorable, InputField, onChangeInterface, Resizeable, RowLenght} from "./shared/shared-interfaces";
import InputContainer, { inputStyle } from "./CustomElements/CustomInputContainer";
import Btn from "./CustomButton";
import { CustomStyle } from "./shared/shared-styles";
import { getSizeF, isSmallScreen, notImplemeneted } from "./shared/shared-functions";



interface inputProps extends Colorable, Resizeable, InputField, onChangeInterface {
   btnStyleProps?: Colorable;
    
}
const getSizeButton = getSizeF(200,'75%', '100%', 200, 450, 1130);

const ImagePicker = ({ value, onChange = notImplemeneted, bgColor = "rgba(236,236,236, 0.9)", color ="grey", borderColor = "rgba(230,230,230, 1)", 
                    btnStyleProps = {bgColor: "lightblue", color: "white"}, prestine = true,...rest}: inputProps) => {
    
    const openImagePickerAsync = async () => {
        const permissionResult = await ImagePickerApi.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }
    
        const pickerResult = await ImagePickerApi.launchImageLibraryAsync();
        
        if (pickerResult.cancelled === true) {
          return;
        }
        const manipResult = await ImageManipulator.manipulateAsync(
          pickerResult.uri,
          [],
          {base64: true, format: SaveFormat.PNG }
        );
       
        onChange(`data:image/xxx;base64,${manipResult.base64}`);
          
      };
      const containerStyle = (isSmallScreen(450))? ImagePickerStyle.containerSmall : ImagePickerStyle.containerBig;
   
    return (
        <View style={{...ImagePickerStyle.container, ...containerStyle}}>
        <View style={ImagePickerStyle.inputsOuterContainer}>
        
            <InputContainer color={color} {...rest}

                child={
                        
                    <View style={ImagePickerStyle.inputsContainer}>
                        {!isSmallScreen(450)&&
                            <View style={ImagePickerStyle.inputContainer}>
                                <TextInput
                                    onChangeText={onChange} value={value} 
                                    style={{...inputStyle.input, backgroundColor: bgColor, borderColor: borderColor}}/>
                            </View>
                        }
                            
                            <View style={{width: getSizeButton('r3')}}>
                                <Btn {...btnStyleProps} value="Upload" event={openImagePickerAsync} len="r1"  />
                            </View>
                          
                            </View>
                    

                    } 
                prestine={prestine} value={""} />
            </View>
            <Text>{(value)&&
                <View style={ImagePickerStyle.imageContainer}>
                        <Image source={{uri: value}} style={{...ImagePickerStyle.image, borderColor: borderColor}}/>
                    </View>
            }</Text>
            
                    </View>
    );
}

const ImageSize = isSmallScreen(550)? 140: 100;

const ImagePickerStyle = StyleSheet.create({


    container:{
        width: "100%",
        display: 'flex',
    },

    containerBig:{
        flexFlow: "row nowrap",
        justifyContent: 'space-between',
    },
    containerSmall:{
        flexFlow: "column-reverse wrap",
        alignItems:'center',
    },

    image:{
        borderRadius: ImageSize,
        width: ImageSize,
        height: ImageSize,
        borderWidth: ImageSize/50,
    },

    imageContainer:{
        width: "10%",
        alignItems:'center',
        alignSelf: 'center',
    },

    inputsContainer:{
        padding: 5,
        ...CustomStyle.row,
        
        width: "100%",
    },
    inputsOuterContainer:{
       
        width: "85%",
    },
    inputContainer:{
        marginRight: 10,
        width: "75%",
    },

    btnContainer:{
        
       alignContent:"center",
    },

    
   
});


export default ImagePicker;
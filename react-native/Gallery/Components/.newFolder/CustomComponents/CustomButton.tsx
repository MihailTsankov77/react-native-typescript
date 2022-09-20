import React from "react";
import { Image, Pressable, StyleSheet, Text, View} from "react-native";
import { Colorable, ImageProps, Listable, Resizeable } from "./shared/shared-interfaces";
import { getSizeF } from "./shared/shared-functions";
import { CustomStyle } from "./shared/shared-styles";

interface BtnProps extends Colorable, Resizeable, Listable{
    value?: string;
    event: () => any;
    disable?: boolean;
}

//hover

const getSize = getSizeF("30%", '45%', '100%', 200, 520);

const Btn = ({ value, event, color = 'white', bgColor = 'lightgreen', borderColor = bgColor, image , len, disable=false, key="0"}: BtnProps) => {
    
    const buttonWidth = getSize(len);
   
    return (
        <Pressable key={key} 
            style={{...btnStyle.button, backgroundColor: (disable)? "transparent" : bgColor, borderColor: borderColor,  width: buttonWidth,}} 
                onPress={event} disabled={disable} android_ripple={{color: color, radius: 30, foreground:true}} 
                hitSlop={HitSlop}>

            <View style={CustomStyle.rowInput}> 
                {value && 
                    <Text selectable={false} style={{...btnStyle.buttonText, color: (disable)? "gray" : color}}>{value}</Text>}

                {image &&
                    <Image style={{height: (image.height)? image.height : 30, width: (image.width)? image.width: 30 }} source={{uri: image.uri}}/>}
            </View>
        </Pressable>
    );
}

const btnStyle = StyleSheet.create({
    button: {
        padding: 5,
        margin: 3,
        borderRadius: 10,
        alignSelf: "center",
        borderWidth:3,
    },

    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
    },
  
});

const HitSlop = {
    bottom: 15,
    left: 5,
    right: 5,
    top: 15
}

export default Btn;

import React from "react";
import { StyleSheet, Text, View} from "react-native";
import Btn from "../CustomButton";
import { Colorable } from "../shared/shared-interfaces";

interface ChipProps extends Colorable{
    value: string
    event: () => any;
    disable?: boolean;
}

function maxCharacters(value: string): {label: string, chipWidth: number}{
    if(value.length > 17)
        return {label: value.substring(0, 16) + "...", chipWidth: 200};
    
    if(value.length <10)
        return {label: value, chipWidth: 110};

        return {label: value, chipWidth: value.length*11.1}
}

const Chip = ({value, event, color = 'white', bgColor = 'lightgray', borderColor = bgColor, disable=false}: ChipProps) => {
    
    const {label, chipWidth} = maxCharacters(value);
    
    return (
       
            <View  style={{...ChipStyle.chip, backgroundColor: bgColor, width: chipWidth}} >
                <View style={{...ChipStyle.labelContainer, width: (chipWidth/4*3)}}>
                    <Text style={{...ChipStyle.label, color: color}} >{label}</Text>
                </View>

                <View style={{...ChipStyle.buttonContainer, width: (chipWidth/4)}}>
                    <Btn bgColor="transparent" image={{uri: "https://cdn-icons-png.flaticon.com/512/109/109602.png", width: 15, height:15}}
                        event={event} len='r1' disable={disable}/>
                </View>
            </View>
    );
}

const ChipStyle = StyleSheet.create({
    labelContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        alignContent: 'center',
        height: 30,
        padding: "1%",
        paddingLeft:5,
       
    },
    buttonContainer:{
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'flex-start',
        padding:0,
        height: 30,
    },
    label:{
       
    },
    chip:{
        display:'flex',
        flexDirection:'row',
        height: 30,
        marginRight: 10,
        backgroundColor: 'gray',
        borderRadius: 200,
        alignItems: "center",
        minWidth: 100,
        maxWidth: 200,
    },

});



export default Chip;






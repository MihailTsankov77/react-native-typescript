import React, {ReactNode} from "react";
import {Dimensions, StyleSheet } from "react-native";
import { View } from "react-native";
import Btn from "../CustomButton";
import { Colorable} from "../shared/shared-interfaces";

interface HamburgerNavbarProps extends Colorable{
    children: ReactNode;
    closeEvent: () => void;
}

const HamburgerNavbar = ({children, bgColor, closeEvent}: HamburgerNavbarProps) => {
    
    return (
        <View style={{...HamburgerNavbarStyle.HamburgerNavbar, backgroundColor: bgColor}}>
        
            <View style={HamburgerNavbarStyle.closeContainer}>
                <View style={HamburgerNavbarStyle.closeBtn}>
                    <Btn bgColor="transparent" image = {{uri:"https://cdn-icons-png.flaticon.com/512/109/109602.png", width:15, height: 15}} 
                        event={closeEvent}/>   
                </View> 
            </View>
            
            <View style={HamburgerNavbarStyle.container}>
                 <View style={HamburgerNavbarStyle.buttonsContainer}>
                   {children}
                </View>
            </View>   
        </View>
    );
}

const HamburgerNavbarStyle = StyleSheet.create({

    HamburgerNavbar:{
        width: Dimensions.get('window').width,
        height:  Dimensions.get('window').height,
        display:"flex",
        flexDirection: 'column',
        padding: "5%",
    },

    container:{
        display:"flex",
        flexDirection: 'row',
        height:"90%",
        width: "100%",
        alignItems: 'center'
    },

    closeContainer:{
        width: "100%",
       display:"flex",
       flexDirection: 'row-reverse',
       padding:5,
    },
    closeBtn:{
        width:"10%"
    },

    buttonsContainer:{
       width: "100%",
        alignSelf:"center",
    },
    
});

export default HamburgerNavbar;
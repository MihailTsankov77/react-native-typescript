import React, {ReactNode, useState} from "react";
import {Platform, StatusBar, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import Btn from "./CustomButton";
import HamburgerNavbar from "./CustomElements/CustomHamburgerNavbar";
import { Colorable, hasTitle} from "./shared/shared-interfaces";
import { CustomStyle } from "./shared/shared-styles";

interface NavbarProps extends Colorable, hasTitle{
    children: ReactNode;
    stickyNav?: boolean;
}

const Navbar = ({children, title, bgColor = "lightblue", color = 'white',  borderColor="#E0E0E0",
                stickyNav}: NavbarProps) => {

    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    return (
        <View>
            <StatusBar/>

            {!hamburgerOpen?

                (<View style={{...NavbarStyle.Navbar, backgroundColor: bgColor}}>
                    {(title && !stickyNav) &&
                        <View style={NavbarStyle.textContainer}>
                            <Text selectable={false} style={{...NavbarStyle.title, color: color}}>{title}</Text> 
                        </View>
                    }
                        
                    {Platform.OS === 'web'?
                        (<View style={{...NavbarStyle.container,...NavbarStyle.alingnWeb ,borderColor: borderColor}} >
                            <View style={NavbarStyle.buttonsContainer}>
                                {children}
                            </View>
                        </View>)
                        :
                        (<View style={{...NavbarStyle.container,...NavbarStyle.alingnMobile , borderColor: borderColor}}>
                            <View>
                                <Btn bgColor="transparent" image = {{ uri: "https://openclipart.org/image/2000px/221605"}} 
                                    event={() => setHamburgerOpen(true)}/>
                            </View>
                        </View>)
                    }
                </View>)
                :
                (<HamburgerNavbar closeEvent={() => setHamburgerOpen(false)} bgColor={bgColor} color={color} 
                    borderColor={borderColor}>
                    {children}
                </HamburgerNavbar>)
            }
        </View>
    );
}

const NavbarStyle = StyleSheet.create({

    Navbar:{
        ...CustomStyle.row,
        alignItems: "flex-start",
        padding:10,
        paddingBottom: 5,
        
    },

    title:{
        textTransform: "uppercase",
        alignSelf: 'center',
        fontSize: 40,
        padding: 5,
        paddingBottom:10,
    },
    
    textContainer:{
        width: '100%',
        display: 'flex',
        alignContent: 'center',
        paddingBottom: 15,
        paddingTop: 15,
    },

    container:{
        ...CustomStyle.row,
        borderTopWidth:5,
    },

    alingnWeb:{
        alignItems: "center", 
    },

    alingnMobile:{
        alignItems: "flex-end", 
    },

    buttonsContainer:{
        ...CustomStyle.row,
        padding: 5,
        justifyContent: 'center',
    },

});

export default Navbar;
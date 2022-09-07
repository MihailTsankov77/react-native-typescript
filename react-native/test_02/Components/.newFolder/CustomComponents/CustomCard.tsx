import React, {Children, JSXElementConstructor, ReactElement, ReactNode} from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Colorable, hasTitle, Resizeable } from "./shared/shared-interfaces";
import { getSizeF, isSmallScreen } from "./shared/shared-functions";
import { CustomStyle } from "./shared/shared-styles";

interface CardProps extends Colorable, Resizeable, hasTitle{
    children?: ReactNode;
}

const getSize = getSizeF('33%', '50%', '100%', 200, 1100, 1600);

const Card = ({image, children, title, bgColor = "white", borderColor="#E0E0E0", len='r3'}: CardProps) => {
    
    const childs = Children.toArray(Children.toArray(children));
    const buttons: ReactNode[] = childs.filter(node => 
            typeof node !== 'string' && typeof node !== 'number' ?
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (node as ReactElement<any, string | JSXElementConstructor<any>>).type.name === 'Btn' : false);

    const labels: ReactNode[] = [];
    childs.filter(node => 
            typeof node !== 'string' && typeof node !== 'number' ?
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                (node as ReactElement<any, string | JSXElementConstructor<any>>).type.name !== 'Btn' : false)
        .map((label, index) =>{
            labels.push(<View key={index} style={CardStyle.labelContainer}>{label}</View>)});

    const widthContainer = isSmallScreen(550)? '100%' : '50%';
        
    return (
        <View style={{...CardStyle.Card, backgroundColor: bgColor,  width: getSize(len)}}>
            <View style={{...CardStyle.container, borderColor: borderColor}} >

                <View style={CardStyle.titleContainer}>
                    <Text selectable={false} style={CardStyle.title}>{title}</Text>
                </View>

                <View style={CustomStyle.row}>
                    {(image && image.uri!=="") &&
                    <View style={{...CardStyle.imageContainer, width: widthContainer}}>
                        <Image source={{uri: image?.uri}} style={{...CardStyle.image, borderColor: borderColor, }}/>
                    </View>}

                    {labels.length>0 &&
                    <ScrollView nestedScrollEnabled style={{...CardStyle.textContainer, width: widthContainer, borderColor: borderColor}}>
                        {labels}   
                    </ScrollView>}
                    
                </View >

                 <View style={CardStyle.buttonsContainer}>
                    {buttons}
                </View>

            </View>   
        </View>
    );
}

const ImageSize = isSmallScreen(550)? 140: 200;

const CardStyle = StyleSheet.create({

    Card:{
        width: "100%",
        display: "flex",
        flexFlow: "colum nowrap",
        alignItems: "center",
        padding:10,
    },

    titleContainer:{
        width: '100%',
        alignItems:'center',
    },

    title:{
        fontSize:30,
        padding:5,
        paddingBottom:10,
    },

    container:{
        width: "90%",
        display: 'flex',
        flexFlow: "row wrap",
        padding: 15,
        borderWidth: 2,  
        borderRadius: 25,
    },

    image:{
        borderRadius: ImageSize,
        width: ImageSize,
        height: ImageSize,
        borderBottomWidth: ImageSize/50,
        borderRightWidth: ImageSize/50,
    },

    imageContainer:{
        alignItems:'center',
        padding: 10,
    },

    buttonsContainer:{
        padding: 5,
        ...CustomStyle.row,
        justifyContent:"space-around"
    },

    textContainer:{
        display: 'flex',
        alignContent: 'center',
        height: ImageSize,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },

    labelContainer:{
        width: '100%',
        display: 'flex',
        alignContent: 'flex-start',
        padding: 3,
        paddingBottom: 5,
    },
   
});

export default Card;
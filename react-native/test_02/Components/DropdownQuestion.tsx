
import React, { Component, RefObject, useState } from "react";
import { Dimensions, Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import Answer from "../modules/Answer";
import Question, { TypeAnswers } from "../modules/Question";
import DragAndDrop from "./.newFolder/CustomComponents/CustomElements/DragAndDrop";
import DropArea from "./.newFolder/CustomComponents/CustomElements/DropArea";
import Draggable from "./.newFolder/CustomComponents/CustomElements/Draggable";

import { Selected } from "./StartTest";

interface DropdownQuestionProps {
    item: Question;
    options: {
        selectedAnswers: Selected[];
        onSelectAnswer: (item: Answer, itemId: number)=>void;
    }
}

interface DropdownQuestionState {
}

class DropdownQuestion extends Component<DropdownQuestionProps, DropdownQuestionState> {
    
    
    

    

    render() {

        const {item, options} = this.props
        
        const pictures = item.answers.map(ans =>  { return {id: ans.id, uri: ans.picture}});
        const texts = item.answers.map(ans =>  { return {id: ans.id, text: ans.text}});

    
    return (
        <View style={styles.container} >
            <Text style={styles.question}>{item.text}</Text>
            <DragAndDrop>
            <View  style={styles.row}>
                {item.answers.map((ans, id) => {
                const index = Math.round(Math.random()*(texts.length-1));
                const text = texts.splice(index, 1)[0];
                return (
                    <DropArea key={id} id={id.toString()} title={text.text} />
                );})} 
            </View>
            <View style={styles.row}  >
                {item.answers.map(ans => {
                    const index  = Math.round(Math.random()*(pictures.length-1));
                    const picture = pictures.splice(index, 1)[0];
                return (
                    <Draggable key={ans.id}  dropAreasIDs={item.answers.map((a, id) => id.toString())}
                        item={picture} itemRender={picture => <Image source={{uri: picture.uri, width:100, height:100}} />}/>
                );})}
            </View>
            </DragAndDrop>
        </View>
     );
    }
}
 
const styles = StyleSheet.create({
    container: {
        display:'flex',
        flexDirection: 'column',
        gap: 10,
        alignContent: 'center',
        margin: 5,
        padding: 15,
        borderWidth: 2,  
        borderRadius: 25,
        width: "90%",
        borderColor:"#E0E0E0",
    },
    question: {
        fontSize: 40,
        alignSelf: "center",
        borderBottomWidth: 2,  
        borderBottomColor: "#E0E0E0",
    },
    row: {
        padding:5,
        display: 'flex',
        flexDirection:"row",
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
   
});

export default DropdownQuestion;


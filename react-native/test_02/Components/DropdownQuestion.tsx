
import React, { Component, RefObject, useState } from "react";
import { Dimensions, Image, LayoutChangeEvent, StyleSheet, Text, View } from "react-native";
import Answer from "../modules/Answer";
import Question, { TypeAnswers } from "../modules/Question";

import Draggable, { DropAreaProps } from "./Draggable";
import { Selected } from "./StartTest";

interface DropdownQuestionProps {
    item: Question;
    options: {
        selectedAnswers: Selected[];
        onSelectAnswer: (item: Answer, itemId: number)=>void;
    }
}

interface DropdownQuestionState {
    dropAreasPositions: DropAreaProps[];
    dropAreaRefs: React.Ref<View>[]
}

class DropdownQuestion extends Component<DropdownQuestionProps, DropdownQuestionState> {
    
    
    
    constructor(props: DropdownQuestionProps){
        super(props);
        const refs: React.Ref<View>[] =[];
        for (let i = 0; i < this.props.item.answers.length; i++) {
            refs.push(React.createRef<View>());
        }
        this.state ={
            dropAreasPositions: [],
            dropAreaRefs: refs 
        }
    }
    
    

    handleDropAreasLayout = (id: number, index: number) => () =>{
        if(this.state.dropAreaRefs[id]===null) return;

        const ref = this.state.dropAreaRefs[id] as unknown as RefObject<View>;
        (ref).current?.measure((fx, fy, width, height, px, py) => 
        this.setState({dropAreasPositions: 
            this.state.dropAreasPositions.concat({id: index,
                        position:{px: px ,
                        py: py ,
                        width: width,
                        height: height}})
        }));
        
    }
    handleOnFinish  =() =>{

    }

    render() {

        const {item, options} = this.props
        
        const pictures = item.answers.map(ans =>  { return {id: ans.id, uri: ans.picture}});
        const texts = item.answers.map(ans =>  { return {id: ans.id, text: ans.text}});

    
    return (
        <View style={styles.container} >
            <Text style={styles.question}>{item.text}</Text>
            <View  style={styles.row}>
                {item.answers.map((ans, id) => {
                const index = Math.round(Math.random()*(texts.length-1));
                const text = texts.splice(index, 1)[0];
                return (
                    <View ref={this.state.dropAreaRefs[id]} key={ans.id} onLayout={this.handleDropAreasLayout(id, text.id)} style={styles.dropArea}>
                        <Text>{text.text}</Text>
                    </View>
                );})} 
            </View>
            <View style={styles.row}  >
                {item.answers.map(ans => {
                    const index  = Math.round(Math.random()*(pictures.length-1));
                    const picture = pictures.splice(index, 1)[0];
                return (
                    <Draggable key={ans.id} dropAreas={this.state.dropAreasPositions}  onFinish={(id: number)=> {return}}
                        itemView={<Image source={{uri: picture.uri, width:100, height:100}} />}/>
                );})}
            </View>
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
    dropArea: {
        flexDirection: 'column',
        flexWrap: 'nowrap',
        borderWidth: 3,  
        borderColor: "#E0E0E1",
        height: 150,
        width: 150,
        padding: 10,
        alignItems: 'center',
        alignContent: 'center',
    },
});

export default DropdownQuestion;


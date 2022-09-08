
import React, { Component, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import Answer from "../modules/Answer";
import Question from "../modules/Question";
import Card from "./.newFolder/CustomComponents/CustomCard";

import Ionicons from '@expo/vector-icons/Ionicons';
import { Selected } from "./StartTest";
import DropdownQuestion from "./DropdownQuestion";

interface TestQuestionCardProps {
    item: Question;
    options: {
        selectedAnswers: Selected[];
        onSelectAnswer: (item: Answer, itemId: number)=>void;
    }
}

class TestQuestionCard extends Component<TestQuestionCardProps, {}> {

    render() {      
        const {item, options} = this.props;
        const {selectedAnswers, onSelectAnswer} = options;

        const SelectedAnsw = selectedAnswers.filter(q => q.id === item.id)[0]?.answers || [];
        return ( <>
          {item.type as unknown as string === "DragAndDrop"? 
              <DropdownQuestion {...this.props} />:

            <Card len='r1' image={{uri: item.picture}} title={"Question"}>
                <Text>{item.text}</Text>
                <Text>Answers:</Text>
                {item.answers?.map((answer, index) =>{
                    return <MyCheckbox  checked={SelectedAnsw.some(ans => ans.id=== answer.id)} onChange={onSelectAnswer} itemId={item.id!} key={index} answer={answer} />
                })}
              
            </Card>
            } 
        </>);

    }
}
interface MyCheckboxProps{
    itemId: number;
    checked: boolean
    onChange: (ans: Answer, itemId: number)=> void;
    answer: Answer;
}

function MyCheckbox({ checked, onChange, answer, itemId }: MyCheckboxProps) {

    function onCheckmarkPress() {
      onChange(answer, itemId);
    }
  
    return (<View style={{flexDirection: "row"}}>
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onCheckmarkPress}>
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </Pressable>
      <Text> {answer.text}</Text>
      <Image source={{uri: answer.picture, width:30, height:30}} />
    </View>);
  }

  const styles = StyleSheet.create({
    checkboxBase: {
      width: 24,
      height: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
      borderWidth: 2,
      borderColor: 'coral',
      backgroundColor: 'transparent',
    },
  
    checkboxChecked: {
      backgroundColor: 'coral',
    },
  
    appContainer: {
      flex: 1,
      alignItems: 'center',
    },
  
    appTitle: {
      marginVertical: 16,
      fontWeight: 'bold',
      fontSize: 24,
    },
  
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    checkboxLabel: {
      marginLeft: 8,
      fontWeight: 500,
      fontSize: 18,
    },
  });

 
export default TestQuestionCard;

import React, { Component, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Answer from "../modules/Answer";
import Question from "../modules/Question";
import Card from "./.newFolder/CustomComponents/CustomCard";

import Ionicons from '@expo/vector-icons/Ionicons';
import { Selected } from "./StartTest";

interface TestQuestionCardProps {
    item: Question;
    options: {
        selectedAnswers: Selected[];
    }
}

class TestReadyQuestionCard extends Component<TestQuestionCardProps, {}> {

    render() {
        const {item, options} = this.props;
        const {selectedAnswers} = options;

        const SelectedAnsw = selectedAnswers.filter(q => q.id === item.id)[0]?.answers || [];
        
        
        return (
            <Card len='r1' image={{uri: item.picture}} title={"Question"}>
              <Text>Points: {item.points}</Text>
                <Text>{item.text}</Text>

                <Text>Correct Answers:</Text>
                {item.answers?.map((answer, index) =>{
                    if(answer.scorePr>0){
                      return <Text>{answer.text}</Text>
                    }
                })}
                <Text>Your Answers:</Text>
                {SelectedAnsw?.map((answer, index) =>{
                    if(answer.scorePr>0){
                      return <Text>{answer.text}</Text>
                    }
                })}
                
            </Card>
        );

    }
}
interface MyCheckboxProps{
    itemId: number;
    checked: boolean
    onChange: (ans: Answer, itemId: number)=> void;
    answer: Answer;
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

 
export default TestReadyQuestionCard;
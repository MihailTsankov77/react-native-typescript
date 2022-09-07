
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
              <Text>Points: {item.points* SelectedAnsw.reduce((prev, newV)=> prev+newV.scorePr, 0)/100}/{item.points}</Text>
              
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

export default TestReadyQuestionCard;
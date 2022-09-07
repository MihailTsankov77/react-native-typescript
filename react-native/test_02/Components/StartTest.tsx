import React, { Component, ComponentType } from 'react';
import Answer from '../modules/Answer';
import Question, { TypeAnswers } from '../modules/Question';
import List from "./.newFolder/CustomComponents/CustomCardList";
import TestQuestionCard from './TestQuestionCard';

import Btn from "./.newFolder/CustomComponents/CustomButton";
import TestReadyQuestionCard from './TestReadyQuestionCard';
import { Text } from 'react-native';

interface StartTestProps {
  questions: Question[];
}

export type Selected = {
  id: number;
  answers: Answer[];
}

interface StartTestState {
  selected: Selected[];
  score: number | undefined;
}

export default class StartTest extends Component<StartTestProps, StartTestState> {

  state: Readonly<StartTestState> ={
    selected: [],
    score: undefined,
  }

  handleSelected = (answer: Answer, questionId: number) => {
    
    const existing = this.state.selected.filter(sel => sel.id === questionId);
    if(existing.length===1){

      const quest = this.props.questions.filter(q => q.id === questionId)[0];

      if( TypeAnswers[quest.type] === TypeAnswers.MultipleChoise){

        const index = existing[0].answers.indexOf(answer);
        if(index === -1){
          existing[0].answers.push(answer);
        }else{
          existing[0].answers.splice(index,1);
        }
        this.setState({selected: this.state.selected.map(sel => sel.id === existing[0].id? existing[0]: sel)});
      }else{
        const index = existing[0].answers.indexOf(answer);
        if(index === -1){
          existing[0].answers = [answer];
        }
        this.setState({selected: this.state.selected.map(sel => sel.id === existing[0].id? existing[0]: sel)});
      }



    }else{
      this.setState({selected: this.state.selected.concat({id: questionId, answers: [answer]})});
    }
  }
  handleSubmit = () =>{
    let score = 0;
    this.props.questions.map(q=> score+= q.points)
    this.state.selected.map(sel =>{
      sel.answers.map(ans => score+=ans.scorePr);
    });

    this.setState({score: score});
  }

  render() {
    return (<>
    {!this.state.score?
      <List items={this.props.questions} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected }} Card={TestQuestionCard  as unknown as ComponentType<Question>} />
      :
      <>
        <Text>{this.state.score}</Text>
        <List items={this.props.questions} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected }} Card={TestReadyQuestionCard  as unknown as ComponentType<Question>} />
      </>
      }
      
      <Btn event={() => this.handleSubmit()} value="Complete Test"/>
    </>)
  }
}

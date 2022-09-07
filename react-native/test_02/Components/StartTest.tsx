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

      if( TypeAnswers[quest.type] as unknown as TypeAnswers === TypeAnswers.MultipleChoise){

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
    const {selected} = this.state;
    const {questions} = this.props;
    let score = 0;
    questions.map(q=> score += q.points* selected.filter(sel => sel.id === q.id)[0].answers.reduce((prev, newV)=> prev+newV.scorePr, 0)/100)

    this.setState({score: score});
  }

  render() {
    return (<>
    {!this.state.score?
      <>
        <List items={this.props.questions} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected }} Card={TestQuestionCard  as unknown as ComponentType<Question>} />
        <Btn event={() => this.handleSubmit()} value="Complete Test"/>
      </>
      :
      <>
        <Text style={{padding:5, fontSize:30, alignSelf:'center'}}> Your Score: {this.state.score}/{this.props.questions.reduce((prev, next)=> prev + next.points, 0)}</Text>
        <List items={this.props.questions} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected}} Card={TestReadyQuestionCard  as unknown as ComponentType<Question>} />
      </>
      }
    </>)
  }
}

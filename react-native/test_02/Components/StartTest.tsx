import React, { Component, ComponentType } from 'react';
import Answer from '../modules/Answer';
import Question, { TypeAnswers } from '../modules/Question';
import List from "./.newFolder/CustomComponents/CustomCardList";
import TestQuestionCard from './TestQuestionCard';

import Btn from "./.newFolder/CustomComponents/CustomButton";
import TestReadyQuestionCard from './TestReadyQuestionCard';
import { Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QuestionCard from './QuestionCard';

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
  key: string;
}

export default class StartTest extends Component<StartTestProps, StartTestState> {

  state: Readonly<StartTestState> ={
    key: '@Test1',
    selected: [],
    score: undefined,
  }

  storeData = async (value: Selected[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(this.state.key, jsonValue);
    }catch (e) {
      console.log(e);
    }
  }

  setData = async (data: Selected[]) =>{
    await this.storeData(data);
    this.setState({selected: data});
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem(this.state.key);
      return value;
    } catch(e) {
      console.log(e); 
    }
  }

  async componentDidMount(){
    const data = await this.getData();
    if(data){
      this.setState({selected: JSON.parse(data)})
    }
      
  }

  handleSelected = (answer: Answer, questionId: number) => {
    const existing = this.state.selected.filter(sel => sel.id === questionId);
    if(existing.length===1){

      const quest = this.props.questions.filter(q => q.id === questionId)[0];

      if( TypeAnswers[quest.type] as unknown as TypeAnswers === TypeAnswers.MultipleChoise){

        let index = -1;
        existing[0].answers.forEach((el, ind)=>{
          if(el.id === answer.id){
            return index = ind;
          }
        })
        if(index === -1){
          existing[0].answers.push(answer);
        }else{
          existing[0].answers.splice(index,1);
        }
        this.setData(this.state.selected.map(sel => sel.id === existing[0].id? existing[0]: sel));
      }else{
        existing[0].answers = [answer];
        this.setData(this.state.selected.map(sel => sel.id === existing[0].id? existing[0]: sel));
      }
    }else{
      this.setData(this.state.selected.concat({id: questionId, answers: [answer]}));
    }
  }
  handleSubmit = () =>{
    const {selected} = this.state;
    const {questions} = this.props;
    let score = 0;
    questions.map(q=> score += q.points* selected.filter(sel => sel.id === q.id)[0].answers.reduce((prev, newV)=> prev+newV.scorePr, 0)/100)
    AsyncStorage.removeItem(this.state.key);
    this.setState({score: score});
  }

  render() {
    return (<>
    {!this.state.score?
      <>
        <List items={this.props.questions.sort((a, b)=> a.position! - b.position!)} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected }} Card={TestQuestionCard  as unknown as ComponentType<Question>} />
        <Btn event={() => this.handleSubmit()} value="Complete Test"/>
      </>
      :
      <>
        <Text style={{padding:5, fontSize:30, alignSelf:'center'}}> Your Score: {this.state.score}/{this.props.questions.reduce((prev, next)=> prev + next.points, 0)}</Text>
        <List items={this.props.questions.sort((a, b)=> a.position! - b.position!)} options={{selectedAnswers: this.state.selected, onSelectAnswer: this.handleSelected}} Card={TestReadyQuestionCard  as unknown as ComponentType<Question>} />
      </>
      }
    </>)
  }
}

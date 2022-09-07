import React, { Component, ComponentType } from 'react';
import Question from '../modules/Question';
import AddQuestionsForm from './AddQuestionsForm';
import List from "./.newFolder/CustomComponents/CustomCardList";
import QuestionCard from './QuestionCard';

interface AddQuestionViewProps {
    onCreate: (question: Question) =>void;
    edited: Question | undefined;
    onDelete:(item: Question)=>void;
    onEdit: (item: Question)=>void;
    questions: Question[];
    onPositionMove: (item: Question)=>void;
}
interface AddQuestionViewState {
    questions: Question[];
}

export default class AddQuestionView extends Component<AddQuestionViewProps, AddQuestionViewState> {

    state: Readonly<AddQuestionViewState> ={
        questions: [],
    }
    componentDidUpdate(prevProps: Readonly<AddQuestionViewProps>): void {
        if(this.props === prevProps) return;

        this.setState({questions: this.sortQuestions()})
    }
    
    sortQuestions = () =>{
        const {questions, onPositionMove} = this.props;
        
        const sortedQuestions: Question[] = [];

        for (let i = 0; i < questions.length; i++) {
            const quest = questions[i];

            if(quest.position === undefined){
                quest.position = sortedQuestions.length;
                onPositionMove(quest);
            } 
            if(sortedQuestions.length === 0){
                sortedQuestions.push(quest);
                continue;
            }

            if(quest.position > sortedQuestions[sortedQuestions.length-1].position){
                sortedQuestions.push(quest);
                continue;
            }else if(quest.position < sortedQuestions[sortedQuestions.length-1].position){
                let index = sortedQuestions.length-1
                for (; quest.position < sortedQuestions[index].position; index--){}
                sortedQuestions.splice(index+1, 0, quest);
            }
        }

        return sortedQuestions;
    }

    handleMoveUp = (quest: Question) =>{
        
        quest.position!--;
        const {questions} = this.state;
        let old: Question;
        this.setState({questions: questions.map(q => {
            if(quest.position! === q.position){
                q.position++;
                old = q;
                this.props.onPositionMove(q);
                return quest;
            }
            if(quest.position!+1 === q.position){
                return old;
            }
            return q;
        })});
    }
    handleMoveDown = (quest: Question) =>{
        quest.position!++;
        const {questions} = this.state;
        let old: Question;
        this.setState({questions: questions.map(q => {
            if(quest.position! === q.position){
                q.position--;
                old = q;
                this.props.onPositionMove(q);
                return quest;
            }
            if(quest.position!-1 === q.position){
                return old;
            }
            return q;
        })});
    }

  render() {
    return (<>
        <AddQuestionsForm onCreate={this.props.onCreate} edited={this.props.edited}/>
        <List<Question> onDelete={this.props.onDelete} options={{onUp: this.handleMoveUp, onDown: this.handleMoveDown}} onEdit={this.props.onEdit} items={this.props.questions} Card={QuestionCard as unknown as ComponentType<Question>} />
    </>);
  }
}

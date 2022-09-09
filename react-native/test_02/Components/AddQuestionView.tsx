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
    componentDidMount(): void {
      this.setState({questions: this.sortQuestions()});
    }
    componentDidUpdate(prevProps: Readonly<AddQuestionViewProps>): void {
        if(this.props === prevProps) return;

        this.setState({questions: this.sortQuestions()})
    }
    
    sortQuestions = () =>{
        const {questions, onPositionMove} = this.props;
        const existingQuestions: Question[] = questions.filter(quest => quest.position!==undefined);
        const undefQuestions = questions.filter(quest => quest.position==undefined);

        const sortedQuestions = existingQuestions.sort((a, b)=> a.position! - b.position!) 
        
        undefQuestions.forEach(ques =>{
            ques.position = sortedQuestions[sortedQuestions.length-1].position!+1;
            onPositionMove(ques);
            sortedQuestions.push(ques);
        });
        return sortedQuestions;
    }

   
    handleMove = (item: Question, isUp: boolean) =>{

        const id = this.state.questions.indexOf(item);
        const nextId = !isUp? id+1 : id-1;
        const updQuestions = this.state.questions;

        item.position! += isUp? -1 : +1 ;
        this.props.onPositionMove(item);

        const Other = updQuestions[nextId];
        Other.position! += !isUp? -1 : +1 ;
        this.props.onPositionMove(Other);

        [updQuestions[id], updQuestions[nextId]] = [updQuestions[nextId], updQuestions[id]];
        this.setState({questions: updQuestions})
        
    }

  render() {
    return (<>
        <AddQuestionsForm onCreate={this.props.onCreate} edited={this.props.edited}/>
        <List<Question> onDelete={this.props.onDelete} options={{onMove: this.handleMove}} onEdit={this.props.onEdit} items={this.state.questions} Card={QuestionCard as unknown as ComponentType<Question>} />
    </>);
  }
}

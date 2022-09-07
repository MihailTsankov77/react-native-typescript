import React, { Component, ComponentType } from "react";
import { ScrollView } from "react-native";
import AddMovieForm from "./Components/AddQuestionsForm";
import List from "./Components/.newFolder/CustomComponents/CustomCardList";
import Navbar from "./Components/.newFolder/CustomComponents/CustomNavbar";
import Btn from "./Components/.newFolder/CustomComponents/CustomButton";
import WatchedCard from "./Components/QuestionCard";
import AddQuestionsForm from "./Components/AddQuestionsForm";
import { QuestionRepo } from "./dao/repository";
import Question from "./modules/Question";
import AddQuestionView from "./Components/AddQuestionView";
import StartTest from "./Components/StartTest";

enum Views {
  HomePage,
  StartTest,
}

interface AppState{
  
  views: Views;
  isScrolled: boolean;
  questions: Question[];
  edited: Question | undefined;
  
}

class App extends Component<{},AppState> {

  state: Readonly<AppState> ={
  
    views: Views.HomePage,
    isScrolled: false,
    
    questions: [],
    edited: undefined,
  }
 

async componentDidMount() {
  const allQuestions = await QuestionRepo.findAll();
  this.setState({questions: allQuestions});
}

  


  handleCreateQuestions = async (question: Question) =>{
    if(!this.state.edited){
      const created = await QuestionRepo.create(question);
      this.setState(({questions}) => ({questions: questions.concat(created)}));
    }else{
       this.handleUpdate(question);
    }
  }

  handleUpdate = async (question: Question) =>{
    const updated = await QuestionRepo.update(question);
    this.setState(({questions}) => ({questions: questions.map((qu) => qu.id === updated.id? updated: qu)}));
    this.setState({edited: undefined}); 
  }

  handleDeleteQuestion = async (question: Question) =>{
      await QuestionRepo.delete(question.id!);
      this.setState(({questions}) => ({questions: questions.filter((qu) => qu.id!== question.id)}));
    
  }
  
  handleEditQuestion =  (question: Question)=>{
    this.setState({edited: question});
  }
  

//   handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {   
//     if(event.nativeEvent.contentOffset.y >= 200){
//       this.setState({isScrolled: true});
//     }
//     if(event.nativeEvent.contentOffset.y <= 50){
//       this.setState({isScrolled: false});
//     } 
// }
 
  handleSwitchView(){
   
    switch(this.state.views){
      case Views.HomePage:
        return <AddQuestionView onCreate={this.handleCreateQuestions} onDelete={this.handleDeleteQuestion} onEdit={this.handleEditQuestion} onPositionMove={this.handleUpdate} edited={this.state.edited} questions={this.state.questions}/>
      case Views.StartTest:
        return <StartTest questions={this.state.questions}/>
      
    }
  }
  
  render(): React.ReactNode {
    return (
      <>
      <Navbar title="Mudele Test" >
          <Btn value="Create Questions" event={() => this.setState({views: Views.HomePage})} bgColor='gray'/>
          <Btn value="Start Test" event={() => this.setState({views: Views.StartTest})} bgColor='gray'/>
          
      </Navbar>
      <ScrollView  style={{height: 0}}>

      {this.handleSwitchView()}
      </ScrollView>
      </>
    );
  }
}

export default App;
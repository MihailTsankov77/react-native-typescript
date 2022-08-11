
import { Component } from 'react';
import './App.css';
import { Comments } from './comment';
import CommentsList from './CommentList';
import MOCK_COMMENTS from './comments-mock';

interface CommentAppState{
  comments: Comments[];

}

export interface CommentListener{
  (com: Comments): void;
}

class App extends Component<{},CommentAppState> {

  state: Readonly<CommentAppState> ={
    comments: MOCK_COMMENTS,
  }

  handleOnExtend = (com: Comments) => {
    this.setState(({comments}) => ({comments: comments.map(comment => comment.id === com.id? com: comment)}))
  }

  render(): React.ReactNode {
    return (
      <div className="App">
          <header className="App-header">
            <h2>Comments Demo</h2>
            {/* <TodoInput onCreateTodo={this.handleCreateTodo} ></TodoInput> */}
            {/* <TodoFilter filter={this.state.filter} onFilterChange={this.handleFilterChange} /> */}
            <CommentsList comments={this.state.comments} onExtend={this.handleOnExtend}/>
            {/*  filter={this.state.filter}
            onDelete = {this.handleDeleteTodo}
            onUpdate = {this.handleStatusChange}
            onCancel = {this.handleStatusChange} */}
            
          </header>
        </div>
    );
  }
}

export default App;

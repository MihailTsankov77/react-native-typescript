
import { Component } from 'react';
// import './App.css';
import RigistartionForm, { validatorsType } from './registartionForm';
import { UsersRepo } from './repository';
import UsersInfo from './ShowUserInfo';
import { User } from "./user";
import { Validators } from './validators';

export interface UserListener{
  (user: User): void;
}


interface AppState{
  users: User[];
  edited: User | undefined
}

class App extends Component<{},AppState> {

  state: Readonly<AppState> ={
    users: [],
    edited: undefined
  }
  validators:validatorsType =  {
    firstName: [Validators.required(), Validators.len(2, 15)],
        lastName: [Validators.required(), Validators.len(2, 15)],
        username: [Validators.required(), Validators.len(5, 15), Validators.uniqueUsername()],
        password: [Validators.required(), Validators.len(8), Validators.isPass()],
        gender: [Validators.required()],
        imageUrl: [Validators.required(), Validators.pattern(new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+,.[^,s]{2,})"))],
        description: [Validators.len(0, 512)],
  }

async componentDidMount() {
  const allUsers = await UsersRepo.findAll();
  this.setState({
    users: allUsers
  });
}

  handleCreateUser = async (user: User) =>{
    if(this.state.edited){
      const updated = await UsersRepo.update(user);

      this.setState(({users}) => ({users: users.map((user) => user.id === updated.id? updated: user), edited: undefined}));
      
    }else{
      const createdUser = await UsersRepo.create(user);

      this.setState(({users}) => ({users: users.concat(createdUser)}));
    }
   
  }

  handleDeleteUser = async (user: User) =>{
    await UsersRepo.delete(user.id!);

    this.setState(({users}) => ({users: users.filter((elem) => elem.id!== user.id)}));
      
  }
  
  handleEdit = (user: User)=>{
    this.setState({edited: user});
  }



  render(): React.ReactNode {

    return (
      <div className="App">
        <header className="App-header">
          
            <RigistartionForm onCreateUser={this.handleCreateUser} validators={this.validators} edited={this.state.edited} key={this.state.edited?.id} />
            <UsersInfo users={this.state.users} onDelete={this.handleDeleteUser} onEdit={this.handleEdit} />
          
        </header>
      </div>
    );
  }
}

export default App;

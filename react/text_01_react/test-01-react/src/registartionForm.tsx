import { Component } from "react";
import { UserListener } from "./App";
import { AppStateGeneric, AppStateStoreRegistation } from "./state-store";
import { User } from "./user";
// import './registartionForm.css'
import { Validator, Validators } from "./validators";

interface RigistartionFormProps {
    onCreateUser: UserListener;
    validators: validatorsType;
    edited: User | undefined;
}
export type validatorsType ={
    [P in keyof userFormState]: Validator[];
}

type userFormState = {
    firstName: string,
    lastName: string,
    username: string,
    password: string,
    gender: string,
    imageUrl: string,
    description: string
}



interface RigistartionFormState{
    userField: userFormState;
    errors: Partial<userFormState>;
    OnButton:boolean;
}


 class RigistartionForm extends Component<RigistartionFormProps, RigistartionFormState> {
    state: Readonly<RigistartionFormState> = {
        userField:{
            firstName: this.props.edited?.firstName || ' ',
            lastName: this.props.edited?.lastName || ' ',
            username: this.props.edited?.username || ' ',
            password: this.props.edited?.password || ' ',
            gender: this.props.edited?.gender || ' ',
            imageUrl: this.props.edited?.imageUrl || ' ',
            description: this.props.edited?.description || ' ' 
        },
        errors:{
            firstName: ' ',
            lastName: ' ',
            username: ' ',
            password: ' ',
            gender: ' ',
            imageUrl: ' ',
            description: ' -' 
        },
        OnButton:false
       
    }
    handleTextChanged = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const fieldName = event.target.name as keyof userFormState;
        
        this.setState( ({userField}: RigistartionFormState) => ({userField: {...userField, [fieldName]: event.target.value } }));
        
        for(const key in this.state.errors){
            const fieldName = key as keyof typeof this.state.errors;
            this.validateField(this.state.userField[fieldName]!, fieldName , this.props.validators[fieldName]);
        }
    }    



    handleTodoSubmit =(event: React.FormEvent) =>{
        event.preventDefault();
        this.props.onCreateUser(new User(
            this.props.edited?.id || undefined,
            this.state.userField.firstName!,
            this.state.userField.lastName!,
            this.state.userField.username!,
            this.state.userField.password!,
            this.state.userField.gender!,
            this.state.userField.imageUrl!,
            this.state.userField.description!,
            new Date().toISOString(),
            new Date().toISOString()));
      }

      validateField = (value: string, field: keyof userFormState, validators: Validator[])=>{
        const err: string[] = [];
        validators.forEach(validator=>{
            const valid = validator(value, field);
            if (typeof valid === "string" ) {
                err.push(valid);
            }
         });
        
         this.setState(({errors}: RigistartionFormState) => ({
            errors: {...errors, [field]: err.join(", ")} 
        }));
        
        this.activateButton();
      }
      activateButton = () =>{
        let on = true;
        for(const field in this.state.errors ){

            const error = this.state.errors[field as keyof typeof this.state.errors];
            
            if(error?.length!==0){
                on=false;
                break;
            }
        }
        this.setState({OnButton: on});
        
      }

    render() {
    return ( <div className="form-container">
    <h1 className="header center orange-text">Registration</h1>
    <form onSubmit={this.handleTodoSubmit} id="registration-form" className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="firstName" name="firstName" type="text" className="validate" value={this.state.userField.firstName }
            onChange={this.handleTextChanged} />
            {this.state.errors.firstName && (<span>{this.state.errors.firstName}</span>)}
                        <label htmlFor="firstName" className={this.props.edited? "active" : ""}>First name</label>
                    </div>
                    <div className="input-field col s6">
                        <label htmlFor="lastName" className={this.props.edited? "active" : ""}>Last name</label>
                        <input id="lastName" name="lastName" type="text" className="validate" value={this.state.userField.lastName}
            onChange={this.handleTextChanged}/>
             {this.state.errors.lastName && (<span>{this.state.errors.lastName}</span>)}           
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input id="username" name="username" type="text" className="validate" value={this.state.userField.username}
            onChange={this.handleTextChanged}/>
            {this.state.errors.username && (<span>{this.state.errors.username}</span>)}
                        <label htmlFor="username" className={this.props.edited? "active" : ""}>Username</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="password" name="password" type="text" className="validate" value={this.state.userField.password}
            onChange={this.handleTextChanged}/>
            {this.state.errors.password && (<span>{this.state.errors.password}</span>)}
                        <label htmlFor="password" className={this.props.edited? "active" : ""}>Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="gender" name="gender" type="text" className="validate" value={this.state.userField.gender}
            onChange={this.handleTextChanged}/>
            {this.state.errors.gender && (<span>{this.state.errors.gender}</span>)}
                        <label htmlFor="gender" className={this.props.edited? "active" : ""}>Gender</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s12">
                        <input id="imageUrl" name="imageUrl" type="url" className="validate" value={this.state.userField.imageUrl}
            onChange={this.handleTextChanged}/>
            {this.state.errors.imageUrl && (<span>{this.state.errors.imageUrl}</span>)}
                        <label htmlFor="imageUrl" className={this.props.edited? "active" : ""}>Image URL</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="description" name="description" className="materialize-textarea" value={this.state.userField.description} onChange={this.handleTextChanged}></textarea>
                        <label htmlFor="description" className={this.props.edited? "active" : ""}>Description</label>
                    </div>
                </div>
                 {this.state.OnButton?
                    <button className="btn waves-effect waves-light" type="submit" name="submit" id="submit" >Submit</button>:
                    <button className="btn waves-effect waves-light" type="submit" name="submit" id="submit" disabled>Submit</button>
                }
                
                   
                
                
            </form>
            </div>
            );
    }
}

export default RigistartionForm;
import { User } from "./user.js";
import { ValidationConfig, ValidationConfigLogIn, Validators } from "./validators.js";

export interface userInfo{
  id: number | undefined;
  username: string;
  password:string;
}


export enum FieldState {
    PRISTINE,
    DIRTY,
    VALID,
    INVALID
  }
  //TODO withaout status...,  'registrationTimestamp', 'lastModificationTimestamp', 'status', 'userRole'
  type FieldStateTouchType<P>= {
    [F in keyof P as Exclude<F, "id"> ]: FieldState.PRISTINE | FieldState.DIRTY;
  }
  
  type FieldStateValidationType<P> = {
    [F in keyof P as Exclude<F, "id">]: FieldState.VALID | FieldState.INVALID;
  }

  type FieldStateTouchTypeLogin= {
    'username': FieldState.PRISTINE | FieldState.DIRTY;
    'password': FieldState.PRISTINE | FieldState.DIRTY;
  }
  
  type FieldStateValidationLogin = {
    'username': FieldState.VALID | FieldState.INVALID;
    'password': FieldState.VALID | FieldState.INVALID;
  }
  
  export interface AppState {
    
    postFormValidationConfig: ValidationConfig<User>;
    loginFormValidationConfig: ValidationConfigLogIn;
    fieldStateTouch: FieldStateTouchType<User>;
    fieldStateValidation: FieldStateValidationType<User>;
    fieldStateTouchLogin: FieldStateTouchTypeLogin;
    fieldStateValidationLogin: FieldStateValidationLogin;
    users: userInfo[];
  }
  
  export const AppStateStore: AppState = {
    
    users: [],

    postFormValidationConfig: {
      firstName: [Validators.required(), Validators.len(2, 15)],
        lastName: [Validators.required(), Validators.len(2, 15)],
        username: [Validators.required(), Validators.len(5, 15), Validators.uniqueUsername()],
        password: [Validators.required(), Validators.len(8), Validators.isPass()],
        gender: [Validators.required()],
        imageUrl: [Validators.required(), Validators.pattern(new RegExp("(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+,.[^,s]{2,})"))],
        description: [Validators.len(0, 512)],
        registrationTimestamp: [],
        lastModificationTimestamp: [],
        status : [],
        userRole: []
    },
    
    fieldStateTouch: {
        firstName: FieldState.PRISTINE,
        lastName: FieldState.PRISTINE,
        username: FieldState.PRISTINE,
        password: FieldState.PRISTINE,
        gender: FieldState.PRISTINE,
        imageUrl: FieldState.PRISTINE,
        description: FieldState.PRISTINE,
        registrationTimestamp: FieldState.PRISTINE,
        lastModificationTimestamp: FieldState.PRISTINE,
        status : FieldState.PRISTINE,
        userRole: FieldState.PRISTINE
    },
  
    fieldStateValidation: {
      
        firstName: FieldState.INVALID,
        lastName: FieldState.INVALID,
        username: FieldState.INVALID,
        password: FieldState.INVALID,
        gender: FieldState.INVALID,
        imageUrl: FieldState.INVALID,
        description: FieldState.INVALID,
        registrationTimestamp: FieldState.VALID,
        lastModificationTimestamp: FieldState.VALID,
        status : FieldState.VALID,
        userRole: FieldState.VALID
    },

    fieldStateValidationLogin: {
        username: FieldState.INVALID,
        password: FieldState.INVALID
    },
    fieldStateTouchLogin:{
        username: FieldState.PRISTINE,
        password: FieldState.PRISTINE
    },
    
    loginFormValidationConfig: {
        
        username: [Validators.existingUsername()],
        password: [Validators.legitPass()],
          
    },



  };
  
import { User } from "./user.js";
import { ValidationConfig, ValidationConfigTypeGeneric, Validators } from "./validators.js";

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
  
  export type generalKeyType<P> = P extends User? FieldStateKeyType<P> : loginKeyType;

  export type loginKeyType={
    'username': never;
    'password': never;
  }
  export type FieldStateKeyType<P>={
    [F in keyof P]: never;
  }


  export type  FieldStateTouchTypeGeneric<P> = FieldStateTouchType<generalKeyType<P>>;
  export type  FieldStateValidationTypeGeneric<P> =FieldStateValidationType<generalKeyType<P>>;
  
  type FieldStateTouchType<P>= {
    [F in keyof P]: FieldState.PRISTINE | FieldState.DIRTY;
  }
  
  type FieldStateValidationType<P> = {
    [F in keyof P]: FieldState.VALID | FieldState.INVALID;
  }

  
  export interface AppStateGeneric<P>{
    formValidationConfig: ValidationConfigTypeGeneric<P>;
    fieldStateTouch: FieldStateTouchTypeGeneric<P>;
    fieldStateValidation: FieldStateValidationTypeGeneric<P>;

  }

  export const UsersInfo: userInfo[] =[];
  
  export const AppStateStoreRegistation: AppStateGeneric<User> = {

    formValidationConfig: {
        id:[],
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
      id: FieldState.PRISTINE,
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
        id: FieldState.VALID,
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
    }

  };

  export const AppStateStoreLogin: AppStateGeneric<userInfo> = {
    
    formValidationConfig: {
      username: [Validators.existingUsername()],
      password: [Validators.legitPass()],
    },

    fieldStateTouch:{
        username: FieldState.PRISTINE,
        password: FieldState.PRISTINE
    },

    fieldStateValidation: {
      username: FieldState.INVALID,
      password: FieldState.INVALID
  }
  
  };
  
//TODO make class to handel forms and extends it



import { LoginInterface } from "./LoginInterface.js";
import { UsersRepo } from "./repository.js";
import { AppStateStore, FieldState, userInfo } from "./state-store.js";
import { User } from "./user.js";
import {ValidationResultLogin, Validator } from "./validators.js";


export class LoginController{
    
    loginForm: HTMLFormElement;
    errorsDiv: HTMLElement;
  
    constructor(loginForm: HTMLFormElement) {
      this.loginForm = loginForm;
      this.errorsDiv = document.getElementById("errors") as HTMLElement;
    }

    async init() {
        this.loginForm.addEventListener("submit", this.handleSubmitPost.bind(this));
        
        this.loginForm.addEventListener("change", this.validateForm, true);
        this.loginForm.addEventListener("keyup", this.stateChangeToDirty);

        try{
            const users: User[] | undefined = await UsersRepo.findAll();
            if (users) {
                for(let i=0; i<users.length; i++){
                    const user:userInfo = {
                        id: users[i].id,
                        username: users[i].username,
                        password: users[i].password
                    }
                    AppStateStore.users.push(user);
                    
                }  

            }
        } catch (err) {
            this.showError(err);
        }

        
      }



      showError(err: unknown) {
        this.errorsDiv.innerHTML = `<div>${err}</div>`;
      }

      async handleSubmitPost(event: SubmitEvent) {
        try {
          event.preventDefault();
    
          const user = this.getPostFormSnapshot();
          
          let id: number | undefined = 0;
          for(let i=0; i<AppStateStore.users.length; i++){
            if (AppStateStore.users[i].username === user.username) { 
                id = AppStateStore.users[i].id;
                break;
            }
        }  
        const loginInterface = new LoginInterface(id);
          loginInterface.init()
          this.loginForm.remove();
          
    
        } catch (err) {
          this.showError(err);
        }
      }
    
      getPostFormSnapshot(): User {
        const formData = new FormData(this.loginForm);
        const nU: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          nU[key] = value.toString();
        });
        return new User(undefined, nU.firstName, nU.lastName, nU.username, nU.password, nU.gender, nU.imageUrl, nU.description, new Date(), new Date);
      }

      
  validateForm = (event: Event) => {
    event.preventDefault();
    this.resetErrors();

    const validationResult: ValidationResultLogin ={
        username: [""],
        password:[""]
    };
    const config = AppStateStore.loginFormValidationConfig;
    const formSnapshot = this.getPostFormSnapshot() as User;
    let field: "username" | "password";

    for (field in config) {
        
          const validators = config[field];

          if (validators !== undefined) {
            const errArr: string[] = [];

            if (Array.isArray(validators)) {
              validators.forEach((validator) => {
                if (validator !== undefined) {
                  this.checkErrorInField(validator, formSnapshot[field]!.toString(), field, errArr);
                }
              });
            } else {

              this.checkErrorInField(validators, formSnapshot[field]!.toString(), field, errArr);
            }

            validationResult[field] = errArr;
          }
        
      
    }

    this.showValidationErrors(validationResult);

    this.disOrAnableSubmitButton();
  };

  disOrAnableSubmitButton(){
    const submitBtn = this.loginForm.querySelector(`#submit`) as HTMLElement;
    const config = AppStateStore.loginFormValidationConfig;
    
    let field: "username" | "password";
    for (field in config) {
        if(AppStateStore.fieldStateValidationLogin[field]===FieldState.VALID){

          submitBtn.removeAttribute('disabled');
        }else{
          submitBtn.setAttribute('disabled', '');
          return;
        }
        
      
    }
  }


  checkErrorInField(validator: Validator, value: string, field: keyof User, errArr: string[]) {
    const valid = validator(value, field);
    if (typeof valid === "string" ) {
      errArr.push(valid);
    }
  }

  showValidationErrors(validationResult: ValidationResultLogin) {
    let field: "username" | "password";

    for (field in validationResult) {
        if (AppStateStore.fieldStateTouchLogin[field] !== FieldState.PRISTINE) {
          const errorsString: string[] = [];
          const filedErrors = validationResult[field];

          if (filedErrors !== undefined) {
            const input = document.getElementById(field);
            input?.classList.remove("valid");
            input?.classList.add("invalid");
            const div = input?.parentElement;

            for (const err of filedErrors) {
              errorsString.push(`${err}<br>`);
            }

            const errorsMsg = document.createElement("div");
            errorsMsg.innerHTML = `<span class="helper-text red-text" data-error="wrong" data-success="right">${errorsString.join(" ")}</span>`;
            div?.insertAdjacentElement("beforeend", errorsMsg);
          }

          AppStateStore.fieldStateValidationLogin[field] = (filedErrors?.length===0)? FieldState.VALID: FieldState.INVALID;

        }
      
    }
  }

  resetErrors() {
    const formData = new FormData(this.loginForm);

    formData.forEach((value, key) => {
      const input = document.getElementById(key.toString());
      
      input?.classList.remove("invalid");
      const div = input?.parentElement;
      const errMsg = div?.lastChild as HTMLElement;

      if (errMsg.tagName === "DIV") div?.removeChild(errMsg);
    });
  }

  stateChangeToDirty = (event: Event) => {
    event.preventDefault();
    const input = event.target as HTMLElement;
    const field = input.id as "username" | "password";
    
      AppStateStore.fieldStateTouchLogin[field] = FieldState.DIRTY;
    
  };



}
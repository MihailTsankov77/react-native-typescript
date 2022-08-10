import { LoginInterface } from "./LoginInterface.js";
import { UsersRepo } from "./repository.js";
import { AppStateGeneric, FieldState, userInfo, UsersInfo } from "./state-store.js";
import { User } from "./user.js";
import { ValidationResultTypeGeneric, Validator } from "./validators.js";






export class GenericController<P >{

    errorsDiv: HTMLElement;
  
    constructor(public form: HTMLFormElement, public AppStore: AppStateGeneric<P>, public addUser = false) {
  
      this.errorsDiv = document.getElementById("errors") as HTMLElement;
    }

    async init() {
        this.form.addEventListener("submit", this.handleSubmitPost.bind(this));
        
        this.form.addEventListener("change", this.validateForm, true);
        this.form.addEventListener("keyup", this.stateChangeToDirty);

        try{
            const users: User[] | undefined = await UsersRepo.findAll();
            if (users) {
                for(let i=0; i<users.length; i++){
                    const user:userInfo = {
                        id: users[i].id,
                        username: users[i].username,
                        password: users[i].password
                    }
                    UsersInfo.push(user);
                    
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
        if(this.addUser){
          UsersRepo.create(user);
        }
          let id: number | undefined = 0;
          for(let i=0; i<UsersInfo.length; i++){
            if (UsersInfo[i].username === user.username) { 
                id = UsersInfo[i].id;
                break;
            }
        }  
        const loginInterface = new LoginInterface(id);
          loginInterface.init()
          this.form.remove();
    
        } catch (err) {
          this.showError(err);
        }
      }
    
      getPostFormSnapshot(): User {
        const formData = new FormData(this.form);
        const nU: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          nU[key] = value.toString();
        });
        return new User(undefined, nU.firstName, nU.lastName, nU.username, nU.password, nU.gender, nU.imageUrl, nU.description, new Date(), new Date);
      }

      
  validateForm = (event: Event) => {
    event.preventDefault();
    this.resetErrors();

    let validationResult: ValidationResultTypeGeneric<P> = {}

    const config = this.AppStore.formValidationConfig;
    const formSnapshot = this.getPostFormSnapshot() as User;
    let field: keyof ValidationResultTypeGeneric<P>;

    for (field in config) {
        if(field!="id" ){
            if(this.addUser || field==="username" || field==="password"){
          const validators = config[field];

          if (validators !== undefined) {
            const errArr: string[] = [];

            if (Array.isArray(validators)) {
              validators.forEach((validator) => {
                if (validator !== undefined) {
                    console.log(validator);
                    
                  this.checkErrorInField(validator, formSnapshot[field as unknown as keyof User]!.toString(), field as unknown as keyof User, errArr);
                }
              });
            } else {

              this.checkErrorInField(validators, formSnapshot[field as unknown as keyof User]!.toString(), field as unknown as keyof User, errArr);
            }

            validationResult[field] = errArr;
          }
        }
        }
      
    }

    this.showValidationErrors(validationResult);

    this.disOrAnableSubmitButton();
  };

  disOrAnableSubmitButton(){
    const submitBtn = this.form.querySelector(`#submit`) as HTMLElement;
    const config = this.AppStore.formValidationConfig;
    
    let field: keyof ValidationResultTypeGeneric<P>;
    for (field in config) {
        console.log(field)
        if(this.AppStore.fieldStateValidation[field]===FieldState.VALID){

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

  showValidationErrors(validationResult: ValidationResultTypeGeneric<P>) {
   
    let field: keyof ValidationResultTypeGeneric<P>;

    for (field in validationResult) {
        if (this.AppStore.fieldStateTouch[field] !== FieldState.PRISTINE) {
          const errorsString: string[] = [];
          const filedErrors = validationResult[field];

          if (filedErrors !== undefined) {
            const input = document.getElementById(field);
            input?.classList.remove("valid");
            input?.classList.add("invalid");
            const div = input?.parentElement;

            for (const err of filedErrors!) {
              errorsString.push(`${err}<br>`);
            }

            const errorsMsg = document.createElement("div");
            errorsMsg.innerHTML = `<span class="helper-text red-text" data-error="wrong" data-success="right">${errorsString.join(" ")}</span>`;
            div?.insertAdjacentElement("beforeend", errorsMsg);
          }

          this.AppStore.fieldStateValidation[field] = (filedErrors?.length===0)? FieldState.VALID: FieldState.INVALID;

        }
      
    }
  }

  resetErrors() {
    const formData = new FormData(this.form);

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
    
      this.AppStore.fieldStateTouch[field] = FieldState.DIRTY;
    
  };

}
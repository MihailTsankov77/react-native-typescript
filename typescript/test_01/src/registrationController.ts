import { LoginInterface } from "./LoginInterface.js";
import { UsersRepo } from "./repository.js";
import { AppStateStore, FieldState, userInfo } from "./state-store.js";
import { User } from "./user.js";
import { ValidationConfig, ValidationResult, Validator } from "./validators.js";

export class RegistrationController{
    
    registationForm: HTMLFormElement;
    errorsDiv: HTMLElement;
  
    constructor(registationForm: HTMLFormElement) {
      
      this.registationForm = registationForm;
      this.errorsDiv = document.getElementById("errors") as HTMLElement;
    

    }

    async init(user?: User) {
        this.registationForm.addEventListener("submit", this.handleSubmitPost.bind(this));
        
        this.registationForm.addEventListener("change", this.validateForm, true);
        this.registationForm.addEventListener("keyup", this.stateChangeToDirty);

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

        if(user)
          this.fillPostForm(user);
        

        // try {
        //   const allPosts = await BlogsAPI.getAllPosts();
        //   AppStateStore.allPosts = allPosts;
        //   this.showPosts(allPosts);
        // } catch (err) {
        //   this.showError(err);
        // }
        
      }
//TODO
    //   initFormState(formElement: HTMLFormElement) {
    //     const formData = new FormData(formElement);
    //     const np: FormFieldDict<FormFieldState> = {};
    //     formData.forEach((value, key) => {
    //       np[key] = new FormFieldState(ValidStatus.INVALID, ChangedStatus.PRISTINE);
    //     })
    //   }

      showError(err: unknown) {
        this.errorsDiv.innerHTML = `<div>${err}</div>`;
      }

      async handleSubmitPost(event: SubmitEvent) {
        try {
          event.preventDefault();
    
          const user = this.getPostFormSnapshot();
          console.log(user);
            
          UsersRepo.create(user)
          let id: number | undefined = 0;
          for(let i=0; i<AppStateStore.users.length; i++){
            if (AppStateStore.users[i].username === user.username) { 
                id = AppStateStore.users[i].id;
                break;
            }
        }  
        const loginInterface = new LoginInterface(id);
          loginInterface.init()
          this.registationForm.remove();
    
        } catch (err) {
          this.showError(err);
        }
      }
    
      getPostFormSnapshot(): User {
        const formData = new FormData(this.registationForm);
        const nU: { [key: string]: string } = {};
        formData.forEach((value, key) => {
          nU[key] = value.toString();
        });
        return new User(undefined, nU.firstName, nU.lastName, nU.username, nU.password, nU.gender, nU.imageUrl, nU.description, new Date(), new Date);
      }

      
  validateForm = (event: Event) => {
    event.preventDefault();
    this.resetErrors();

    const validationResult: ValidationResult<User> = {};
    const config = AppStateStore.postFormValidationConfig;
    const formSnapshot = this.getPostFormSnapshot() as User;
    let field: keyof ValidationConfig<User>;

    for (field in config) {
      if (field !== "id") {
        
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
    }

    this.showValidationErrors(validationResult);

    this.disOrAnableSubmitButton();
  };

  disOrAnableSubmitButton(){
    const submitBtn = this.registationForm.querySelector(`#submit`) as HTMLElement;
    const config = AppStateStore.postFormValidationConfig;
    let field: keyof ValidationConfig<User>;

    for (field in config) {
      if (field !== "id") {
        if(AppStateStore.fieldStateValidation[field]===FieldState.VALID){

          submitBtn.removeAttribute('disabled');
        }else{
          submitBtn.setAttribute('disabled', '');
          return;
        }
        
      }
    }
  }


  checkErrorInField(validator: Validator, value: string, field: keyof User, errArr: string[]) {
    const valid = validator(value, field);
    if (typeof valid === "string" ) {
      errArr.push(valid);
    }
  }

  showValidationErrors(validationResult: ValidationResult<User>) {
    let field: keyof ValidationResult<User>;
    for (field in validationResult) {
      if(field!=="id"){
        if (AppStateStore.fieldStateTouch[field] !== FieldState.PRISTINE) {
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

          AppStateStore.fieldStateValidation[field] = (filedErrors?.length===0)? FieldState.VALID: FieldState.INVALID;

        }
      }
    }
  }

  resetErrors() {
    const formData = new FormData(this.registationForm);

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
    const field = input.id as keyof User;
    if (field !== "id") {
      AppStateStore.fieldStateTouch[field] = FieldState.DIRTY;
    }
  };
  
//todo
  fillPostForm(user: User) {
    for (const key in User) {
      (this.registationForm.querySelector(`#${key}`) as HTMLFormElement).value =
        user[key as keyof User];
      const label = this.registationForm.querySelector(
        `label[for=${key}]`
      ) as HTMLElement;
      if (label) {
        label.className = "active";
      }
    }
  }


}
import { GenericController } from "./genericFormController.js";
import { AppStateGeneric, AppStateStoreLogin, AppStateStoreRegistation, userInfo } from "./state-store.js";
import { User } from "./user.js";

export class switchView{
    static registationFormParent = document.getElementById("formContainer") as HTMLElement;
    static mainSection = document.getElementById("main") as HTMLElement;

    public static setRegistartionView(){
        this.mainSection.innerHTML="";
        this.registationFormParent.innerHTML=`
        <h1 class="header center orange-text">Registration</h1>
        <form id="registration-form" class="col s12">
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="firstName" name="firstName" type="text" class="validate">
                            <label for="firstName">First name</label>
                        </div>
                        <div class="input-field col s6">
                            <label for="lastName">Last name</label>
                            <input id="lastName" name="lastName" type="text" class="validate">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s6">
                            <input id="username" name="username" type="text" class="validate">
                            <label for="username">Username</label>
                        </div>
                        <div class="input-field col s6">
                            <input id="password" name="password" type="text" class="validate">
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <!-- TODO Dropdown -->
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="gender" name="gender" type="text" class="validate">
                            <label for="gender">Gender</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="imageUrl" name="imageUrl" type="url" class="validate">
                            <label for="imageUrl">Image URL</label>
                        </div>
                    </div>

                    <div class="row">
                        <div class="input-field col s12">
                            <textarea id="description" name="description" class="materialize-textarea"></textarea>
                            <label for="description">Description</label>
                        </div>
                    </div>

                    <button class="btn waves-effect waves-light" type="submit" name="submit" id="submit" disabled>Submit
                        <i class="material-icons right">send</i>
                    </button>
                    
                </form>
        `
        const registationForm = document.getElementById("registration-form") as HTMLFormElement;
        const RegistController = new GenericController<User>(registationForm, AppStateStoreRegistation, true);
        RegistController.init();
    }

    public static setLoginView(){
        this.registationFormParent.innerHTML=`
        <h1 class="header center orange-text">Log In</h1>
        <form id="logInForm">
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="username" name="username" type="text" class="validate">
                            <label for="username">Username</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="input-field col s12">
                            <input id="password" name="password" type="text" class="validate">
                            <label for="password">Password</label>
                        </div>
                    </div>
                    <button class="btn waves-effect waves-light" type="submit" name="submit" id="submit" disabled>Log In
                        <i class="material-icons right">send</i>
                    </button>
                </form>
        `
        const logInForm = document.getElementById("logInForm") as HTMLFormElement;
        const loginController = new GenericController<userInfo>(logInForm, AppStateStoreLogin);
        loginController.init();
    }

    static{
        switchView.setRegistartionView();

        const logBtn = document.getElementById("logInOut") as HTMLElement;

        logBtn.addEventListener("click", ()=>{
            if(logBtn.innerHTML !=="Log out"){
                
                logBtn.innerHTML="Log out";
                switchView.setLoginView();
        
        
            }else{
        
               switchView.setRegistartionView();
        
                logBtn.innerHTML="Log in"
        
                }
            
        });
    }

}
new switchView();

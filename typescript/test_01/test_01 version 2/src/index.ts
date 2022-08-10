import { GenericController } from "./genericFormController.js";
import { AppStateGeneric, AppStateStoreLogin, AppStateStoreRegistation, userInfo } from "./state-store.js";
import { User } from "./user.js";

let registationForm = document.getElementById("registration-form") as HTMLFormElement;
export const registationFormParent = registationForm.parentElement as HTMLElement;

const mainSection = document.getElementById("main") as HTMLElement;


const RegistController = new GenericController<User>(registationForm, AppStateStoreRegistation, true);
RegistController.init();



const logBtn = document.getElementById("logInOut") as HTMLElement;

logBtn.addEventListener("click", ()=>{
    if(logBtn.innerHTML !=="Log out"){
        registationForm.remove();
        logBtn.innerHTML="Log out";
        registationFormParent.innerHTML=`
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


    }else{

        mainSection.innerHTML="";

        logBtn.innerHTML="Log in"
        registationFormParent.innerHTML=`
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
        registationForm = document.getElementById("registration-form") as HTMLFormElement;
        const RegistController = new GenericController<User>(registationForm, AppStateStoreRegistation, true);
        RegistController.init();
    }
    
})
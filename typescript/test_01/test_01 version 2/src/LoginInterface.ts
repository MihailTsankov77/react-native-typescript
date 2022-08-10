import { GenericController } from "./genericFormController.js";
import { registationFormParent } from "./index.js";
import { UsersRepo } from "./repository.js";
import { AppStateStoreRegistation } from "./state-store.js";
import { User, UserRole } from "./user.js";

export class LoginInterface{
    mainSection: HTMLElement;
    user?: User;
  constructor(public id:number| undefined) {
    this.mainSection = document.getElementById("main") as HTMLElement;
   

  }

  async init(){
    
    if(this.id){
        this.user = await UsersRepo.findById(this.id);
        this.showMassege();
    }
     
  }
  showMassege(){
    const elem = document.createElement("div");
    elem.setAttribute("id", this.id!.toString());
    elem.className = "col s12 m6 l4";

    
    elem.innerHTML=`
    <div class="card">
   
    <div class="card-content">
      <span class="card-title activator grey-text text-darken-4">Hello ${this.user?.firstName}
      <i class="material-icons right">more_vert</i></span>
      <p>Username: ${this.user?.username} <br> Role: ${UserRole[ this.user!.userRole]
    }</p>
    </div>
    <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">
    <i class="material-icons right">close</i></span>
      <p>${this.user?.description}</p>
    </div>
    <div class="card-action">
      <button class="btn waves-effect waves-light" type="button" id="edit${this.id
    }">Edit
        <i class="material-icons right">send</i>
      </button>
     
    </div>
    </div>
    `
    elem
      .querySelector(`#edit${this.id}`)
      ?.addEventListener("click", () => this.handleEditPost());

      this.mainSection.insertAdjacentElement("beforeend", elem);
  }

  handleEditPost() {
    

const mainSection = document.getElementById("main") as HTMLElement;

    mainSection.innerHTML="";
        
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
    let registationForm = document.getElementById("registration-form") as HTMLFormElement;
    registationForm = document.getElementById("registration-form") as HTMLFormElement;
    const RegistController = new GenericController<User>(registationForm, AppStateStoreRegistation, true);
    RegistController.init();
  }

  
}
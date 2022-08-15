import { GenericController } from "./genericFormController.js";
import { switchView } from "./index.js";
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
    switchView.setRegistartionView();
    
  }

  
}
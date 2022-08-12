import { UserListener } from "./App";
import { User } from "./user";

interface UserCardProps {
    user: User;
    onDelete:UserListener;
}
 
function UserCard({user, onDelete}: UserCardProps) {
  function handleDeleteButton(event: React.MouseEvent){
    onDelete(user)
  }
  
    return ( <article className="col s12 m6 l4">
        <div className="card">
      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={user.imageUrl} alt="userImg"/>
      </div>
      <div className="card-content">
        <span className="card-title activator grey-text text-darken-4">{user.username 
      }<i className="material-icons right">more_vert</i></span>
        <p>{user.firstName} {user.lastName}</p>
      </div>
      <div className="card-reveal">
        <span className="card-title grey-text text-darken-4">{user.username
      }<i className="material-icons right">close</i></span>
        <p>{user.description}</p>
      </div>
      <div className="card-action">
        <button className="btn waves-effect waves-light" type="button" id="edit{user.id
      }">Edit
          <i className="material-icons right">send</i>
        </button>
        <button className="btn waves-effect waves-light red lighten-1" type="button" onClick={handleDeleteButton} id="delete{user.id
      }">Delete
          <i className="material-icons right">clear</i>
        </button>
      </div>
      </div>
    </article> );
}
 
export default UserCard;
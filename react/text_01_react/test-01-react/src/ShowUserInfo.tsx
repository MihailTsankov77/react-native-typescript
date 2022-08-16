import { Component, ComponentType } from "react";
import { UserListener } from "./App";
import { User, UserRole } from "./user";
import UserCard from "./UserCard";
// import './ShowUserInfo.css'
interface UserInfoProps<T> {
    users: User[];
    Comp: ComponentType<T>;
    onDelete: UserListener;
    onEdit: UserListener;
}



 function UsersInfo<T> ({users,  Comp, ...rest}:UserInfoProps<T>) {
    
    
   
    return (<section  className="user-container row">
        {
            users.length?
            users.map(user =>(<Comp key={user.id} user={user} {...(rest as unknown as T)} />)):
            ""
        }
    </section>
    );
    
    
}

export default UsersInfo;
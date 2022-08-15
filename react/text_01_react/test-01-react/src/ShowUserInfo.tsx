import { Component } from "react";
import { UserListener } from "./App";
import { User, UserRole } from "./user";
import UserCard from "./UserCard";
// import './ShowUserInfo.css'
interface UserInfoProps {
    users: User[];
    onDelete: UserListener;
    onEdit: UserListener;
}



 function UsersInfo ({users, ...rest}:UserInfoProps) {
    

   
    return (<section  className="user-container row">
        {
            users.length?
            users.map(user =>(<UserCard key={user.id} user={user} {...rest} />)):
            ""
        }
    </section>
    );
    
    
}

export default UsersInfo;
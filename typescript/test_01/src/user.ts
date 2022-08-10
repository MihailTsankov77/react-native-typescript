import { UsersRepo } from "./repository.js";
import { AppStateStore } from "./state-store.js";

export enum UserRole{
    USER, 
    ADMIN
}
export enum userStatus{
    ACTIVE, 
    SUSPENDED, 
    DEACTIVATED
}



export class User{

    constructor(
        public id: number | undefined,
        public firstName: string,
        public lastName: string,
        public username: string,
        public password: string,
        public gender: string,
        public imageUrl: string,
        public description: string,
        public registrationTimestamp: Date,
        public lastModificationTimestamp: Date,
        public status = userStatus.ACTIVE,
        public userRole =UserRole.USER
    ){}

    public static isUsernameunique(username: string){

        for(let i=0; i<AppStateStore.users.length; i++){
            if (AppStateStore.users[i].username === username) { 
                return false;
            }
        }  

        return true;
    }

    public static isPassLegit(password: string){

        for(let i=0; i<AppStateStore.users.length; i++){
            if (AppStateStore.users[i].password === password) { 
                return true;
            }
        }  

        return false;
    }
}

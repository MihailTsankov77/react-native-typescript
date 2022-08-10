import { generalKeyType } from "./state-store.js";
import { User } from "./user.js";

export type ValidationConfig<T> = {
    [P in keyof T]?: Validator | Validator[]
}

export type ValidationResult<P> = {
    [F in keyof P]?: string[]
}


export type  ValidationConfigTypeGeneric<P> = ValidationConfig<generalKeyType<P>> ;
export type  ValidationResultTypeGeneric<P> = ValidationResult<generalKeyType<P>> ;


export type Validator = (value: string, field: string) => Promise<string | false> | string | boolean;

export type ValidatorFactory = (...args: any) => Validator

export class Validators {
    static required: ValidatorFactory = () => (value: string, field: string) => {
        if(value.trim().length === 0) {
            return `The field '${field}' is required`;
        }
        return false;
    }
    static pattern: ValidatorFactory = (validationPattern: RegExp) => (value: string, field: string) => {
        if(!validationPattern.test(value)) {
            return `The field '${field}' does not match pattern`;
        }
        return false;
    }
    static len: ValidatorFactory = (min: number, max?: number) => (value: string, field: string) => {
        if(value.length < min) {
            return `The field '${field}' should be at least ${min} characters long`;
        } else if(max){
            if (value.length > max) {
                return `The field '${field}' should be no more tan ${max} characters long`;
            }
        }
        return false;
    }

    static isPass: ValidatorFactory = () => (value: string, field: string) => {
       const hasNumber = new RegExp("[0-9]");
       let hasSpecial = new RegExp("[@$!%*#?&]");
       let hasLetter = new RegExp("[a-zA-Z]");
    if(!hasNumber.test(value)) {
        return `The field '${field}' should have number`;
    }
    if(!hasSpecial.test(value)) {
        return `The field '${field}' should have spacial`;
    }
    if(!hasLetter.test(value)) {
        return `The field '${field}' should have letter`;
    }
        
       
        return false;
    }

    static uniqueUsername: ValidatorFactory = () => (value: string, field: string) => {
        const isTaken = !User.isUsernameunique(value);
        
        if(isTaken){
            return `That ${field} is already taken`;
        }
        return false;
    }

    static existingUsername: ValidatorFactory = () => (value: string, field: string) => {
        const isTaken = User.isUsernameunique(value);
        
        if(isTaken){
            return `Not existing username`;
        }
        return false;
    }

    static legitPass: ValidatorFactory = () => (value: string, field: string) => {
        const isLegit = !User.isPassLegit(value);
        
        if(isLegit){
            return `Wrong Password`;
        }
        return false;
    }

    

}


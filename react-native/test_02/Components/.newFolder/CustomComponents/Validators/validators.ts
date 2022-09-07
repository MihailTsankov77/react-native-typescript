

export type ValidationConfig<T> = {
    [P in keyof T]?: Validator | Validator[]
}

export type ValidationConfigLogIn = {
    'username': Validator | Validator[]
    'password': Validator | Validator[]
}

export type ValidationResult<T> = {
    [P in keyof T]?: string[]
}

export type ValidationResultLogin = {
    'username': string[],
    'password': string[]
}


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
    static isNumber: ValidatorFactory = () => (value: string, field: string) => {
        const hasNumber = new RegExp("^[0-9]");
        if(!hasNumber.test(value)) {
            return `The field '${field}' should have only numbers`;
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

  



    

}
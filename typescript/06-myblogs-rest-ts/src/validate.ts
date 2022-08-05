import { Post } from "./posts";

export type ValidationConfig<T> = {
    [P in keyof T]?: Validator[]
}

export type ValidationResult<T> = {
    [P in keyof T]?: string[]
}


export type Validator = (value: string, field: string) => string | boolean;

export type ValidatorFactory = (...args: any) => Validator

export class Validators {
    static required: ValidatorFactory = () => (value: string, field: string) => {
        if(value.trim().length === 0) {
            return `The field '${field}' is required`
        }
        return false;
    }
    static pattern: ValidatorFactory = (validationPattern: RegExp) => (value: string, field: string) => {
        if(!validationPattern.test(value)) {
            return `The field '${field}' does not match pattern '${validationPattern}'`
        }
        return false;
    }
    static len: ValidatorFactory = (min: number, max: number) => (value: string, field: string) => {
        if(value.length < min) {
            return `The field '${field}' should be at least ${min} characters long`
        } else if (value.length > max) {
            return `The field '${field}' should be no more tan ${max} characters long`
        }
        return false;
    }
}


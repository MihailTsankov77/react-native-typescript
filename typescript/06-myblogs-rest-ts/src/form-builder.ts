import { FieldState } from "./state-store.js";
import { Validator } from "./validate";

export type FormCompopnents<Entety> = {
    [Prop in keyof Entety]?: FormCompopnent<Prop>;
}

interface genericFormComponent<State>{
    id: string;
    value: State;
    change: FieldState.PRISTINE | FieldState.DIRTY;
    valid: FieldState.VALID | FieldState.INVALID;
    readonly initialValue? : State;
    validators?: Validator | Validator[]
    reset(): void;
    validate(): string[]; //errors empty [] if not errors
    render(): string;
}

interface FormTextComponentType extends genericFormComponent<string>{
    multiline:boolean;
}

type FormCheckboxComponentType = genericFormComponent<boolean>;

interface FormNumberComponentType extends genericFormComponent<number>{
    min:number;
    max: number;
}

interface FormUrlComponentType extends genericFormComponent<string>{
    allowRelative:boolean;
    allowInsecure: boolean;
}

type FormCompopnent<Property> = 
    Property extends string? FormTextComponentType | FormUrlComponentType:
    Property extends number? FormNumberComponentType:
    Property extends boolean? FormCheckboxComponentType: never;


export class FormTextComponent implements FormTextComponentType{
    
    constructor(
        public id: string,
        public value: string,
        public initialValue = "",
        public multiline: boolean,
        public validators?: Validator | Validator[],
        public valid = 3,
        public change = 0
    ){}
    


    reset(): void {
        throw new Error("Method not implemented.");
    }
    validate(): string[] {
        if(this.validators===undefined) return [];
        const errors: string[] = [];
        if(Array.isArray(this.validators)){
            for(const validator of this.validators){
                const valid = validator(this.value, this.id);
                if(valid==="string"){
                    errors.push(valid);
                }
            }
        }else{
            const valid = this.validators(this.value, this.id);
                if(valid==="string"){
                    errors.push(valid);
                }
        }
        return errors;
    }
    render(): string {
        const validationErrors =this.validate();
        return `
        <div class="input-field col s6">
            ${this.multiline? 
            `<input id="${this.id}" name="${this.id}" type="text" class="validate ${validationErrors.length!==0? "invalid": "valid"}">`:
            `<textarea id="${this.id}" name="${this.id}" class="materialize-textarea"></textarea>`
            }
            <label for="${this.id}">Blog Title</label>
            <span class="helper-text red-text" data-error="${validationErrors.join(", ")}" data-success="right"></span>
        </div>
        `
        
    }
    
}

import React, {Component, ReactNode} from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "react-native";
import { Validator } from "./Validators/validators";

import Btn from "./CustomButton";
import {validatorsType } from "./shared/shared-interfaces";
import { Colorable, hasTitle, InputField, onChangeInterface} from "./shared/shared-interfaces";
import { CustomStyle } from "./shared/shared-styles";

interface btnProps extends Colorable{
    value: string;
}

interface btnsStyleType{
    submit: btnProps;
    reset?: btnProps;
    cancel?: btnProps;
}

interface FormProps<FormFields> extends Colorable, hasTitle{
    children: ReactNode[]
    formState: FormFields;
    handleStateChange: (state: FormFields) => void;
    handleSubmitForm: ()=> void;
    btnsStyle?: btnsStyleType;
    validators: validatorsType<FormFields>;
}

interface addedProps extends InputField, onChangeInterface{};

type FormErrors<FormFields> ={
    [K in keyof FormFields]?: string[];
}
type FormPrestine<FormFields> ={
    [K in keyof FormFields]?: boolean;
}

//make contaiener that is spilt

export default class Form<FormFields> extends Component<FormProps<FormFields>, {}>{
    
    private activateButton = false;
    private errors = Object.keys(this.props.validators).reduce((prevState: FormErrors<FormFields>, field: string) => {
                        return {
                            ...prevState,
                            [field]: []
                    };}, {} as FormErrors<FormFields>);
    private prestine = Object.keys(this.props.validators).reduce((prevState: FormPrestine<FormFields>, field: string) => {
                        return {
                            ...prevState,
                            [field]: !this.props.formState[field as keyof FormFields],
                    };}, {} as FormPrestine<FormFields>);

    handleTextChanged = (target: string) => {
        return (text: string) => {
            const updatedFormState: FormFields = {
                ...this.props.formState,
                [target]: text,
            }
            this.prestine[target as keyof FormFields] = false;
            this.props.handleStateChange(updatedFormState);
        }
    }

    handleFormReset = () => {
        this.errors = Object.keys(this.props.validators).reduce((prevState: FormErrors<FormFields>, field: string) => {
            return {
                ...prevState,
                [field]: []
        };}, {} as FormErrors<FormFields>);
        
        this.prestine = Object.keys(this.props.validators).reduce((prevState: FormPrestine<FormFields>, field: string) => {
            return {
                ...prevState,
                [field]: true,
        };}, {} as FormPrestine<FormFields>);

        const updatedFormState: FormFields = 
            Object.keys(this.props.formState as object).reduce((prevState: FormFields, field: string) => {
                return {
                    ...prevState,
                    [field]: "",
                };
            },{} as FormFields);
        this.props.handleStateChange(updatedFormState);
    }

    handleButtonActivation = () =>{
        let activate: boolean = true;
        if(activate)
            Object.values(this.errors).forEach(field =>{
                const arr = field as Array<string>
                if(arr.length>0) return activate = false;
            });
        this.activateButton = activate;
    }

    validateForm = () => {
        this.errors = Object.keys(this.errors).reduce((prev: FormErrors<FormFields>,field: string) => {
            const validators = this.props.validators[field as keyof validatorsType<FormFields>];
            return {
                ...prev,
                [field]: this.validateField( validators || [], field as keyof FormErrors<FormFields> & string)
            }
        }, {} as FormErrors<FormFields>);
    }

    validateField = (validators: Validator[], field: keyof FormFields & string) => {
        const errors: string[] = validators.map( validator => {
            validator = validator as Validator;
            const error = validator(this.props.formState[field] as unknown as string, field);   
            return (error)? error as string : "";
        });
        return  errors.filter(error => error!=="");
    }

    generateChildrenWithProps = () => React.Children.map(this.props.children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const {target} = child.props;
        if (Object.keys(this.props.formState  as object).indexOf(target) < -1) 
            throw `Wrong target set '${target}' to  the ${index} child`;

        const key = target as keyof FormFields;
        let valueElement = (this.props.formState[key]!==undefined)? (this.props.formState[key] as unknown as string) 
                            : `Wrong target set '${target}' to  the ${index} child`;

        const fieldErrors: string = this.errors[key]?.join(", ") || "";
        const prestineField = this.prestine[key];

        const props: addedProps = {
            onChange: child.props.onChange!==undefined? child.props.onChange : this.handleTextChanged(target), 
            value: child.props.value!==undefined? child.props.value : valueElement, 
            error: fieldErrors,
            target: target,
            prestine: prestineField,
        }
        return React.cloneElement(child, props);
    });

    render(){
        this.validateForm();
        this.handleButtonActivation();

        const {title= "Form", bgColor = "white", borderColor="#E0E0E0", color="black", 
            btnsStyle = {submit: { value: "Submit"}, reset: { value: "Reset"}, cancel: { value: "Cansel"}}} = this.props;
        
        return (
            <View style={{...formStyle.form, backgroundColor: bgColor}}>
                <Text style={{...formStyle.title, color: color}}>{title}</Text>

                <View style={{...formStyle.container, borderColor: borderColor}} >
                    <View style={CustomStyle.rowInput}>
                        {this.generateChildrenWithProps()}
                    </View>

                    <View style={CustomStyle.row}>
                        <Btn {...btnsStyle.submit} 
                            event={() => {
                                this.props.handleSubmitForm();
                                this.handleFormReset();}}
                            disable={!this.activateButton}/>
                        <Btn bgColor='red' {...btnsStyle.reset}  event={this.handleFormReset}/>
                    </View>
                </View>
            </View>
        );
    }
}

const formStyle = StyleSheet.create({

    form:{
        display: "flex",
        flexFlow: "colum nowrap",
        alignItems: "center",
        width: '100%',
        padding:10,   
    },

    title:{
        fontSize:30,
        padding:5,
        paddingBottom:10,
    },

    container:{
        width: "90%",
        padding: 15,
        borderWidth: 2,  
        borderTopWidth:0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,  
    },
});
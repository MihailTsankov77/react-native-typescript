import { Component } from "react";
import Form from "./.newFolder/CustomComponents/CustomForm";
import Input from "./.newFolder/CustomComponents/CustomFormInput";
import ImagePicker from "./.newFolder/CustomComponents/CustomImagePicker";
import DatePicker from "./.newFolder/CustomComponents/CustomDatePicker";
import { validatorsType } from "./.newFolder/CustomComponents/shared/shared-interfaces";
import { Validators } from "./.newFolder/CustomComponents/Validators/validators";
import Image from "../modules/Gallery-image";
import { View } from "react-native";
import Btn from "./.newFolder/CustomComponents/CustomButton";

interface AddImagesFormProps {
    onCreate: (image: Image) =>void;
    edited: Image | undefined;
}

interface Fields{
    title: string;
    url: string;
    tags: string;
    description: string;
    date: string;
    author: string;

    addedFields: string[];
}
 

interface AddImagesFormState {
    formFields: Fields;
}

const validators: validatorsType<Fields> = {
    title: [Validators.required(), Validators.len(2, 40)],
    description: [Validators.len(-1, 256)],
    url: [Validators.required()]
}
 
class AddImagesForm extends Component<AddImagesFormProps, AddImagesFormState> {
    state: Readonly<AddImagesFormState> = {
        formFields: {
            title: this.props.edited?.title || "",
            url: this.props.edited?.url || "",
            tags: this.props.edited?.tags || "",
            description: this.props.edited?.description || "",
            author: this.props.edited?.author || "",
            date: "",
            addedFields: [],
        }
    }
   

    handleFormChange = (formState: Fields) =>{
        this.setState({formFields: formState});
    }

    handleSubmitForm = () =>{
        this.props.onCreate(new Image(
            this.props.edited?.id,
            this.state.formFields.title,
            this.state.formFields.url,
            this.state.formFields.tags,
            this.state.formFields.description,
            this.state.formFields.author,
        ));      
    }

    addField =()=>{
        this.setState(({formFields}) => 
            ({formFields: {...formFields, 
                addedFields: this.state.formFields.addedFields.concat([""])}}));
        this.forceUpdate();
    }

    handleAddedChange = (index: number) => {
        return (text: string) =>{
            const updatedAddedField = this.state.formFields.addedFields.map((field, id) => id === index? text : field)

            this.setState(({formFields}) => 
            ({formFields: {...formFields, 
            addedFields: updatedAddedField}}));

            this.forceUpdate();
        }
    }


    render() { 
       
        return ( 
            <Form<Fields> title="Add new image"
            formState ={this.state.formFields}
            handleStateChange={this.handleFormChange}
            handleSubmitForm ={this.handleSubmitForm}
            validators={validators}>
               <Input target={"title"} label="Title: " onChange={(text: string) => {return true}}/>
               <ImagePicker target={"url"} label="Pick image: " />
               <DatePicker target={"date"} label="Pick Date: " />
               <><Btn value="+" event={()=>this.addField()}/></>
            {this.state.formFields.addedFields.map((item, index)=>
                <Input key={index} target="addedFields" onChange={this.handleAddedChange(index)} value={item}/>)}
             
               <Input target={"tags"} label="Tags: "/>
               <Input target={"author"} label="Author: "/>
               <Input target={"description"} label="Description: " multiline={{enable:true, lines: 5}}/>
            </Form>
         );
    }
}
 


export default AddImagesForm;
import { Component } from "react";
import Answer from "../modules/Answer";
import Question, { TypeAnswers } from "../modules/Question";
import Form from "./.newFolder/CustomComponents/CustomForm";
import { validatorsType } from "./.newFolder/CustomComponents/shared/shared-interfaces";
import { Validators } from "./.newFolder/CustomComponents/Validators/validators";
import Dropdown from "./.newFolder/CustomComponents/CustomDropdown";
import Input from "./.newFolder/CustomComponents/CustomFormInput";
import Button from "./.newFolder/CustomComponents/CustomButton";
import ImagePicker from "./.newFolder/CustomComponents/CustomImagePicker";
import {convertEnumToTuple} from "./.newFolder/CustomComponents/shared/shared-functions";
import { Text, View } from "react-native";

interface AddQuestionsFormProps {
    onCreate: (question: Question) =>void;
    edited: Question | undefined
}
interface Fields{
    type: TypeAnswers;
    text: string;
    picture: string;
    points: string;
    
   
}
 

interface AddQuestionsFormState {
    formFields: Fields;
    AnswText: string[];
    AnswPicture: string[];
    AnswScorePr: string[];
}

let season: [string, number][] =[];
for(let i = 1; i<= 10; i++){
    season.push([`Season ${i}`, i])
}  

const validators: validatorsType<Fields> = {
    // type: [Validators.required()],
    text: [Validators.required(), Validators.len(10, 500)],
    points: [Validators.required(), Validators.isNumber()],


    
}
 
class AddQuestionsForm extends Component<AddQuestionsFormProps, AddQuestionsFormState> {
    state: Readonly<AddQuestionsFormState> = {
        formFields: {
            type: TypeAnswers.MultipleChoise,
            text: '',
            picture: '',
            points: '',

        },

        AnswText: [],
        AnswPicture: [],
        AnswScorePr: [],
    }

    componentDidUpdate(prevProps: AddQuestionsFormProps){
        if(this.props.edited !== prevProps.edited)
            this.handleEdited();
    }

    handleEdited(){
        if(!this.props.edited) return;

        this.setState({formFields: {
            type: this.props.edited!.type,
            text: this.props.edited!.text,
            picture: this.props.edited!.picture,
            points: this.props.edited!.points.toString(),
        },
        AnswText:  this.props.edited!.answers.map(ans => ans.text),
        AnswPicture:  this.props.edited!.answers.map(ans => ans.picture),
        AnswScorePr:  this.props.edited!.answers.map(ans => ans.scorePr.toString()),
        })
    }

    handleFormChange = (formState: Fields) =>{
        this.setState({formFields: formState});
    }

    handleSubmitForm = () =>{

        const answers: Answer[] = this.state.AnswPicture.map((picture, index) =>{
            const  {AnswText, AnswScorePr} = this.state;
            return new Answer(
                index,
                parseInt(AnswScorePr[index]),
                this.props.edited?.answers[index]?.created || new Date().toDateString(),
                new Date().toDateString(),
                AnswText[index],
                picture
            );
        });
        
        this.props.onCreate(new Question(
            this.props.edited?.id,
            this.state.formFields.type,
            this.state.formFields.text,
            this.state.formFields.picture,
            parseInt(this.state.formFields.points),
            answers,
            this.props.edited?.position,
            this.props.edited?.created || new Date().toDateString(),
            new Date().toDateString()
        ))
        
    }

    addField =()=>{
        this.setState({
                AnswText: this.state.AnswText.concat([""]),
                AnswPicture: this.state.AnswPicture.concat([""]),
                AnswScorePr: this.state.AnswScorePr.concat([""])
            });
    }
    removeField =()=>{
        this.setState({
                AnswText: this.state.AnswText.filter((ans, index) => index !== this.state.AnswText.length-1),
                AnswPicture: this.state.AnswPicture.filter((ans, index) => index !== this.state.AnswPicture.length-1),
                AnswScorePr: this.state.AnswScorePr.filter((ans, index) => index !== this.state.AnswScorePr.length-1),
            });
    }


    handleAddedChange = (target: "AnswText" | "AnswPicture" | "AnswScorePr",index: number) => {
        return (text: string) =>{
            
            const updatedAddedField = this.state[target].map((field, id) => id === index? text : field);

            this.setState({[target]: updatedAddedField});
        }
    }


    render() { 
       
        return ( 
            <Form<Fields> title="Add Question"
            formState ={this.state.formFields}
            handleStateChange={this.handleFormChange}
            handleSubmitForm ={this.handleSubmitForm}
            validators={validators}>
               
                <Dropdown target="type" label="Choose type:" data={convertEnumToTuple(TypeAnswers)}/>
                <Input target="text" label="Text: " />
                <ImagePicker target="picture" label="Image: " />
                <Input target="points" label="Points: " />

                <View style={{flexDirection:"row"}}>
                    <Text>Answers: </Text>
                    <Button value="+" event={()=>this.addField()}/>
                    <Button value="-" event={()=>this.removeField()} bgColor="red"/>
                </View>
                {this.state.AnswText.map((item, index)=>{
                    const  {AnswPicture, AnswScorePr} = this.state;
                    return (<>
                        <Text key={'blob' + index}>Answer {index}: </Text>
                        <Input key={index} target="addedFields" label="Answer text" onChange={this.handleAddedChange("AnswText" ,index)} value={item}/>
                        <ImagePicker key={index + "blob"} target="addedFields" label="Answer picture" onChange={this.handleAddedChange("AnswPicture",index)} value={AnswPicture[index]}/>
                        <Input key={index+ "bloolb"} target="addedFields" label="Answer points" onChange={this.handleAddedChange("AnswScorePr" ,index)} value={AnswScorePr[index]}/>
                    </>);
                    })}
             
            </Form>
         );
    }
}
 


export default AddQuestionsForm;
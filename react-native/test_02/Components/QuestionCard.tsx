
import React from "react";
import { Text, View } from "react-native";
import Question from "../modules/Question";
import Btn from "./.newFolder/CustomComponents/CustomButton";
import Card from "./.newFolder/CustomComponents/CustomCard";

interface QuestionCardProps {
    item: Question;
    onDelete:(item: Question)=>void;
    onEdit: (item: Question)=>void;
    options: {
        onUp: (item: Question)=>void;
        onDown: (item: Question)=>void;
    }
}

const QuestionCard =  ({item, onEdit, onDelete, options}: QuestionCardProps) => {
   
    return (

    <Card len='r2' image={{uri: item.picture}} title={""}>
        <Text>Text: {item.text}</Text>
        <Text>Answers: {item.answers.map(ans => `\n${ans.text} => ${ans.scorePr} `)}</Text>
        <Btn value="Edit" bgColor="blue" event={()=>onEdit(item)}/>
        <Btn value="Delete" bgColor="red" event={()=>onDelete(item)}/>
        <Btn value="Up" bgColor="blue" event={()=>options.onUp(item)}/>
        <Btn value="Down" bgColor="red" event={()=>options.onDown(item)}/>
    </Card>
     );
}
 
export default QuestionCard;
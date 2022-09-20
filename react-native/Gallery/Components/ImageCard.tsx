
import React from "react";
import { Dimensions, Text, View } from "react-native";
import Image from "../modules/Gallery-image";
import Btn from "./.newFolder/CustomComponents/CustomButton";
import Card from "./.newFolder/CustomComponents/CustomCard";
import Draggable from "./.newFolder/CustomComponents/CustomElements/Draggable";

interface ImageCardProps {
    item: Image;
    onDelete: (item: Image) =>void;
    onEdit: (item: Image) =>void;
    options: {
        onFav: (item: Image) => void;
    };
}
 
const ImageCard =  ({item, onDelete, onEdit, options}: ImageCardProps) => {

    return (
        <Card len='r2' image={{uri: item.url}} title={item.title}>
        <Text selectable={false} >Author: {item.author}</Text>
        <Text selectable={false}>Tags: {item.tags}</Text>
        <Text selectable={false}>Description: {item.description}</Text>
        <Btn event={() => onEdit(item)} value="Edit"  bgColor="blue"/>
        <Btn event={() => onDelete(item)} value="Delete"  bgColor="red"/>
        <Btn event={() => options.onFav(item)} value={item.isFav? "Remove from Fav" : "Add to Fav"}  bgColor="lightgreen"/>
        </Card>
     );
}
 
export default ImageCard;
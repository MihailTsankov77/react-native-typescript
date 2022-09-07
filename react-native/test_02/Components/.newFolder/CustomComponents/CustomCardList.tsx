import { ComponentType } from "react";
import { View } from "react-native";
import { CustomStyle } from "./shared/shared-styles";
import { Identifiable } from "../../../dao/repository";

interface ListProps<T> {
    items: T[];
    onDelete?: (item: T)=>void;
    onEdit?: (item: T)=>void;
    Card: ComponentType<T>
    options?: any;
}



 function List<T extends Identifiable<number>> ({items, Card, ...rest}:ListProps<T>) {
    
    const elements = items.map(item=>{
        return <Card key={item.id} item={item} {...(rest as unknown as T)} />
    });
   
    return (
        <View style={CustomStyle.cardsContainer}>
            {elements}
        </View>    
    );   
}

export default List;
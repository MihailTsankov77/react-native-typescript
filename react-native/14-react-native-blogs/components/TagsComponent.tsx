import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface TagsProps {
    tags: string[];
    onFilter: (filterTags: string[]) => void;
    tagsFilter: string[];
}
 
const Tags= ({tags, onFilter, tagsFilter}: TagsProps) =>{
    
    const handleAddTag = (tag: string) => {
        let filteredTags = tagsFilter;
        if(filteredTags.includes(tag)){
            filteredTags =filteredTags.filter(tagF => tagF!==tag);
          }else{
            filteredTags =filteredTags.concat(tag);
          }
          onFilter(filteredTags);
    }

    return (  
        <View  style={styles.tags}>
            {tags.map(tag =>
                <Pressable onPress={() => handleAddTag(tag)}>
                    <Text key={tag} style={{...styles.tag, backgroundColor: (tagsFilter.includes(tag)? "red": '#fccb58')}}>{tag}</Text>
                </Pressable>
                )}
        </View>
);
};

const styles = StyleSheet.create({
    
    tags: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 5,
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 15,
        borderColor: 'green',
    },
})
 
export default Tags;
import React from "react";
import { ScrollView, ScrollViewProps, Text, TextStyle, View, ViewStyle } from "react-native";

interface ScrollableTextAreaProps extends ScrollViewProps{
    height?: number;
    content: string;
    position: number;
    style?: ViewStyle;
    textStyle?: TextStyle;
}
 
const ScrollableTextArea = React.forwardRef<ScrollView, ScrollableTextAreaProps>((props, ref) =>  {
    const {height, content, position, style, textStyle, ...rest} = props;
    const container = (<ScrollView ref={ref} style={{...style, height:1000}} {...rest}>        
                        <Text style={{...textStyle}}>
                            {content}
                            </Text> 
                    </ScrollView>)
    return (
        <>
            {height? 
            <View style={{ height: height}}>
                {container}
            </View>:
            <>{container}</>
            }
        </> 
     );
})
 
export default ScrollableTextArea;
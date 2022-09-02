import { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";

interface ToastProps {
    
    message: string;
    experationTime?: number;
    bgColor?: string;
    color?: string;
    onFinish: () => void;
}

const toastWidth = 200;
 
const Toast = ({message, onFinish, experationTime = 1000, bgColor = 'red', color = 'white'}: ToastProps) => {

    const animatedValue = useRef(new Animated.Value(-toastWidth)).current;

    useEffect(() => animate());

    const animate = () => {
        Animated.sequence([
            Animated.timing(animatedValue,{
                    toValue: 10,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue,{
                    toValue: -toastWidth,
                    duration: 1000,
                    delay: experationTime,
                    useNativeDriver: true,
                })
        ]).start(() => onFinish());
    }

    return (
        
        <Animated.View 
         style={{...ToastStyles.item, backgroundColor: bgColor, marginLeft: animatedValue,
           opacity: animatedValue.interpolate({
             inputRange: [-toastWidth, 0],
             outputRange: [0, 1],
             extrapolate: 'clamp',
           }) } }>
             <Text style={{color: color}}>{message}</Text>
           </Animated.View>
     );
}

const ToastStyles = StyleSheet.create({
    item:{
        width: toastWidth,
        margin: 5,
        height: 200/5,
    },
})
 
export default Toast;
import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const arrValues: number[] =[];
const numberOfDrops = 250;
for (let i = 0; i < numberOfDrops; i++) {
   arrValues.push(i);
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const width =  20;

export default class PurpleRain extends Component {

  state ={
    animatedValue : arrValues.map(val => new Animated.Value(0)),
    isAnimated: true,
  }
    

    componentDidMount(){
        this.animate();
    }

    componentDidUpdate(){
      if(!this.state.isAnimated)
        this.animate();
    }
    animate = () => {
        const animations = arrValues.map(val=>
            Animated.timing(this.state.animatedValue[val],{
                toValue: windowHeight,
                duration: 1000,
                delay: Math.random()*10*numberOfDrops*this.props.numberOfDrops,
                useNativeDriver: true,
            }));
      Animated.parallel(animations).start(()=> this.setState({animatedValue: arrValues.map(val => new Animated.Value(0)), isAnimated: false}));
    }

  render() {
    const animItems = arrValues.map(val => {
    
       return <Animated.View key={val} 
        style={{...styles.drop, 
            transform: [{ translateY: this.state.animatedValue[val] }, {translateX: Math.random()*windowWidth}], 
            opacity: this.state.animatedValue[val].interpolate({
                inputRange: [0, Math.random()*windowHeight/3,windowHeight/2, windowHeight],
                outputRange: [0, Math.random(),1, 0],
                extrapolate: 'clamp',
              }) } }/>});
    return (
      <View >
        {animItems}
      </View>
    )
  }
}


const styles  = StyleSheet.create({
    drop:{
        position: "absolute",
        width: width,
        height: width,
        borderRadius: width,
        backgroundColor: 'purple',
    }
});
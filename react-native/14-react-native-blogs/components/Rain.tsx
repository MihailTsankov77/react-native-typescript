import React, { Component } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';

const arrValues: number[] =[];
const numberOfDrops = 250;
for (let i = 0; i < numberOfDrops; i++) {
   arrValues.push(i);
}

const Width = Dimensions.get('window').width;


const width =  5;

export default class Rain extends Component {

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
                toValue: 40,
                duration: 1000,
                delay: Math.random()*10*numberOfDrops,
                useNativeDriver: true,
            }));
      Animated.parallel(animations).start(()=> this.setState({animatedValue: arrValues.map(val => new Animated.Value(0)), isAnimated: false}));
    }

  render() {
    const animItems = arrValues.map(val => {
    
       return <Animated.View key={val} 
        style={{...styles.drop, 
            transform: [{ translateY: this.state.animatedValue[val] }, {translateX: Math.random()*400}], 
            opacity: this.state.animatedValue[val].interpolate({
                inputRange: [0,40/2, 40],
                outputRange: [0,1, 0],
                extrapolate: 'clamp',
              }) } }/>});
    return (
      <View style={{display: 'flex', flexDirection: 'row'}}>
        {animItems}
      </View>
    )
  }
}


const styles  = StyleSheet.create({
    drop:{
      position: 'absolute',
        width: width,
        height: width,
        borderRadius: width,
        backgroundColor: 'green',
    }
});
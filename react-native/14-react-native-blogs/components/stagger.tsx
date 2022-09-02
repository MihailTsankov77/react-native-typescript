import React, { Component } from 'react';
import { Animated, FlatList, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';

const arrValues: number[] =[];
const numberOfDrops = 10;
for (let i = 0; i < numberOfDrops; i++) {
   arrValues.push(i);
}

const itemWidth = 300;

export default class Stagger extends Component {
   
    state = {
      loaded: numberOfDrops,
     
    }
    animatedValue = arrValues.map(val => new Animated.Value(-itemWidth));

    componentDidMount(){
        this.animate();
    }

    

    animate = () => {
        const animations = this.animatedValue.filter((val, index) => index >= this.state.loaded-numberOfDrops).map((v, val)=>
          
            Animated.timing(this.animatedValue[val+ this.state.loaded-numberOfDrops],{
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
            }));
            Animated.stagger(100, animations).start();
    }

  

  render() {

    if(this.animatedValue.length< this.state.loaded){
    
      arrValues.map(val => this.animatedValue.push(new Animated.Value(-itemWidth)));
      this.animate()
    }






    const animItems = this.animatedValue.map((v, val) => {
    
       return <Animated.View key={val} 
        style={{...styles.item, marginLeft: this.animatedValue[val],
          opacity: this.animatedValue[val].interpolate({
            inputRange: [-300, 0],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          }) } }>
            <Text>Item {val}</Text>
          </Animated.View>});

    
    return (
      <SafeAreaView   style={{height: 1000}}>
      <FlatList 
          
            data={animItems}
            renderItem={({item})=> item}
            
            onEndReachedThreshold={0.2}
          
            onEndReached={()=> this.setState({loaded: this.state.loaded + numberOfDrops})}
            

            />
      </SafeAreaView>
      
  
    )
  }
}


const styles  = StyleSheet.create({
  item:{
    width: itemWidth,
    margin: 5,
    height: itemWidth/5,
    backgroundColor: 'gray',
}
});
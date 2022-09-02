import React, { Component } from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native';
import PurpleRain from './PurpleRain';
import Rain from './Rain';

interface ProgressbarProps{
  min: number;
  max: number;
  value: number;
}
interface ProgressbarState{
   width: Animated.Value;
}

const Width = 400;

export default class Progressbar extends Component<ProgressbarProps, ProgressbarState>{
 
    state: Readonly<ProgressbarState>={
        width:  new Animated.Value(0),
    }

    calculateProcent(){
        return (Width/(this.props.max - this.props.min))* this.props.value;
    }
    
    
    componentDidUpdate(prevProps: ProgressbarProps){
        if(prevProps.value!==this.props.value){
            this.animate();
        }
    }

    
    animate(){
        const val = this.calculateProcent();
        Animated.timing(this.state.width, {
            toValue: val,
            duration: 100,
            useNativeDriver: true,
          }).start();
        
    }
    

  render() {
    return (
      <View style={styles.container}>
        {this.props.value!==0?
         <Animated.View style={{...styles.progress, width: this.state.width}}>
            <Text style={styles.text}>{this.calculateProcent()/Width*100}%</Text>
        </Animated.View> :
            <Rain/>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    width: Width,
    height: 40,
    borderColor: 'lightgreen',
    borderWidth: 2,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 5,
    padding: 2,
  },
  progress:{
    height: "100%",
    backgroundColor: 'lightgreen',
    alignSelf: 'center',
    borderRadius: 5,
  },
  text:{
    alignSelf: 'center',
    fontSize: 26
  }
})


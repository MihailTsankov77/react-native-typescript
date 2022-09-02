import React, { Component, ReactNode } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Toast from './CustomToast';

export type ToastInt ={
    message: string;
    experationTime?: number;
    bgColor?: string;
    color?: string; 
}
interface ToasterProps{
    newToasts: ToastInt[];
}


type ToastItems ={
  index: number;
  node: ReactNode;
} 

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Toaster extends Component<ToasterProps, {}> {

  toasts: ToastItems[] = [];
  index = 0;
  prevMessages: ToastInt[] = [];

  handleDeleteItem = (index: number) =>{
    return () =>{
      this.toasts = this.toasts.filter(toast => toast.index!== index);
      this.forceUpdate();
    }
  }
  addElements(){
    this.props.newToasts.filter(toast => !this.prevMessages.includes(toast)).map((toast) => this.toasts.push({index: this.index, 
      node: (<Toast key={this.index} {...toast} onFinish={this.handleDeleteItem(this.index++)}/>)}));
  }
  
  render() {
    // if(this.prevMessages.includes){
      this.addElements();
    // }
      
    
    return (
        <View style={styles.container}>
          {this.toasts.map(toast => toast.node)}
        </View>
    )
  }
}


const styles = StyleSheet.create({
    container:{
      pointerEvents: 'none',
      width: windowWidth,
      height: windowHeight,
      position: 'absolute',
      zIndex: 1000
    }
})


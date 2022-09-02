import React, { Component, ReactNode } from 'react';
import { Animated, Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import Toast from './CustomToast';

export type ToastInt ={
    message: string;
    experationTime?: number;
    bgColor?: string;
    color?: string; 
}
interface ToasterState{
    toasts: ToastItems[];
}



type ToastItems ={
  index: number;
  node: ReactNode;
} 


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class Toaster extends Component<{}, ToasterState> {

  state: Readonly<ToasterState> = {
    toasts: []
  }

 
  index = 0;

  handleDeleteItem = (index: number) =>{
    return () =>{
      this.setState({toasts: this.state.toasts.filter(toast => toast.index!== index)});
    }
  }

  
  showMessage = (toasts: ToastInt[])=>{
    toasts.map((toast) => this.setState({toasts: this.state.toasts.concat({index: this.index, 
      node: (<Toast key={this.index} {...toast} onFinish={this.handleDeleteItem(this.index++)}/>)})}));
  }
  
  render() {    
    return (
        <View style={styles.container}>
          {this.state.toasts.map(toast => toast.node)}
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


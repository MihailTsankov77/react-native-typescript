import React, { Component, ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import Draggable from "./Draggable";

type DraggableType =  {id: number, draggable: ReactNode}

export interface DropAreaProps{
    onMove?: (width: number, height: number, px: number, py: number) => void;
    droppedItems?: number;
}

interface DropAreaState{
    draggables: DraggableType[];
}

export default class DropArea extends Component<DropAreaProps, DropAreaState> {

    state: Readonly<DropAreaState> ={
        draggables: [],
    }

    DropAreaRef = React.createRef<View>();

    handleLayoutChange = () => {
        this.DropAreaRef.current?.measure( (fx, fy, width, height, px, py) => 
            this.props.onMove!(width, height, px, py));
    }
        
    


  

  render() {
    return (
        <View ref={this.DropAreaRef} style={styles.dropZone} onLayout={this.handleLayoutChange}>
          <Text selectable={false} style={styles.text}>Drops until now: {this.props.droppedItems} </Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
  dropZone: {
    position: 'absolute',
    width: 1500,
    height: 300,
    top: 0,
    left: 0,
    backgroundColor: "#00334d"
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
    fontSize: 25,
    fontWeight: "bold"
  }
});
import React, { Component, FunctionComponentElement, ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropArea, { DropAreaProps } from "./DropArea";
import Draggable, { DragAndDropProps } from "./Draggable";

type DraggableType =  {id: number, draggable: ReactNode}
export type dropAreaType = {
    width: number; 
    height: number; 
    px: number;
    py: number;
    dropped: number;
}

interface DragAndDropAreaState{
    draggables: DraggableType[];
    dropArea: dropAreaType;
}
interface DragAndDropAreaProps{
    children: ReactNode[];
}



export default class DragAndDropArea extends Component<DragAndDropAreaProps, DragAndDropAreaState> {

    state: Readonly<DragAndDropAreaState> ={
        draggables: [],
        dropArea: {
            width: 0, 
            height: 0,
            px: 0,
            py: 0,
            dropped: 0,
        }
    }

    handleOnFinish = () =>{
      console.log('====================================');
      console.log("Dropt");
      console.log('====================================');
    }
    
            
   

    handleOnMoveDropArea = (width: number, height: number, px: number, py: number) => {
        this.setState({dropArea: {
            width: width, 
            height: height, 
            px: px, 
            py: py,
            dropped: this.state.dropArea.dropped 
        }});
    }

  addPropsToChildren = ( children: ReactNode[] ) =>{
    return children.map(child => {
      if (!React.isValidElement(child)) return child;
      const props: (DropAreaProps & DragAndDropProps) = {
        onMove: this.handleOnMoveDropArea,
        droppedItems: this.state.dropArea.dropped,
        onFinish: this.handleOnFinish,
        dropArea: this.state.dropArea 
      }


      return React.cloneElement(child, props)
    });
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.addPropsToChildren(this.props.children)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  ballContainer: {
    height:200
  },
  row: {
    width: 600,
    height: 200,
    position: 'absolute',
    top: 300,
    left: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "red",
  },  
  dropZone: {
    height: 200,
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
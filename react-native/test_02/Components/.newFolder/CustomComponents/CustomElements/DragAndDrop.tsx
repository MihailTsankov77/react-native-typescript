import React, { Component, FunctionComponentElement, ReactNode } from "react";
import { StyleSheet, View, Text } from "react-native";
import DropArea, { DropAreaProps } from "./DropArea";
import Draggable, { DragAndDropProps } from "./Draggable";


interface DragAndDropAreaState{
    dropAreas: dropAreaConfig[];
}
interface DragAndDropAreaProps{
    children: ReactNode[];
}

export type dropAreaConfig = {
  id: string, 
  width: number, 
  height: number, 
  px: number, 
  py: number, 
  onDroptItem:(item: any, renderItem: (item: any)=>ReactNode)=> void
}
interface ContextProps{
    onMove: (({id, width, height, px, py, onDroptItem}: dropAreaConfig) => void),
    dropAreas: dropAreaConfig[] ,
}

export const ContextDragAndDrop = React.createContext<ContextProps>({
    onMove: (({id, width, height, px, py, onDroptItem}: dropAreaConfig) => {return}),
    dropAreas: [],
});

export default class DragAndDropArea extends Component<DragAndDropAreaProps, DragAndDropAreaState> {

    state: Readonly<DragAndDropAreaState> ={
        dropAreas: []
    }   

    handleOnMoveDropArea = ({id, width, height, px, py, onDroptItem}: dropAreaConfig) => {

        const upd = {
          id: id, 
          width: width, 
          height: height, 
          px: px, 
          py: py, 
          onDroptItem: onDroptItem
        };

        if(this.state.dropAreas.some(dropArea => dropArea.id === id)){
          this.setState({dropAreas: this.state.dropAreas.map(area => area.id === id? upd : area)});
        }else{
          this.setState({dropAreas: this.state.dropAreas.concat(upd)});
        }
    }

  contextValue: ContextProps = {
    onMove: this.handleOnMoveDropArea,
    dropAreas: this.state.dropAreas,
  }
  
  

  render() {
    return (
      <ContextDragAndDrop.Provider value={{
        onMove: this.handleOnMoveDropArea,
        dropAreas: this.state.dropAreas,
      }}>
        <View style={styles.mainContainer}>
          {this.props.children}
        </View>
      </ContextDragAndDrop.Provider>
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
    flexDirection: "row",
    flexWrap: "wrap",
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
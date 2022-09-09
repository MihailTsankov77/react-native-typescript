import React, { Component, ReactNode, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContextDragAndDrop, dropAreaConfig } from "./DragAndDrop";

export interface DropAreaPropsFromApp{
  id: string;
  title: string;
}

export interface DropAreaProps extends DropAreaPropsFromApp{
  onMove: (({id, width, height, px, py, onDroptItem}: dropAreaConfig) => void);
}
type drops ={
  item: any;
  renderItem: (item: any) => ReactNode;
}

interface DropAreaState{
    droppedItems: drops[];
}
const  DropArea = (props: DropAreaPropsFromApp) =>{
  const context = useContext(ContextDragAndDrop);
  return <DropAreaElem {...props} {...context} />
}
export default DropArea;


class DropAreaElem extends Component<DropAreaProps, DropAreaState> {

    state: Readonly<DropAreaState> ={
      droppedItems: [],
    }

    DropAreaRef = React.createRef<View>();

    handleLayoutChange = () => {
        this.DropAreaRef.current?.measure( (fx, fy, width, height, px, py) => 
            this.props.onMove({id: this.props.id, width: width, height: height, px: px, py: py, onDroptItem: this.onDroptItem}));
    }
        
    onDroptItem = <T,> (item: T, renderItem: (item: T) => ReactNode) =>{
      this.setState({droppedItems: this.state.droppedItems.concat({item: item, renderItem: renderItem})})
    }

  render() {
    return (
        <View ref={this.DropAreaRef}  onLayout={this.handleLayoutChange} style={styles.dropZone}>
          <Text>{this.props.title}</Text>
          {this.state.droppedItems.map(drop => drop.renderItem(drop.item))}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  
  dropZone: {
      flexDirection: 'column',
      flexWrap: 'nowrap',
      borderWidth: 3,  
      borderColor: "#E0E0E1",
      height: 150,
      width: 150,
      padding: 10,
      alignItems: 'center',
      alignContent: 'center',
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
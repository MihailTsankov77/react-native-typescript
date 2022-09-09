import React, { Component, ReactNode, useContext } from "react";
import {
  StyleSheet,
  PanResponder,
  Animated,
  Button,
} from "react-native";
import { ContextDragAndDrop, dropAreaConfig} from "./DragAndDrop";

export interface DragAndDropProps extends DragAndDropPropsFromApp{
  dropAreas: dropAreaConfig[];
}
export interface DragAndDropPropsFromApp{
  dropAreasIDs: string[]
  item: any;
  itemRender: (item: any)=> ReactNode;
}



const  Draggable = (props: DragAndDropPropsFromApp) =>{
  const context = useContext(ContextDragAndDrop);
  return <DraggableElement {...props} {...context} />
}

class DraggableElement extends Component<DragAndDropProps, {}> {
  
    panValue = new Animated.ValueXY({x: 0, y: 0 })
    opacity = new Animated.Value(1);

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onStartShouldSetPanResponderCapture: (e, gesture) => true,
        onMoveShouldSetPanResponderCapture: (e, gesture) => true,
        onPanResponderMove: Animated.event([
          null, { dx: this.panValue.x, dy: this.panValue.y }
        ], {useNativeDriver: true}),
        onPanResponderRelease: (e, gesture) => {
          let notIn = true;
          const dropAreas = this.props.dropAreas.filter(dr => this.props.dropAreasIDs.includes(dr.id));
          for(const dropArea of dropAreas){
            const {px, py, width, height} = dropArea;
            if ((gesture.y0 + gesture.dy < py + height && gesture.y0 + gesture.dy > py) && (gesture.x0 + gesture.dx < px + width && gesture.x0 + gesture.dx > px)) {
              Animated.sequence([
                  Animated.parallel([
                    Animated.timing(this.panValue.y, {
                      toValue: (height/2 + py - gesture.y0),
                      duration: 400,
                      useNativeDriver: false,
                    }),
                    Animated.timing(this.panValue.x, {
                      toValue: (width/2 + px - gesture.x0),
                      duration: 400,
                      useNativeDriver: false,
                    }),
                  ]),
                Animated.timing(this.opacity, {
                  toValue: 0,
                  duration: 100,
                  useNativeDriver: true
                })
              ]).start(()=> dropArea.onDroptItem(this.props.item , this.props.itemRender));
              notIn=false;
              break;
            }
          }
          if(notIn){
            Animated.spring(this.panValue, {
              toValue: { x: 0, y: 0 },
              friction: 5,
              useNativeDriver: false,
            }).start();
          }
        },
        onPanResponderTerminate: (e, gestureState) => {
          Animated.spring(this.panValue, {
            toValue: { x: 0, y: 0 },
            friction: 7,
            useNativeDriver: true,
          }).start();
        },
      });
  render() {
    const panStyle = {
      transform: this.panValue.getTranslateTransform(),
      opacity: this.opacity,
    }
    return (
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[panStyle]}
        >
        {this.props.itemRender(this.props.item)}
        </Animated.View>
    );
  }
}



export default Draggable;
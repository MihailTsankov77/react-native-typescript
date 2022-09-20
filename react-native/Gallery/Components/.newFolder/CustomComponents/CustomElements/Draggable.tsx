import React, { Component, ReactNode } from "react";
import {
  PanResponder,
  Animated,
  GestureResponderEvent,
  PanResponderGestureState,
} from "react-native";

interface DropAreaProps{
  text?: string;
  position: {px: number, py: number, width: number, height: number};
}

export interface DragAndDropProps{
  onFinish?: () => void;
  itemView: ReactNode;
  dropArea: DropAreaProps;
}

export default class Draggable extends Component<DragAndDropProps, {showDragArea: boolean}> {

    state: Readonly<{ showDragArea: boolean; }> = {
      showDragArea: false,
    }
  
    panValue = new Animated.ValueXY({x: 0, y: 0 })
    opacity = new Animated.Value(1);

    panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (e, gesture) => true,
        onStartShouldSetPanResponderCapture: (e, gesture) => false,
        onMoveShouldSetPanResponderCapture: (e, gesture) => true,
        onPanResponderMove: (e: GestureResponderEvent, gestureState: PanResponderGestureState)=>{
          this.setState({showDragArea: true});
          Animated.event([
             null, { dx: this.panValue.x, dy: this.panValue.y }
            ], 
            {useNativeDriver: false})(e, gestureState);
        },
        onPanResponderRelease: (e, gesture) => {
          
          const {px, py, width, height} = this.props.dropArea.position;

          if ((gesture.y0 + gesture.dy < py + height && gesture.y0 + gesture.dy > py) && (gesture.x0 + gesture.dx < px + width && gesture.x0 + gesture.dx > px)) {
            Animated.sequence([
                Animated.parallel([
                  Animated.timing(this.panValue.y, {
                    toValue: (height/2 + py - gesture.y0),
                    duration: 400,
                    useNativeDriver: false
                  }),
                  Animated.timing(this.panValue.x, {
                    toValue: (width/2 + px - gesture.x0),
                    duration: 400,
                    useNativeDriver: false
                  }),
                ]),
              Animated.timing(this.opacity, {
                toValue: 0,
                duration: 400,
                useNativeDriver: false
              })
            ]).start(()=>this.props.onFinish!());
        } else {
            Animated.spring(this.panValue, {
              toValue: { x: 0, y: 0 },
              friction: 5,
              useNativeDriver: false,
            }).start();
          }
          this.setState({showDragArea: false});
        },
        onPanResponderTerminate: (e, gestureState) => {
          Animated.spring(this.panValue, {
            toValue: { x: 0, y: 0 },
            friction: 7,
            useNativeDriver: true,
          }).start();
          this.setState({showDragArea: false});
        },
    });

  render() {
    const panStyle = {
      transform: this.panValue.getTranslateTransform(),
      opacity: this.opacity,
      
    }
    const {dropArea} = this.props;
    
    return (
        <Animated.View 
          {...this.panResponder.panHandlers}
          style={{...panStyle, zIndex:100, elevation: 100}}
        >
        {this.props.itemView}
        </Animated.View>
    );
  }
}

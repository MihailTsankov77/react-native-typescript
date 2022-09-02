import React, { Component, ReactNode } from "react";
import {
  StyleSheet,
  PanResponder,
  Animated,
  Text,
  Button,
} from "react-native";
import { dropAreaType } from "./DragAndDrop";
import DropArea from "./DropArea";

export interface DragAndDropProps{
  onFinish?: () => void;
  dropArea?: dropAreaType;

  // itemView: ReactNode;
}

export default class Draggable extends Component<DragAndDropProps, {}> {
  
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

          const {px, py, width, height} = this.props.dropArea!;

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
        {/* {this.props.itemView} */}
        <Button title="Blob"></Button>
        </Animated.View>
    );
  }
}

let CIRCLE_RADIUS = 30;

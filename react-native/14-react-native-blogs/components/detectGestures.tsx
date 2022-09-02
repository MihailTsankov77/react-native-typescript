
import React, { Component } from "react";
import { Animated, View, StyleSheet, PanResponder, Text } from "react-native";
import { number } from "yup";
interface State {
  dots: { x: number, y: number }[];
  color: string;
}
export default class CircleDetectRespond extends Component<{}, State> {
  state: Readonly<State> = {
    dots: [],
    color: "#eee",
  }

  minX = Infinity;
  minY = Infinity;
  maxX = -Infinity;
  maxY = -Infinity;

  

  

  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
    },
    onPanResponderMove: (evt, gestureState) => {
      if(this.state.color ==="#eee"){

     
      const { moveX, moveY } = gestureState;

        if (moveX > this.maxX) this.maxX = moveX;
        if (moveX < this.minX) this.minX = moveX;
        if (moveY > this.maxY) this.maxY = moveY;
        if (moveY < this.minY) this.minY = moveY;

        const newDots = { x: moveX, y: moveY }
        this.setState({ dots: this.state.dots.concat(newDots) }); 
      }
    },

    onPanResponderRelease: () => {
      const color = (this.detectCircle())? "green" : (this.detectSquare())? "tomato" : undefined; 
      console.log('====================================');
      console.log(this.detectSquare());
      console.log('====================================');
      if(color){
        this.setState({ color: color});
        setTimeout(() => this.setState({ dots: [], color: "#eee" }), 1000);
      }else{
        this.setState({ dots: []})
      }

      this.minX = Infinity;
      this.minY = Infinity;
      this.maxX = -Infinity;
      this.maxY = -Infinity; 
    }
  });


  detectSquare() {
    if (!this.detectFigure()) return false;

    let isSquare = true;
      console.log('====================================');
      console.log(this.state.dots.length);
      console.log('====================================');
    this.state.dots.forEach(dot => {

     if ((Math.abs(this.maxX - dot.x) >  50) && (Math.abs(this.minX - dot.x) >  50)){
        
        console.log('====================================');
        console.log("X:", this.maxX, this.minX, dot.x);
        console.log('====================================');
        return isSquare = false;
      }
      if((Math.abs(this.maxY - dot.y) > 50) && (Math.abs(this.minY - dot.y) >  50) ){ 
       
     
        console.log('====================================');
        console.log("Y:", this.maxY, this.minY, dot.y);
        console.log('===================================='); 
        return isSquare =false;
      }
    });
    return isSquare;

  }
  detectFigure() {
    return (Math.abs(this.state.dots[0].x - this.state.dots[this.state.dots.length - 1].x) < 50 && Math.abs(this.state.dots[0].y - this.state.dots[this.state.dots.length - 1].y) < 50);
  }
  detectCircle() {


    if (!this.detectFigure()) return false;

    const boundRectWidth = this.maxX - this.minX;
    const boundRectHeight = this.maxY - this.minY;

    const radius = (boundRectWidth + boundRectHeight) / 4;
    const centerX = (this.maxX + this.minX) / 2;
    const centerY = (this.maxY + this.minY) / 2;


    let isCircle = true;
    this.state.dots.forEach(dot => {
      const r = Math.pow(Math.pow(dot.x - centerX, 2) + Math.pow(dot.y - centerY, 2), 1 / 2);
      if (Math.abs(radius - r) > radius / 4) {
        isCircle = false;
      }
    });


    return isCircle;

  }
  detectLine(start: number, end: number, gap: number) {
    gap = 3;
    let isVerticalLine = true;
    let isHorizontalLine = true;
    for (let i = start; i < end - gap; i += gap) {
      if (isVerticalLine && Math.abs(this.state.dots[i].x - this.state.dots[i + gap].x) > 20) {
        isVerticalLine = false;
      }
      if (isHorizontalLine && Math.abs(this.state.dots[i].y - this.state.dots[i + gap].y) > 20) {
        isHorizontalLine = false;
      }
      if (!isVerticalLine && !isHorizontalLine) break;
    }
    return isHorizontalLine || isVerticalLine;
  }
  render() {
    return (
      <Animated.View style={styles.container}  {...this.panResponder.panHandlers}>
        {this.state.dots.map((elem, ind) =>
          <View key={ind} style={{
            position: "absolute",
            left: elem.x,
            top: elem.y,
            backgroundColor: this.state.color,
            padding: 10,
            borderRadius: 100,
          }} />
        )}

        <View style={{
          position: "absolute",
          left: ((this.maxX + this.minX) / 2 - (this.maxX - this.minX) / 2) || 0,
          top: (this.maxY + this.minY) / 2 - (this.maxY - this.minY) / 2 || 0,
          borderWidth: 5,
          borderColor: "red",
          width: ((this.maxX - this.minX) > -Infinity) ? (this.maxX - this.minX) : 0,
          height: ((this.maxY - this.minY) > -Infinity) ? (this.maxY - this.minY) : 0,
        }} />

      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5
  }
});
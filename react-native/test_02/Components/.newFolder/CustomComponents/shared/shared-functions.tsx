import { Dimensions, Platform } from "react-native";
import { onChangeFunction, RowLenght } from "./shared-interfaces";

type sizeType = string | number;

export function isSmallScreen(minWidth: number){
    return Platform.OS!=='web' || Dimensions.get('window').width < minWidth;
}

export function getSizeF(r3: sizeType, r2: sizeType, r1: sizeType, defaultValue: sizeType = 0, breakPoint: number = 500, breakPoint2: number = 500){
    return (len: RowLenght | undefined)=>{
        return (isSmallScreen(breakPoint) || len==='r1')? r1 : (len === 'r2' || Dimensions.get('window').width < breakPoint2)? r2: (len === 'r3')? r3: defaultValue;
    }
}

export function convertEnumToTuple(enumeration: any): [string, number][]{
    try{
        const enumArr: (string | number)[] = Object.values(enumeration)
        const enumToArr: [string, number][] = [];
        for(let i = 0; i < enumArr.length/2; i++)
            enumToArr.push([enumArr[i] as string, enumArr[enumArr.length/2 +i] as number]);
        return enumToArr;
    }catch{
        throw "Error not enum in convertEnumToTuple function!";
    }
}

export const notImplemeneted: onChangeFunction = (text: string) => {
    throw `Not parse onChange Function in ${text}`;
}

export function mergeSort <T> (arr: Array<T>): Array<T>{
    const half = arr.length / 2;
  
    // the base case is array length <=1
    if (arr.length <= 1) {
      return arr;
    }
  
    const left = arr.splice(0, half); // the first half of the array
    const right = arr;
    return merge<T>(mergeSort(left), mergeSort(right));
  }

  function merge<T>(left: Array<T> , right: Array<T>): Array<T> {
    let sortedArr: Array<T> = []; // the sorted elements will go here
  
    while (left.length && right.length) {
      // insert the smallest element to the sortedArr
      if (left[0] < right[0]) {
        sortedArr.push(left.shift() as T);
      } else {
        sortedArr.push(right.shift() as T);
      }
    }
    
    // use spread operator and create a new array, combining the three arrays
    return [...sortedArr, ...left, ...right];
  }

//****************    SCTICKY NAVBAR     ***************/

// handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; }; }) => {   
//     if(event.nativeEvent.contentOffset.y >= 200){
//       this.setState({isScrolled: true});
//     }
//     if(event.nativeEvent.contentOffset.y <= 50){
//       this.setState({isScrolled: false});
//     } 
// }
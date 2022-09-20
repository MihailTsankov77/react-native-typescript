import { Validator } from "../../../ts/validators";


export interface ImageProps{
    uri: string;
    width?: number;
    height?: number;
}

export interface Colorable{
    color?: string;
    bgColor?: string;
    borderColor?:string;
    image?: ImageProps;
}

export type RowLenght = 'r1' | 'r2' | 'r3';

export interface Resizeable {
    len?: RowLenght;
    height?: number | string;
    mutate?: boolean;
}

export interface Listable {
    key?: string | number;
}

export interface hasTitle{
    title?: string;
}

export interface InputField{
    value?: string;
    label?: string
    prestine?: boolean;
    error?: string;
}

export type onChangeFunction = (text: string) => void;
export type onChangeFactoryFunction = (text: string) => onChangeFunction;

export interface onChangeInterface{
    target: string;
    onChange?: onChangeFunction;
}


export type validatorsType<V> ={
    [P in keyof V]?: Validator[];
}
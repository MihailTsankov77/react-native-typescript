import React, { Component, ComponentType } from "react";

function logHOC<T>(Comp: ComponentType<T>){
   
   type Props = T & {forwardedRef: React.ForwardedRef<T>}

    class LogHoc extends Component<Props> {
        componentDidUpdate(prevProps: any){
            console.log("prev props:", prevProps);
            console.log("next props:", this.props);
        }
        render() { 
            const {forwardedRef, ...rest} = this.props;
            return (<Comp {...(this.props as T)} ref={forwardedRef}/>);
        }
    }

    
     
      return React.forwardRef<T, T>((props, ref)=>{
        return <LogHoc forwardedRef={ref} {...props}  />;
      });
}

export default logHOC;
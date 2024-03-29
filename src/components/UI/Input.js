import { Fragment } from "react";

const Input = (props)=>{
    return (
       <div>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input {...props.input}></input>
        </div>
    )
}


export default Input;
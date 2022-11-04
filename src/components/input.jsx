import '../styles/input.css'
import React from "react";
export function Input(props) {
    return (
        <div className='input' id={props.iddiv}>
            <input className='cajon-input' name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} type={props.type} id={props.id} min={props.min} max={props.max}>

            </input>

        </div>

    )
}
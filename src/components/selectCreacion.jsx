import '../styles/selectCreacion.css'
import React from "react";
export function SelectCreacion(props) {
    return (
        <div className='btn-select'>
            <button className='btn-select' onClick={props.onClick}>
                <div className='btn-select-s1'>
                    <div className='img-tam'>
                    <img className="imgbtn" src='./images/acciones/Group.svg'  alt='home' />
                    </div>
                </div>
                <div className='btn-select-s2'>
                    <h4>{props.nombre}</h4>
                    <h3>{props.desc}</h3>
                </div>
            </button>
        </div>

    )
}
import { useSelector } from 'react-redux';
import '../styles/input.css'
import React from "react";
export function SelectScout(props) {

    const { scouts } = useSelector(state => state.scout);

    return (
        <div className='input-scouts'>
            <select id={props.id} className='cajon-select' placeholder={props.placeholder} name={props.nombre}>
                <option value="">Seleccione un scout</option>
                {
                    scouts.map(scout => {
                        return (
                            <option key={scout._id} value={scout._id}>{scout.nombre} {scout.apellido} </option>
                        )
                        
                    })
                    
                }
            </select>

        </div>

    )
}
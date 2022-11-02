import "../../../styles/styles.css"

import { useEventoStore } from "../../../Hooks/useEventoStore";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const ObjScoutInsc = ({ scout}) => {
    const params = useParams();

    
    // }
    if( scout === true ){
        return (
            <div>
    
                <h3>Actualmente se encuentra inscrito al evento</h3>
            </div>
    
        )

    }else{
        return (
            <div>
    
                <h3>Actualmente  NO se encuentra inscrito al evento, solicite la inscripcion a su acudiente</h3>
            </div>
    
        )

    }
    
}
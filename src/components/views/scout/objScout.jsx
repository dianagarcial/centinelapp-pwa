import "../../../styles/styles.css"

import { useEventoStore } from "../../../Hooks/useEventoStore";

import { useSelector } from "react-redux";
import MoodBadIcon from '@mui/icons-material/MoodBad';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import { useRamasStore } from "../../../Hooks";
import { Button } from "@mui/material";
import { useEffect } from "react";


export const ObjScoutInsc = ({ scout}) => {
   
    const {user} = useSelector(state=>state.auth);
    const { ramaScout } = useSelector(state => state.rama);
    const {startListarRamaID}= useRamasStore();
    const {startInscribirEvento}=useEventoStore();
    useEffect(() => {
        startListarRamaID(user?.uid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
        function inscripcion(e) {
        e.preventDefault();
        startInscribirEvento(user?.uid);
       }

    
    // }
    if(ramaScout==='Recurso Adulto'){
        return (
            <Button variant="outlined" color="primary" onClick={inscripcion}>Inscribirse</Button>
        )
    }else{

    
    if( scout === true ){
        return (
            <div className="inscrito-div">
                <InsertEmoticon style={{ 'fontSize': "60px", 'width': "100%", "color":"#C1121F"}}/>
                <h3>Actualmente se encuentra inscrito al evento</h3>
            </div>
    
        )

    }else{
        return (
            <div className="inscrito-div">
                <MoodBadIcon style={{ 'fontSize': "60px", 'width': "100%", "color":"#C1121F"}}/>
                <h3>Actualmente  NO se encuentra inscrito al evento, solicite la inscripcion a su acudiente</h3>
            </div>
    
        )

    }
}
    
}
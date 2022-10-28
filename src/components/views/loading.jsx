
import '../../styles/loading.css'
import LinearProgress from '@mui/material/LinearProgress';

export const Loading = () => {


    return (
        <div className="loading">
            <img className="imgbtn" src='./images/inicio/logo.svg' alt='home' />
            <LinearProgress />
        </div>


    )
}
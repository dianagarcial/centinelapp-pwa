
import '../styles/navbar.css'
import { useNavigate } from 'react-router-dom';
import React from "react";

export function Navbar() {
    const navigate = useNavigate();

    function home(e) {
        e.preventDefault();
        navigate(`/home`)
    }

    function messages(e) {
        e.preventDefault();
        navigate(`/publicaciones`)
    }
    function perfil(e) {
        e.preventDefault();
        navigate(`/perfil`)
    }
    function calendar(e) {
        e.preventDefault();
        navigate(`/eventos`)
    }
    return (
        <div className='App'>

            <div className="Navbar">
                <div className='Iconos-Navbar'>
                    <div className="home" href="/home">
                        <button onClick={home} className="btn-nav">
                            <img src='https://res.cloudinary.com/scouts2022/image/upload/v1668790100/recursos/ci_home-alt-fill_2_dsexta.png' alt='home' />

                        </button>
                    </div>
                    <div className="messages">
                        <button onClick={messages} className="btn-nav">
                            <img src='https://res.cloudinary.com/scouts2022/image/upload/v1668790100/recursos/jam_messages-f_2_rhvmrr.png' alt='mensaje' />

                        </button>


                    </div>
                    <div className="calendar">
                    <button onClick={calendar} className="btn-nav">
                        <img src='https://res.cloudinary.com/scouts2022/image/upload/v1668790100/recursos/ant-design_calendar-filled_3_fmrc1e.png' alt='calendario' />
                    </button>
                    </div>
                    <div className="person">
                        <button onClick={perfil} className="btn-nav">
                            <img src='https://res.cloudinary.com/scouts2022/image/upload/v1668790100/recursos/bi_person-fill_3_gkdfox.png' alt='persona' />

                        </button>
                    </div>
                </div>


            </div>
        </div>

    )
}
import { useNavigate, Link } from 'react-router-dom';
import './MainPage.css';


function MainPage() {

const navigate = useNavigate();

const handleLoginClick = () =>{
    navigate("/login")
}    

const handleRegisterClick = () =>{
    navigate("/register")
}

return (
    <div className='main-page'>
        <div className='main-card'>
            <h1 className='heading'>KEEP A LOG OF THE GAMES YOU PLAY AND SHARE YOUR THOUGHTS ABOUT THEM</h1>
                <div className='login-register-buttons'>
                    <button 
                        className='btn login'
                        type='button'
                        onClick={handleLoginClick}>
                        LOGIN
                    </button>
                    <button
                        className='btn register'
                        type='button'
                        onClick={handleRegisterClick}>
                        REGISTER
                    </button>
                </div>
        </div>
    </div>
);
}

export default MainPage;
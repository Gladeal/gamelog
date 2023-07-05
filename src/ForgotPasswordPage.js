import { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  //const navigate = useNavigate();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email) {
      setWarningMessage('Please enter your email address');
      return;
    }

    axios.get("http://localhost:3001/data").then((response) => {
      const userExists = response.data.some((res) => {
        console.log(res.userEmail);
        return res.userEmail === email;
      });
  
      if (!userExists) {
        setWarningMessage("This user do not exists");
        return;
      }

      axios.post("http://localhost:3001/forgotpassword", { 
        userEmail: email, 
       }).then(() => {
        setSuccessMessage('A password reset link has been sent to your email address.');
      })
      .catch((error) => {
        alert(error.response.data.message);
        //alert("a");
      });
  });
};

  return ( 
    <div className='forgotpassword-page'>
      <div className='forgotpassword-card'>          
        <h1 className="header">KEEP A LOG OF THE GAMES YOU PLAY AND SHARE YOUR THOUGHTS ABOUT THEM</h1>
          <form onSubmit={handleSubmit}>
            {warningMessage && <div className="warning-message">{warningMessage}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className='form-group form-group-email'>
              <div className='form-input-group'>
                <input
                type="text"
                id="email"
                className='form-input'
                placeholder='Email'
                value={email}
                onChange={handleEmail}
                />
              </div>
            </div>
            <button type="submit" className='btn btn-start'>SEND</button>
          </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
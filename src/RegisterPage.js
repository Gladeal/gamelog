//react-router, axios ve Font Awesome import ediliyor.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './RegisterPage.css';

//RegisterPage fonksiyonu oluşturuluyor ve içerine kodun tüm çalışma mantığı yazılıyor.
function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);  
  const [rememberMe, setRememberMe] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const navigate = useNavigate();


  /*İlgili alanlardaki değerleri değiştirmek için kullanılır.
   Kullanıcı ilgili alanları girdilediğinde, olay yakalanır ve değişkenlere girilen değerler atanır.
  Bu değişken daha sonra kullanıcının girdilerini depolamak için kullanılacaktır.*/
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };


  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

 /*Bu kod parçası bir formun gönderimini işleyen bir fonksiyonu temsil ediyor. İşlevin bir event parametresi alıyor. 
 Kodun amacı, kullanıcının formu doldurduktan sonra sunucuya kaydolmasını sağlamaktır.*/
  const handleSubmit = (event) => {
    event.preventDefault();
  
    if (!password || !username || !email) {
      setWarningMessage("Please fill in all forms");
      return;
    }
  
    axios.get("http://localhost:3001/data").then((response) => {
      const userExists = response.data.some((res) => {
        console.log(res.userPassword);
        return res.userName === username || res.userEmail === email;
      });
  
      if (userExists) {
        setWarningMessage("This user already exists");
        return;
      }
  
      axios.post("http://localhost:3001/register", {
        userName: username,
        userPassword: password,
        userEmail: email,
      }).then(() => {
        alert("Welcome!");
        navigate('/home')
      });
    });
  };

  //sayfanın html yapısı aşağıdaki gibidir
  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="heading">KEEP A LOG OF THE GAMES YOU PLAY AND SHARE YOUR THOUGHTS ABOUT THEM</h1>
          <form onSubmit={handleSubmit}>
            {warningMessage && (
            <div className="warning-message">{warningMessage}</div>
            )}
          <div className="form-group form-group-username">
            <div className="form-input-group">
              <input
                type="text"
                id="username"
                className="form-input"
                placeholder="Username"
                value={username}
                onChange={handleUsername}
              />
            </div>
          </div>
          <div className="form-group form-group-email">
            <div className="form-input-group">
              <input
                type="text"
                id="email"
                className="form-input"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
            </div>
          </div>
          <div className="form-group form-group-password">
            <div className="form-input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-input"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
              <button 
                type="button" 
                className='btn btn-showpassword' 
                onClick={() => setShowPassword(!showPassword)}>
                {showPassword}
                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} style={{ color: '#f1ff4e', fontSize: '1.5rem'}} />
              </button>
            </div>
          </div>   
          <div className="form-group form-group-confirm-password">
            <div className="form-input-group"> 
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="form-input"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                />
                <button 
                  type="button" 
                  className='btn btn-showconfirmpassword' 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showPassword}
                  <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} style={{ color: '#f1ff4e', fontSize: '1.5rem'}} />
                </button>
            </div>
          </div>     
            <div className="form-group form-group-remember-login"> 
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={handleRememberMe}
                className="remember-me-checkbox"
              />
              <label htmlFor="rememberMe" className="form-label-remember">
                REMEMBER ME
              </label>
              <Link to="/login" className="login-link">
                LOG IN
              </Link>
            </div>
          <div className="form-group form-group-submit">
            <button type="submit" className="btn-start" onClick={handleSubmit}>
              START LOGGING!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
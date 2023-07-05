//react-router, axios ve Font Awesome import ediliyor.
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';

//LoginPage fonksiyonu oluşturuluyor ve içerine kodun tüm çalışma mantığı yazılıyor.
function LoginPage() {
  //Kullanıcı adı, parola, parolayı göster, beni hatırla, uyarı mesajı için değişkenler tanımlanıyor.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const navigate = useNavigate();

  /*İlgili alanlardaki değerleri değiştirmek için kullanılır.
   Kullanıcı ilgili alanları girdilediğinde, olay yakalanır ve değişkenlere girilen değerler atanır.
  Bu değişken daha sonra kullanıcının girdilerini depolamak için kullanılacaktır.*/
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleRememberMe = (event) => {
    setRememberMe(event.target.checked);
  };

  /*Axios kütüphanesi kullanarak bir sunucudan veri alınır
  ve kullanıcı adı ve şifre doğruluğunu kontrol edilir. 
  Eğer doğruysa, sunucuya bir POST isteği yaparak kullanıcıyı ana sayfaya yönlendirir. Bu yönlendirmeyi react-router-dom kütüphanesi kullanarak yapar.                          */
  const handleSubmit = (event) => {
    if(!username || !password) {
      setWarningMessage("Please fill in all fields")
      return
    }
    event.preventDefault();

    axios.get("http://localhost:3001/data").then(response => {
      var loginValuesRight = true

      for(const res of response.data){
          console.log(res.userName)
          console.log(res.userName === username)
        if(res.userName !== username || res.userPassword !== password)
          loginValuesRight = false

        else{
          axios.post("http://localhost:3001/login",{
            userName: username,
            userPassword: password

          }).then(alert("Welcome Back!"))
            navigate('/home');
          break
        }
      }
      if(!loginValuesRight) {
        setWarningMessage("Username or password is not correct")
      }
    })
  }

  //sayfanın html yapısı aşağıdaki gibidir
  return (
      <div className="login-page">
        <div className="login-card">
          <h1 className="heading">KEEP A LOG OF THE GAMES YOU PLAY AND SHARE YOUR THOUGHTS ABOUT THEM</h1>
            <form onSubmit={handleSubmit}>
              {warningMessage && (
              <div className="warning-message">{warningMessage}</div>)}
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
            <div className="form-group form-group-password">
              <div className="form-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
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
              <div className="form-group form-group-remember-register">        
                <input
                  type="checkbox"
                  id="remember"
                  className="form-input-checkbox"
                  checked={rememberMe}
                  onChange={handleRememberMe}
                />
                <label htmlFor="remember" className="form-label-remember">
                  REMEMBER ME
                </label>
                <Link to="/register" className="register-link">
                  REGISTER
                </Link>
              </div>
            <button 
              onSubmit={handleSubmit}
              type="submit"
              className="btn btn-start">
              START LOGGING!
            </button>
          </form>
        </div>
      </div>
  );
}

export default LoginPage;











/*const handleSubmit = (event) => {
    event.preventDefault();
    if (!username || !password) {
      setWarningMessage('Please fill in all fields');
      return
    } 
    else {
      axios.post('http://localhost:3001/login', {
      username: username,
      password: password,
    })
      .then((response) => {
        if (response.data.success) {
        console.log(response.data);
        navigate('/main');
        }
        else {
        setWarningMessage('Invalid username or password');
          }
        })  
        .catch((error) => {
        console.log(error);
        setWarningMessage('Something went wrong');
      });
    }
  };


/*const handleSubmit = (event) => {
  event.preventDefault();
  if (!username || !password) {
    alert('Please insert credentials');
    return;
  }
  axios.get('http://localhost:3001/get').then((response) => {
    let correctLogin = false;
    for (const res of response.data) {
      if (res.username === username && res.password === password) {
        correctLogin = true;
        axios.post('http://localhost:3001/login', {
          username: username,
          password: password,
        }).then(() => {
          alert('Hello World');
          navigate('/main');
        });
        break;
      }
    }
    if (!correctLogin) alert('Wrong email or password !');
  });
};
*/

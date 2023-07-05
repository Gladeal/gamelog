//Gerekli importlar yapılır
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ForgotPasswordPage from './ForgotPasswordPage';
import Header from './Navbar';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import RegisterPage from './RegisterPage';
import MainPage from './MainPage';
import GamesPage from './GamesPage';
import UsersPage from './UsersPage'
import ListsPage from './ListsPage';
import GamePage from './GamePage';
import GameReviewPage from './GameReviewPage';

//App fonksiyonunun içinde react-router-dom modülü kullanılarak sayfalara yönlendirme yapılır
function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<MainPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/games' element={<GamesPage/>}/>
        <Route path='/users' element={<UsersPage/>}/>
        <Route path='/lists' element={<ListsPage/>}/>
        <Route path="/games/:id" element={<GamePage/>}/>
        <Route path="/reviews" element={<GameReviewPage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
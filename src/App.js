import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import { AuthProvider } from './lib/contexts/Auth/AuthContext';
import { WsProvider } from './lib/contexts/Ws/WsContext';
import UserInfo from './Components/UserInfo/UserInfo';
import Chat from './Pages/Chat';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WsProvider>
          <div className='App'>
            <Routes>
              <Route path='/' element={<SignIn />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/user' element={<UserInfo />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </WsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

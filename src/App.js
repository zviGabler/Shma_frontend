import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './Components/SignIn/SignIn';
import Login from './Components/Login/Login';
import { AuthProvider } from './lib/contexts/Auth/AuthContext';
import { WsProvider } from './lib/contexts/Ws/WsContext';
import Chat from './Pages/Chat';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <WsProvider>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Login />} />
              <Route path='/login' element={<SignIn />} />
              <Route path='/chat' element={<Chat />} />
            </Routes>
          </div>
        </WsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

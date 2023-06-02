import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn/SignIn";
import { AuthProvider } from "./lib/contexts/Auth/AuthContext";
import { WsProvider } from "./lib/contexts/Ws/WsContext";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <WsProvider>
            <div className="App">
              <Routes>
                <Route path="/login" element={<SignIn />} />
              </Routes>
            </div>
          </WsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

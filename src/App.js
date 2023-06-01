import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn/SignIn";
import { AuthProvider } from "./lib/contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
        <AuthProvider>
          <div className="App">
            <Routes>
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

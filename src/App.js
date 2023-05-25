import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./Components/SignIn/SignIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

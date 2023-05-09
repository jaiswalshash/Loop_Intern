import { BrowserRouter, Route, Routes } from "react-router-dom";

import './App.css';
import SignInPage from './components/SignInPage/SignIn';
import HomePage from './components/HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route exact path="/sign_in" element={<SignInPage />} />
        <Route exact path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>   
  );
}

export default App;

import Login from "./components/Login/Login";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from "./components/Register/Register";

function App() {
  return (
    <>
      {/* <Login /> */}
      <Register></Register>
    </>
  );
}

export default App;

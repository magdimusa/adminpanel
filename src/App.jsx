import { useState } from "react";
import "./styles/App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Router from "./router/Router";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ToastContainer />
      <Router />
    </>
  );
}

export default App;

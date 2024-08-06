import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://login-app-mern.vercel.app/")
      .then(() => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(error);
      });
  }, []);

  return <>
  <h1>{data.status}</h1>
  <h1>{data.message}</h1>

  </>;
}

export default App;

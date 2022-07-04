import { useEffect } from "react";
import "./App.css";
import Search from "./Components/Search/Search";

const tele = window.Telegram.WebApp;

function App() {
  useEffect(() => {
    tele.ready();
  });

  return (
    <>
      <Search />
    </>
  );
}

export default App;

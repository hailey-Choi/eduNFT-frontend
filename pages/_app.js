import "../styles/tailwind.css";
import AppContext from "../components/AppContext";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [wallet, setWallet] = useState(null);

  return (
    <AppContext.Provider value={{ wallet, setWallet }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

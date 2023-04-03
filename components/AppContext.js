import { createContext, useState, useContext, useEffect } from "react";
import Caver from "caver-js";

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;

    setWallet(account);
  }, []);

  return (
    <AppContext.Provider value={{ wallet, setWallet }}>
      {children}
    </AppContext.Provider>
  );
}
export function useAppContext() {
  return useContext(AppContext);
}

import { createContext, useState } from "react";
export const Wallet_Connected_Data = createContext(null);

function Context({ children }) {
  const [walletConnected, setWalletConnected] = useState();

  return (
    <Wallet_Connected_Data.Provider
      value={{ walletConnected, setWalletConnected }}
    >
      {children}
    </Wallet_Connected_Data.Provider>
  );
}

export default Context;

import Head from "next/head";
import { useState, useContext } from "react";
import caver from "../klaytn/caver";
import { Button } from "./Button";
import { Container } from "./Container";
import AppContext from "./AppContext";

export default function Layout({ children }) {
  const [connected, setConnected] = useState(false);

  const context = useContext(AppContext);

  const connectWallet = async () => {
    if (!klaytn.isKaikas) {
      alert("Install Kaikas Browser Extension first");
      return;
    }
    const accounts = await klaytn.enable();
    if (klaytn.networkVersion === 8217) {
      // User is connected to mainnet
    } else if (klaytn.networkVersion === 1001) {
      // User is connected to testnet
    } else {
      // User is not connected to klaytn
      alert("ERROR: Failed to connect to Klaytn network!");
      return;
    }

    if (accounts) {
      context.setWallet(accounts[0]);
      setConnected(true);
    }
  };

  const disconnectWallet = async () => {
    context.setWallet(null);
    setConnected(false);
  };

  return (
    <>
      <Head>
        <title>EduNFT</title>
      </Head>
      <header className="relative z-50 pb-11 lg:pt-11">
        <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
          <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
            <h1
              id="speakers-title"
              className="font-bold text-5xl tracking-tighter  sm:text-5xl"
            >
              EduNFT
            </h1>
          </div>
          <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
            <div className="mx-auto flex items-center gap-4 px-4">
              <p>The ultimate educational platform for AI and Blockchain</p>
            </div>
          </div>
          <div>
            <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
              <Button
                onClick={connected ? disconnectWallet : connectWallet}
                href="#"
              >
                {connected ? "Disconnect Wallet" : "Connect Wallet"}
              </Button>
            </div>
            {context.wallet ? (
              <div> Address : {context.wallet.slice(0, 12)} ...</div>
            ) : (
              <></>
            )}
          </div>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}

import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import Caver from "caver-js";
import { Button } from "./Button";
import { Container } from "./Container";
import { Modal } from "./modal";
import Link from "next/link";

export default function Layout({ children }) {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const provider = window["klaytn"];
    const account = provider.selectedAddress;
    if (account) {
      setConnected(true);
      setAddress(account);
    }
  }, []);

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

    console.log("accounts: ", accounts);
    if (accounts) {
      setConnected(true);
      setAddress(accounts[0]);
    }
  };

  const disconnectWallet = async () => {
    setConnected(false);
    setAddress(null);
  };

  return (
    <>
      <Head>
        <title>EduNFT</title>
      </Head>
      <header className="relative z-50 pb-11 lg:pt-11">
        <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
          <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
            <Link
              href={{
                pathname: "/",
              }}
            >
              <h1
                id="speakers-title"
                className="font-bold text-5xl tracking-tighter  sm:text-5xl"
              >
                EduNFT
              </h1>
            </Link>
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
              <button
                type="button"
                className="rounded-full bg-blue-700 h-6 w-6 my-auto mx-2 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                onClick={() => setOpenModal(true)}
              >
                <QuestionMarkCircleIcon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            {address ? <div> Address : {address.slice(0, 12)} ...</div> : <></>}
          </div>
        </Container>
      </header>
      {openModal ? (
        <Modal
          title={"How to connect wallet"}
          type={"connectWalletInfo"}
          handleClose={() => handleCloseModal()}
        />
      ) : (
        <></>
      )}
      <main>{children}</main>
    </>
  );
}

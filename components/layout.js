import Head from "next/head";
import { useState, useContext, useEffect } from "react";
import {
  QuestionMarkCircleIcon,
  WalletIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import Caver from "caver-js";
import { Button } from "./Button";
import { Container } from "./Container";
import { Modal } from "./modal";
import Link from "next/link";
import { useAppContext } from "../components/AppContext";

// TODO: connect 눌러야만 커넥트하기 (자동말고)

export default function Layout({ children }) {
  const [openModal, setOpenModal] = useState(false);
  const walletContext = useAppContext();

  const handleCloseModal = () => {
    setOpenModal(false);
    connectWallet();
  };

  useEffect(() => {
    const provider = window["klaytn"];
    const account = provider.selectedAddress;
    if (account) {
      walletContext.setWallet(account);
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
      walletContext.setWallet(accounts[0]);
    }
  };

  const disconnectWallet = async () => {
    walletContext.setWallet(null);
  };

  return (
    <>
      <Head>
        <title>EduNFT</title>
      </Head>
      <header className="relative z-50 pb-11 lg:pt-11">
        <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrapxw">
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
                <Button
                  onClick={
                    walletContext.wallet
                      ? disconnectWallet
                      : () => {
                          setOpenModal(true);
                        }
                  }
                  href="#"
                >
                  <WalletIcon className="h-6 w-6 mr-2" />
                  {walletContext.wallet
                    ? "Disconnect Wallet"
                    : "Connect Wallet"}
                </Button>
              </div>
              <div>
                {walletContext.wallet ? (
                  <div> Address : {walletContext.wallet.slice(0, 12)} ...</div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <Button href="/collection">
                <Squares2X2Icon className="h-6 w-6 mr-2" />
                NFT gallery
              </Button>
            </div>
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

import Head from "next/head";
import caver from "../klaytn/caver";

import { Button } from "./Button";
import { Container } from "./Container";
export default function Layout({ children, home }) {
  /**
   * getWallet method get wallet instance from caver.
   */
  const getWallet = () => {
    console.log("caverjs wallet: ", caver.klay.accounts.wallet);
    if (caver.klay.accounts.wallet.length) {
      return caver.klay.accounts.wallet[0];
    }
  };

  const removeWallet = () => {
    caver.klay.accounts.wallet.clear();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("walletInstance");
    }
    // this.reset();
  };

  const integrateWallet = () => {
    const walletInstance = caver.klay.accounts.privateKeyToAccount(
      "0x8e8cdef22e454cc4ef62d5f99ec87cf5dd4b24445eddf96331c2ba898b9430ef"
    );
    caver.klay.accounts.wallet.add(walletInstance);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("walletInstance", JSON.stringify(walletInstance));
    }
    // this.reset();
  };

  removeWallet();
  integrateWallet();
  getWallet();

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
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <Button href="#">Connect Wallet</Button>
          </div>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}

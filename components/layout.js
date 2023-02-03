import Head from "next/head";
import caver from "../klaytn/caver";
import { useState } from "react";
import { Button } from "./Button";
import { Container } from "./Container";

// Kaikas baobab test private key: 0x8e8cdef22e454cc4ef62d5f99ec87cf5dd4b24445eddf96331c2ba898b9430ef

export default function Layout({ children, home }) {
  const [showModal, setShowModal] = useState(false);
  const [privateKey, setPrivateKey] = useState(null);
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

  const integrateWallet = (privateKey) => {
    const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey);
    caver.klay.accounts.wallet.add(walletInstance);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("walletInstance", JSON.stringify(walletInstance));
    }
    // this.reset();
  };

  const handleConnect = () => {
    removeWallet();
    integrateWallet(privateKey);
    setShowModal(false);
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
                href="#"
                onClick={() =>
                  caver.klay.accounts.wallet.length
                    ? removeWallet()
                    : setShowModal(true)
                }
              >
                {caver.klay.accounts.wallet.length
                  ? "Disconnect Wallet"
                  : "Connect Wallet"}
              </Button>
            </div>
            {caver.klay.accounts.wallet.length ? (
              <div className="text-xs">
                {caver.klay.accounts.wallet[0].address}
              </div>
            ) : (
              <></>
            )}
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-4xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                      <h3 className="text-2xl font-semibold">
                        Connect your Kaikas wallet
                      </h3>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto my-4 text-slate-500 text-lg leading-relaxed">
                      <div>
                        <form className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                          <div>
                            <label className="block text-sm font-medium text-gray-700">
                              Enter your private key
                            </label>
                            <div className="mt-1">
                              <input
                                id="name"
                                name="name"
                                type="text"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                defaultValue={""}
                                onChange={(e) => {
                                  setPrivateKey(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setShowModal(false);
                          setPrivateKey(null);
                        }}
                      >
                        Close
                      </button>
                      <Button
                        className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={() => {
                          handleConnect();
                        }}
                        href="/collection"
                      >
                        Connect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}

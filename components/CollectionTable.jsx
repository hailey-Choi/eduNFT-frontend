import { Button } from "./Button";
import Caver from "caver-js";
import { contractABI, contractAddress } from "../klaytn/contract";
import { useState, useEffect } from "react";

const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";
const tabs = ["My EduNFTs", "My EduNFTs on Listing", "All EduNFTs"];

export default function CollectionTable({ metadata, selectedTab }) {
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const provider = window["klaytn"];
    const account = provider.selectedAddress;
    setAccount(account);
    console.log(account);
  }, []);

  const handleClick = (data) => {
    if (selectedTab === tabs[0]) {
      listNFT(data);
    }
  };

  const listNFT = async (data) => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;
    const myContract = new caver.klay.Contract(contractABI, contractAddress);

    try {
      const gasAmount = await myContract.methods
        .listNFT(data.tokenId, 3)
        .estimateGas({
          from: account,
          gas: 6000000,
        });
      const result = await myContract.methods.listNFT(data.tokenId, 3).send({
        from: account,
        gas: gasAmount,
      });
      if (result != null) {
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      alert("Listing Failed!");
    }
  };

  return (
    <div className="bg-white mb-6">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <p className="mt-6 text-lg text-gray-600 font-semibold">
          {selectedTab === tabs[0]
            ? "EduNFTs owned by you"
            : selectedTab === tabs[1]
            ? "My EduNFTs on Listing"
            : "All NFTs in EduNFT Collection"}
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {metadata ? (
          metadata.map((data, i) => (
            <li key={i}>
              <img
                className="w-full rounded-2xl object-cover"
                src={pinataEndpoint + data.image_url.slice(7)}
                alt="new"
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-blue-700">
                {data.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">
                {data.description}
              </p>
              <div className="flex flex-wrap  items-center justify-center sm:justify-between lg:flex-nowrap mr-4">
                <Button
                  className={
                    (selectedTab === tabs[0] && data.currentlyListed == true) ||
                    (selectedTab === tabs[2] &&
                      data.seller.toUpperCase() == account.toUpperCase())
                      ? "p-3 text-xs mt-2 bg-gray-400 hover:bg-gray-400 active:text-white"
                      : "p-3 text-xs mt-2 "
                  }
                  onClick={() => handleClick(data)}
                  disabled={
                    (selectedTab === tabs[0] && data.currentlyListed == true) ||
                    (selectedTab === tabs[2] &&
                      data.seller.toUpperCase() == account.toUpperCase())
                  }
                >
                  {selectedTab === tabs[0] && data.currentlyListed == false
                    ? "List for sale"
                    : selectedTab === tabs[0] && data.currentlyListed == true
                    ? "On Listing"
                    : selectedTab === tabs[1]
                    ? "Cancel Listing"
                    : "Buy now"}
                </Button>
                {data.currentlyListed == true ? (
                  <p className="leading-7 text-md font-semibold ">
                    {data.price} KLAY
                  </p>
                ) : (
                  <></>
                )}
              </div>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

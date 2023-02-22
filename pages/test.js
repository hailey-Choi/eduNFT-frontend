import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../klaytn/contract";
import Caver from "caver-js";
import CollectionView from "../components/CollectionView";
import { ProgressBar } from "react-loader-spinner";

const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";
export default function Test() {
  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;
    const myContract = new caver.klay.Contract(contractABI, contractAddress);

    const test = async () => {
      await myContract.methods
        .getMyNFTs(account)
        .call()
        .then(function (result) {
          return result;
        })
        .catch(function (error) {
          console.log(error);
        });

      const getUserNFTs = async () => {
        const tokens = await myContract.methods
          .getMyNFTs(account)
          .call()
          .then(function (result) {
            return result;
          })
          .catch(function (error) {
            console.log(error);
          });
        await tokens.map((token) => {
          console.log("Token: ", token);
          try {
            const url = fetch(pinataEndpoint + token.tokenURI.slice(7))
              .then((response) => response.json())
              .then((metadata) => {
                // setUserTokenImageURIs((arr) => [
                //   ...arr,
                //   pinataEndpoint + metadata.image_url.slice(7),
                // ]);
                console.log("data: ", metadata);
              });
          } catch (e) {
            console.log(e);
          }
        });
        // .catch((error) => {
        //   console.log(error);
        // });
      };

      // try {
      //   const gasAmount = await myContract.methods
      //     .listNFT("4", "20")
      //     .estimateGas({
      //       from: account,
      //       gas: 6000000,
      //     });
      //   const result = await myContract.methods.listNFT("4", "20").send({
      //     from: account,
      //     gas: gasAmount,
      //   });
      //   if (result != null) {
      //     console.log(result);
      //     alert("Minting Success!");
      //   }
      // } catch (error) {
      //   console.log(error);
      //   alert("Minting Failed!");
      // }

      getUserNFTs();
    };

    test();
  }, []);
}

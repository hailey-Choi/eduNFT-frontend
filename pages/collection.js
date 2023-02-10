import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../klaytn/contract";
import Caver from "caver-js";

export default function Collection() {
  const [userTokenURIs, setUserTokenURIs] = useState();
  const [allTokenURIs, setAllTokenURIs] = useState();

  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;
    const myContract = new caver.klay.Contract(contractABI, contractAddress);
    const userTokenURIs = [];
    const allTokenURIs = [];

    if (account) {
      const getUserNFTs = async () => {
        const tokenIDs = await myContract.methods
          .tokensOfOwner(account)
          .call()
          .then(function (result) {
            return result;
          })
          .catch(function (error) {
            console.log(error);
          });

        await tokenIDs.map((tokenID) => {
          myContract.methods
            .tokenURI(tokenID)
            .call()
            .then(function (result) {
              userTokenURIs.push(result);
            })
            .catch(function (error) {
              console.log(error);
            });
        });

        setUserTokenURIs(userTokenURIs);
      };

      const getAllNFTs = async () => {
        const totalSupply = await myContract.methods
          .totalSupply()
          .call()
          .then(function (result) {
            return result;
          })
          .catch(function (error) {
            console.log(error);
          });

        for (let i = 1; i < parseInt(totalSupply) + 1; i++) {
          myContract.methods
            .tokenURI(i.toString())
            .call()
            .then(function (result) {
              allTokenURIs.push(result);
            })
            .catch(function (error) {
              console.log(error);
            });
        }

        setAllTokenURIs(allTokenURIs);
      };

      getUserNFTs();
      getAllNFTs();
    } else {
      alert("Please Connect Wallet First!");
    }
  }, []);

  console.log("UserTokenURIs: ", userTokenURIs);
  console.log("allTokenURIs: ", allTokenURIs);

  return (
    <Layout>
      <Container>
        <p>Show Collections Here</p>
      </Container>
    </Layout>
  );
}

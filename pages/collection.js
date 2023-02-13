import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../klaytn/contract";
import Caver from "caver-js";
import CollectionView from "../components/CollectionView";
import { ProgressBar } from "react-loader-spinner";

export default function Collection() {
  const [userTokenImageURIs, setUserTokenImageURIs] = useState([]);
  const [allTokenImageURIs, setAllTokenImageURIs] = useState([]);
  const [loading, setLoading] = useState(false);
  const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";

  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;
    const myContract = new caver.klay.Contract(contractABI, contractAddress);
    setUserTokenImageURIs([]);
    setAllTokenImageURIs([]);

    if (account) {
      const getUserNFTs = async () => {
        setLoading(true);
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
            .then((res) => {
              try {
                const url = fetch(pinataEndpoint + res.slice(7))
                  .then((response) => response.json())
                  .then((metadata) => {
                    setUserTokenImageURIs((arr) => [
                      ...arr,
                      pinataEndpoint + metadata.image_url.slice(7),
                    ]);
                  });
              } catch (e) {
                console.log(e);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        });

        await setLoading(false);
      };

      const getAllNFTs = async () => {
        setLoading(true);
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
            .then((res) => {
              try {
                const url = fetch(pinataEndpoint + res.slice(7))
                  .then((response) => response.json())
                  .then((metadata) => {
                    setAllTokenImageURIs((arr) => [
                      ...arr,
                      pinataEndpoint + metadata.image_url.slice(7),
                    ]);
                  });
              } catch (e) {
                console.log(e);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
        await setLoading(false);
      };

      getUserNFTs();
      getAllNFTs();
    } else {
      alert("Connect wallet first!");
    }
  }, []);

  console.log("UserTokenURIs: ", userTokenImageURIs);
  console.log("allTokenURIs: ", allTokenImageURIs);

  return (
    <Layout>
      <Container className="border">
        {loading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        ) : (
          <CollectionView
            userImages={userTokenImageURIs}
            allImages={allTokenImageURIs}
          />
        )}
      </Container>
    </Layout>
  );
}

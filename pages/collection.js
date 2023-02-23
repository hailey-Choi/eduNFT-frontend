import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useEffect, useState } from "react";
import { contractABI, contractAddress } from "../klaytn/contract";
import Caver from "caver-js";
import CollectionView from "../components/CollectionView";
import { ProgressBar } from "react-loader-spinner";
const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";

export default function Collection() {
  const [userTokenMetadata, setUserTokenMetadata] = useState([]);
  const [userListedTokenMetadata, setUserListedTokenMetadata] = useState([]);
  const [allTokenMetadata, setAllTokenMetadata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const account = provider.selectedAddress;
    const myContract = new caver.klay.Contract(contractABI, contractAddress);
    setUserTokenMetadata([]);
    setAllTokenMetadata([]);

    if (account) {
      const getUserNFTs = async () => {
        setLoading(true);
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
          try {
            fetch(pinataEndpoint + token.tokenURI.slice(7), {
              headers: {
                Accept: "text/plain",
              },
            })
              .then((response) => response.json())
              .then((metadata) => {
                metadata.currentlyListed = token.currentlyListed;
                metadata.owner = token.owner;
                metadata.price = token.price;
                metadata.seller = token.seller;
                metadata.tokenId = token.tokenId;
                metadata.tokenURI = token.tokenURI;
                setUserTokenMetadata((arr) => [...arr, metadata]);
              });
          } catch (e) {
            console.log(e);
          }
        });
        await setLoading(false);
      };

      const getUserListedNFTs = async () => {
        setLoading(true);
        const tokens = await myContract.methods
          .getMyListedNFTs(account)
          .call()
          .then(function (result) {
            return result;
          })
          .catch(function (error) {
            console.log(error);
          });
        await tokens.map((token) => {
          try {
            fetch(pinataEndpoint + token.tokenURI.slice(7), {
              headers: {
                Accept: "text/plain",
              },
            })
              .then((response) => response.json())
              .then((metadata) => {
                metadata.currentlyListed = token.currentlyListed;
                metadata.owner = token.owner;
                metadata.price = token.price;
                metadata.seller = token.seller;
                metadata.tokenId = token.tokenId;
                metadata.tokenURI = token.tokenURI;
                setUserListedTokenMetadata((arr) => [...arr, metadata]);
              });
          } catch (e) {
            console.log(e);
          }
        });
        await setLoading(false);
      };

      const getAllNFTs = async () => {
        setLoading(true);
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
          try {
            fetch(pinataEndpoint + token.tokenURI.slice(7), {
              headers: {
                Accept: "text/plain",
              },
            })
              .then((response) => response.json())
              .then((metadata) => {
                metadata.currentlyListed = token.currentlyListed;
                metadata.owner = token.owner;
                metadata.price = token.price;
                metadata.seller = token.seller;
                metadata.tokenId = token.tokenId;
                metadata.tokenURI = token.tokenURI;
                setAllTokenMetadata((arr) => [...arr, metadata]);
              });
          } catch (e) {
            console.log(e);
          }
        });
        await setLoading(false);
      };

      getUserNFTs();
      getUserListedNFTs();
      getAllNFTs();
    } else {
      alert("Connect wallet first!");
    }
  }, []);

  console.log("UserTokenMetadata", userTokenMetadata);
  console.log("UserListedTokenMetadata: ", userListedTokenMetadata);
  console.log("AllTokenMetadata", allTokenMetadata);

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
            userMetadata={userTokenMetadata}
            userListedMetadata={userListedTokenMetadata}
            allMetadata={allTokenMetadata}
          />
        )}
      </Container>
    </Layout>
  );
}

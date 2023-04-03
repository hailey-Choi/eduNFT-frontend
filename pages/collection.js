import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useEffect, useState, useContext } from "react";
import { contractABI, contractAddress } from "../klaytn/contract";
import Caver from "caver-js";
import CollectionView from "../components/CollectionView";
import { ProgressBar } from "react-loader-spinner";
import { useAppContext } from "../components/AppContext";
const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";

/**
 * TODO: 민팅하고 나서 콜렉션 페이지에 이미지 바로 로딩안됌 (i think metadata loading issue)
 *  사진 보일때까지 설명이나 로딩중 추가하기
 * TODO: fix cors error for fetching (randomly happening)
 * TODO: Account Disconnect 했을때 nft안보이게하기 (refresh?)
 * TODO: 갤러리 창 만들기
 * TODO: deploy 해보기
 */

export default function Collection() {
  const [userTokenMetadata, setUserTokenMetadata] = useState([]);
  const [userListedTokenMetadata, setUserListedTokenMetadata] = useState([]);
  const [allTokenMetadata, setAllTokenMetadata] = useState([]);
  const [allListedTokenMetadata, setAllListedTokenMetadata] = useState([]);
  const [loading, setLoading] = useState(false);

  const myContext = useAppContext();
  console.log("context wallet: ", myContext.wallet);

  useEffect(() => {
    const provider = window["klaytn"];
    const caver = new Caver(provider);
    const myContract = new caver.klay.Contract(contractABI, contractAddress);
    setUserTokenMetadata([]);
    setUserListedTokenMetadata([]);
    setAllTokenMetadata([]);
    setAllListedTokenMetadata([]);

    if (myContext.wallet) {
      const getNFTs = async (tab) => {
        setLoading(true);
        const tokens =
          tab == "user"
            ? await myContract.methods
                .getMyNFTs(myContext.wallet)
                .call()
                .then(function (result) {
                  return result;
                })
                .catch(function (error) {
                  console.log(error);
                })
            : tab == "userListed"
            ? await myContract.methods
                .getMyListedNFTs(myContext.wallet)
                .call()
                .then(function (result) {
                  return result;
                })
                .catch(function (error) {
                  console.log(error);
                })
            : tab == "all"
            ? await myContract.methods
                .getAllNFTs()
                .call()
                .then(function (result) {
                  return result;
                })
                .catch(function (error) {
                  console.log(error);
                })
            : tab == "allListed"
            ? await myContract.methods
                .getAllListedNFTs()
                .call()
                .then(function (result) {
                  return result;
                })
                .catch(function (error) {
                  console.log(error);
                })
            : {};
        await tokens.map((token) => {
          try {
            fetch(pinataEndpoint + token.tokenURI.slice(7), {
              // mode: "no-cors",
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
                if (tab == "user") {
                  setUserTokenMetadata((arr) => [...arr, metadata]);
                }
                if (tab == "userListed") {
                  setUserListedTokenMetadata((arr) => [...arr, metadata]);
                }
                if (tab == "all") {
                  setAllTokenMetadata((arr) => [...arr, metadata]);
                }
                if (tab == "allListed") {
                  setAllListedTokenMetadata((arr) => [...arr, metadata]);
                }
              });
          } catch (e) {
            console.log(e);
          }
        });
        await setLoading(false);
      };

      getNFTs("user");
      getNFTs("userListed");
      getNFTs("all");
      getNFTs("allListed");
    }
  }, [myContext.wallet]);

  // console.log("UserTokenMetadata", userTokenMetadata);
  // console.log("UserListedTokenMetadata: ", userListedTokenMetadata);
  // console.log("AllTokenMetadata", allTokenMetadata);
  // console.log("AllListedMetadat: ", allListedTokenMetadata);

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
            allListedMetadata={allListedTokenMetadata}
            wallet={myContext.wallet}
          />
        )}
      </Container>
    </Layout>
  );
}

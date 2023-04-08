import { Button } from './Button'
import Caver from 'caver-js'
import { contractABI, contractAddress } from '../klaytn/contract'
import { useState, useEffect, useRef } from 'react'
import { Modal } from './modal'

const pinataEndpoint = 'https://gateway.pinata.cloud/ipfs/'
// TODO: img tag src 로는 코스 안되나
const tabs = [
    'My EduNFTs',
    'My EduNFTs on Listing',
    'All EduNFTs',
    'All EduNFTs on Listing',
]

export default function CollectionTable({ metadata, selectedTab }) {
    const [account, setAccount] = useState(null)
    const [nftListing, setNftListing] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null)
    const [tokenId, setTokenId] = useState(null)
    const [price, setPrice] = useState(null)
    const [seller, setSeller] = useState(null)
    const [currentlyListed, setCurrentlyListed] = useState(null)
    const inputRef = useRef(null)

    useEffect(() => {
        const provider = window['klaytn']
        const account = provider.selectedAddress
        setAccount(account)
    }, [])

    const handleClick = (data) => {
        setTokenId(data.tokenId)
        setPrice(data.price)
        setSeller(data.seller)
        setCurrentlyListed(data.currentlyListed)
        // List for sale clicked, enable users to set the price
        if (selectedTab === tabs[0] && data.currentlyListed == false) {
            setNftListing(data.tokenId)
        }
        // cancel list or buy nft clicked
        else {
            setShowModal(true)
        }
    }

    const handleListConfirm = (data) => {
        setShowModal(true)
    }

    const handleAnswerSubmit = () => {
        if (isCorrectAnswer == true) {
            if (selectedTab === tabs[1]) {
                unlistNFT(tokenId)
            } else if (selectedTab === tabs[0] && currentlyListed == false) {
                listNFT(tokenId, inputRef.current.value)
            } else if (
                !(
                    (selectedTab === tabs[0] && currentlyListed == true) ||
                    (selectedTab === tabs[2] &&
                        seller.toUpperCase() == account.toUpperCase()) ||
                    (selectedTab === tabs[3] &&
                        seller.toUpperCase() == account.toUpperCase())
                )
            ) {
                purchaseNFT(tokenId, price)
            }
            setShowModal(false)
        } else if (isCorrectAnswer == false && isCorrectAnswer != null) {
            alert('Try again!')
        }
    }

    const handleModalClose = () => {
        setShowModal(false)
    }

    console.log('iscorrect: ', isCorrectAnswer)

    const listNFT = async (tokenId, price) => {
        const provider = window['klaytn']
        const caver = new Caver(provider)
        const account = provider.selectedAddress
        const myContract = new caver.klay.Contract(contractABI, contractAddress)

        try {
            const gasAmount = await myContract.methods
                .listNFT(tokenId, price)
                .estimateGas({
                    from: account,
                    gas: 6000000,
                })
            const result = await myContract.methods
                .listNFT(tokenId, price)
                .send({
                    from: account,
                    gas: gasAmount,
                })
            if (result != null) {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
            alert('Listing Failed!')
        }

        setNftListing(null)
        window.location.reload(true)
    }

    const unlistNFT = async (tokenId) => {
        const provider = window['klaytn']
        const caver = new Caver(provider)
        const account = provider.selectedAddress
        const myContract = new caver.klay.Contract(contractABI, contractAddress)
        try {
            const gasAmount = await myContract.methods
                .unlistNFT(tokenId)
                .estimateGas({
                    from: account,
                    gas: 6000000,
                })
            const result = await myContract.methods.unlistNFT(tokenId).send({
                from: account,
                gas: gasAmount,
            })
            if (result != null) {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
            alert('Cancle Listing Failed!')
        }
        window.location.reload(true)
    }

    const purchaseNFT = async (tokenId, price) => {
        const provider = window['klaytn']
        const caver = new Caver(provider)
        const account = provider.selectedAddress
        const myContract = new caver.klay.Contract(contractABI, contractAddress)
        try {
            const gasAmount = await myContract.methods
                .purchaseNFT(tokenId)
                .estimateGas({
                    from: account,
                    value: caver.utils.convertToPeb(price.toString(), 'KLAY'),
                    gas: 6000000,
                })
            const result = await myContract.methods.purchaseNFT(tokenId).send({
                from: account,
                value: caver.utils.convertToPeb(price.toString(), 'KLAY'),
                gas: gasAmount,
            })
            if (result != null) {
                console.log(result)
            }
        } catch (error) {
            console.log(error)
            alert('Purchase Failed!')
        }
        window.location.reload(true)
    }

    return (
        <div className="bg-white mb-6">
            <div className="mx-auto max-w-2xl lg:mx-0">
                <p className="mt-6 text-lg text-gray-600 font-semibold">
                    {selectedTab === tabs[0]
                        ? 'EduNFTs owned by you'
                        : selectedTab === tabs[1]
                        ? 'My EduNFTs on Listing'
                        : 'All NFTs in EduNFT Collection'}
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

                            {nftListing == data.tokenId ? (
                                <div className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap space-x-2 mt-3">
                                    <div className="relative mt-1 rounded-md shadow-sm">
                                        <input
                                            type="text"
                                            name="price"
                                            id="price"
                                            className="block w-full rounded-md border-gray-300 pr-5 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="0"
                                            aria-describedby="price-currency"
                                            ref={inputRef}
                                        />
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                                            <span
                                                className="text-gray-500 sm:text-sm"
                                                id="price-currency"
                                            >
                                                KLAY
                                            </span>
                                        </div>
                                    </div>

                                    <Button
                                        className="text-xs mt-2 ml-2 px-5"
                                        onClick={() => handleListConfirm(data)}
                                    >
                                        Confirm
                                    </Button>

                                    <Button
                                        className={'p-3 text-xs'}
                                        onClick={() => setNftListing(null)}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            ) : (
                                <div className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap mr-3 mt-3">
                                    <Button
                                        className={
                                            (selectedTab === tabs[0] &&
                                                data.currentlyListed == true) ||
                                            (selectedTab === tabs[2] &&
                                                data.seller.toUpperCase() ==
                                                    account.toUpperCase()) ||
                                            (selectedTab === tabs[2] &&
                                                data.currentlyListed ==
                                                    false) ||
                                            (selectedTab === tabs[3] &&
                                                data.seller.toUpperCase() ==
                                                    account.toUpperCase())
                                                ? 'p-3 text-xs mt-2 bg-gray-500 hover:bg-gray-500 active:text-white'
                                                : 'p-3 text-xs mt-2'
                                        }
                                        onClick={() => handleClick(data)}
                                        disabled={
                                            (selectedTab === tabs[0] &&
                                                data.currentlyListed == true) ||
                                            (selectedTab === tabs[2] &&
                                                data.seller.toUpperCase() ==
                                                    account.toUpperCase()) ||
                                            (selectedTab === tabs[2] &&
                                                data.currentlyListed ==
                                                    false) ||
                                            (selectedTab === tabs[3] &&
                                                data.seller.toUpperCase() ==
                                                    account.toUpperCase())
                                        }
                                    >
                                        {selectedTab === tabs[0] &&
                                        data.currentlyListed == false
                                            ? 'List for sale'
                                            : selectedTab === tabs[0] &&
                                              data.currentlyListed == true
                                            ? 'On Listing'
                                            : selectedTab === tabs[1]
                                            ? 'Cancel Listing'
                                            : (selectedTab === tabs[2] &&
                                                  data.seller.toUpperCase() ==
                                                      account.toUpperCase()) ||
                                              (selectedTab === tabs[3] &&
                                                  data.seller.toUpperCase() ==
                                                      account.toUpperCase())
                                            ? 'Owned'
                                            : 'Buy now'}
                                    </Button>
                                    {data.currentlyListed == true ? (
                                        <p className="leading-7 text-md font-semibold ">
                                            {data.price} KLAY
                                        </p>
                                    ) : (
                                        <p className="leading-7 text-md font-semibold text-gray-500">
                                            Not listed
                                        </p>
                                    )}
                                </div>
                            )}
                            {showModal ? (
                                <Modal
                                    title="Before processing your request..."
                                    type="quiz"
                                    setIsCorrectAnswer={setIsCorrectAnswer}
                                    handleUnderstood={handleAnswerSubmit}
                                    handleClose={handleModalClose}
                                />
                            ) : (
                                <></>
                            )}
                        </li>
                    ))
                ) : (
                    <></>
                )}
            </ul>
        </div>
    )
}

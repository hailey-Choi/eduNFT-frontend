import Layout from '../components/layout'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { ProgressBar, ColorRing } from 'react-loader-spinner'
import { Container } from '../components/Container'
import { useRouter } from 'next/router'
import { Button } from '../components/Button'
import Caver from 'caver-js'
import { contractABI, contractAddress } from '../klaytn/contract'
import Quiz from '../components/Quiz'
import { AIEduContents } from '../components/AIEduContents'
import { NFTEduContents } from '../components/NFTEduContents'

// TODO : Minting button loading 중일때 disable 하기 (안하면 누른만큼 민팅됌)

export default function DallE() {
    const router = useRouter()
    const data = router.query
    const [images, setImages] = useState(null)
    const [selectedImageUrl, setSelectedImageUrl] = useState(null)
    const [nftName, setNftName] = useState(null)
    const [nftDesc, setNftDesc] = useState(null)
    const [dallELoading, setDallELoading] = useState(false)
    const [mintLoading, setMintLoading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(false)
    const [quizPassed, setQuizPassed] = useState(false)

    useEffect(() => {
        window.scrollTo(0, 0)
        const fetchData = async () => {
            setDallELoading(true)
            try {
                const response = await axios.post(
                    'https://f5omod4tyb.execute-api.ap-northeast-2.amazonaws.com/v1/api/dall-e',
                    {
                        description: data.keyword,
                        numbers: 1,
                    },
                )
                setImages(response.data.data)
            } catch (e) {
                console.log(e)
            }
            setDallELoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [quizPassed])

    const uploadToIpfs = async () => {
        try {
            const response = await axios.post(
                'https://f5omod4tyb.execute-api.ap-northeast-2.amazonaws.com/v1/api/ipfs/metadata',
                {
                    image_url: selectedImageUrl,
                    name: nftName,
                    description: nftDesc,
                },
            )
            return response.data.metadata
        } catch (e) {
            console.log(e)
        }
    }

    const mint = async () => {
        const provider = window['klaytn']
        const caver = new Caver(provider)
        const account = provider.selectedAddress
        const myContract = new caver.klay.Contract(contractABI, contractAddress)

        if (!account) {
            alert('Please Connect Your Wallet First!')
        } else {
            setMintLoading(true)
            const tokenURI = await uploadToIpfs()
            try {
                const gasAmount = await myContract.methods
                    .mintNFT(tokenURI)
                    .estimateGas({
                        from: account,
                        gas: 6000000,
                    })
                const result = await myContract.methods.mintNFT(tokenURI).send({
                    from: account,
                    gas: gasAmount,
                })
                if (result != null) {
                    console.log(result)
                    router.push('/collection')
                }
            } catch (error) {
                console.log(error)
                alert('Minting Failed!')
            }
            setMintLoading(false)
        }
    }

    const handleClose = () => {
        setShowModal(false)
    }

    const handleMint = async () => {
        if (isCorrectAnswer) {
            mint()
            handleClose()
        } else {
            alert('Try again!')
        }
    }

    const handleSelectAnswer = (isCorrect) => {
        setIsCorrectAnswer(isCorrect)
    }

    return (
        <Layout>
            <div>
                <Container>
                    {quizPassed ? (
                        <></>
                    ) : (
                        <div className="mx-auto mt-5 mb-10">
                            <h2
                                id="speakers-title"
                                className=" text-4xl font-bold text-blue-600 text-center"
                            >
                                Dall-E Image Generation
                            </h2>
                        </div>
                    )}
                    <div>
                        {mintLoading ? (
                            <div className="grid place-items-center mt-20">
                                <ProgressBar
                                    height="80"
                                    width="80"
                                    ariaLabel="progress-bar-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="progress-bar-wrapper"
                                    borderColor="#F4442E"
                                    barColor="#51E5FF"
                                />
                                Minting your NFT...
                            </div>
                        ) : !quizPassed ? (
                            <div>
                                <AIEduContents />
                                <Quiz
                                    onClick={handleSelectAnswer}
                                    questionType="ai"
                                />
                                <div className="flex mb-10">
                                    <Button
                                        onClick={() => {
                                            isCorrectAnswer
                                                ? setQuizPassed(true)
                                                : alert('Try again!')
                                            setIsCorrectAnswer(false)
                                        }}
                                        className={
                                            dallELoading
                                                ? ' bg-gray-400 hover:bg-gray-400 active:text-white'
                                                : ''
                                        }
                                    >
                                        Submit
                                    </Button>
                                    {dallELoading ? (
                                        <ColorRing
                                            visible={true}
                                            height="40"
                                            width="80"
                                            ariaLabel="blocks-loading"
                                            wrapperStyle={{}}
                                            wrapperClass="blocks-wrapper"
                                            colors={['blue']}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                    <p className="my-auto ml-2 text-gray-500">
                                        {dallELoading
                                            ? 'Generating Dall-E Images...'
                                            : 'All set! Submit the answer to see the generated images.'}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div>
                                    <NFTEduContents />
                                    <hr
                                        style={{
                                            border: '1px solid #64748b',
                                            margin: '10px 0',
                                        }}
                                    />
                                    <p className="mt-4 text-xl tracking-tight text-blue-900">
                                        Choose one from the images generated
                                        below!
                                    </p>
                                    <div className="mt-6 grid grid-cols-2 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                                        {images != null ? (
                                            images.map((image, i) => (
                                                <div
                                                    key={i}
                                                    className="group relative"
                                                >
                                                    <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 mb-4">
                                                        <img
                                                            src={image.url}
                                                            alt="new"
                                                            onClick={() => {
                                                                setShowModal(
                                                                    true,
                                                                )
                                                                setSelectedImageUrl(
                                                                    image.url,
                                                                )
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                                {showModal ? (
                                    <>
                                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                            <div className="relative w-auto my-6 mx-auto max-w-4xl ">
                                                {/*content*/}
                                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full mt-56 bg-white outline-none focus:outline-none">
                                                    {/*header*/}
                                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                        <h3 className="text-3xl font-semibold">
                                                            Mint your NFT!
                                                        </h3>
                                                    </div>
                                                    {/*body*/}
                                                    <div className="relative p-6 flex-auto my-4 text-slate-500 text-lg leading-relaxed">
                                                        <div className="md:grid md:grid-cols-3 md:gap-6">
                                                            <div className="md:col-span-1">
                                                                <img
                                                                    src={
                                                                        selectedImageUrl
                                                                    }
                                                                />
                                                            </div>
                                                            <form className="mt-5 space-y-6 md:col-span-2 md:mt-0">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        Name
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            id="name"
                                                                            name="name"
                                                                            type="text"
                                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                            placeholder="eg. My First NFT"
                                                                            defaultValue={
                                                                                ''
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                setNftName(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        Description
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <textarea
                                                                            type="text"
                                                                            id="description"
                                                                            name="description"
                                                                            rows={
                                                                                3
                                                                            }
                                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                                            placeholder={
                                                                                'e.g. ' +
                                                                                data.keyword
                                                                            }
                                                                            defaultValue={
                                                                                ''
                                                                            }
                                                                            onChange={(
                                                                                e,
                                                                            ) => {
                                                                                setNftDesc(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                )
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div>
                                                                    <label className="block text-sm font-medium text-gray-700">
                                                                        Gas Fee
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            type="text"
                                                                            name="gasfee"
                                                                            id="gasfee"
                                                                            defaultValue="2 KLAY"
                                                                            disabled
                                                                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-700 sm:text-sm"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                    {/*Quiz*/}
                                                    <div className="p-6 border-t border-solid border-slate-200">
                                                        <Quiz
                                                            questionType="nft"
                                                            onClick={
                                                                handleSelectAnswer
                                                            }
                                                        />
                                                    </div>
                                                    {/*footer*/}
                                                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200">
                                                        <button
                                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            type="button"
                                                            onClick={
                                                                handleClose
                                                            }
                                                        >
                                                            Close
                                                        </button>
                                                        <Button
                                                            className="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                            onClick={handleMint}
                                                            // href="/collection"
                                                        >
                                                            Pay and Mint
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                    </>
                                ) : null}
                            </div>
                        )}
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

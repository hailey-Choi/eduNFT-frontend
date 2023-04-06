import { Container } from '../components/Container'
import { Button } from '../components/Button'
import Layout from '../components/layout'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'

export default function Home() {
    const [textInput, setTextInput] = useState('')
    return (
        <Layout home>
            <Container>
                <div className="mt-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mx-60">
                            The Ultimate Educational Platform for AI and NFT
                        </h1>
                        <p className="mt-10 mx-20 text-lg leading-8 text-gray-600">
                            Welcome to eduNFT, the AI and NFT marketplace for
                            hands-on learning.
                        </p>
                    </div>
                    <div>
                        <p className="mt-5 mx-20 text-lg leading-8 text-gray-600">
                            With eduNFT, you'll better understand how AI works
                            by generating images based on your text
                            descriptions. You'll be amazed by the results and
                            learn about the power of AI technology. In addition,
                            you'll also learn about NFTs by creating and trading
                            them on the marketplace. Mint your NFTs and
                            experience firsthand the unique properties and value
                            that NFTs offer. Join our community of learners and
                            discover the exciting world of AI and NFTs with
                            eduNFT. Start your journey today!
                        </p>
                        <div className="text-center">
                            <div className="inline-flex gap-40 mt-10">
                                <figure>
                                    <Image
                                        src="/rapping_cat.png"
                                        alt="rapping cat"
                                        width="300"
                                        height="400"
                                    />
                                    <figcaption>
                                        "A rapping cat in a comic-style"
                                    </figcaption>
                                </figure>
                                <figure>
                                    <Image
                                        src="/rocking_skull.png"
                                        alt="rocking skull"
                                        width="300"
                                        height="400"
                                    />
                                    <figcaption>
                                        "Funky skull is playing an electric
                                        guitar"
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                        <p className="mt-10 mx-20 text-lg leading-8 text-gray-600">
                            For the first step of your journey, simply write a
                            text description of the image you want to create
                            using AI. Our platform will take care of the rest
                            and generate an image you can turn into an NFT.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center mt-10 mb-24 mx-20">
                        <label
                            htmlFor="textinput"
                            className="block text-lg font-medium text-gray-700"
                        >
                            Start with a detailed description
                        </label>
                        <div className="mt-3 mb-3 w-full flex justify-center">
                            <input
                                type="text"
                                id="textInput"
                                name="textInput"
                                value={textInput}
                                className="mx-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg"
                                placeholder="teddy bears shopping for groceries, one-line drawing"
                                onChange={(e) => {
                                    setTextInput(e.target.value)
                                }}
                            />
                            <Link
                                href={{
                                    pathname: '/dall-e',
                                    query: {
                                        keyword: textInput,
                                    },
                                }}
                            >
                                <Button
                                    className="p- text-s mt-2 ml-2"
                                    disabled={textInput.length <= 10}
                                >
                                    Generate
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </Layout>
    )
}

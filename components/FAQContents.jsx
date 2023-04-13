import questions from '../questions.json'
import React, { useState } from 'react'
import Image from 'next/image'

const FAQ = ({ question, answer }) => {
    return (
        <div
            className="bg-gray-900 dark:bg-gray-100 h-28 w-auto mb-4 rounded-md flex items-center"
        >
            <p className="text-gray-200 dark:text-gray-500 text-lg ml-4">
                Q) {question}
                <br />
                A) {answer}
            </p>
            {/* <label className="text-gray-200 dark:text-gray-500 text-lg ml-4">
                {answer}
            </label> */}
        </div>
    )
}

export function FAQContents() {
    return (
        <div className="my-5 mx-5 text-lg">
            <h1 className="font-bold text-3xl mt-16 mb-8">
                What is Non-Fungible Token (NFT)?
            </h1>
            <div className="space-y-5">
                <div className="flex mr-10 space-x-5">
                    <p className="mr-10">
                        NFTs, or Non-Fungible Tokens, are special digital items
                        that can be bought and sold online. They show ownership
                        of something unique, like art or music, and are stored
                        on a special computer system called blockchain. NFTs can
                        be sold on websites like OpenSea, but there may be fees
                        for the transactions. Smart contracts help with buying
                        and selling NFTs automatically.
                    </p>
                    <figure className="text-center">
                        <Image
                            src="/marketplace_sample.png"
                            width="1000"
                            height="600"
                            alt="CryptoPunk.png"
                        />
                        <figcaption className="mt-1 italic text-sm text-gray-500">
                            opensea.io
                        </figcaption>
                    </figure>
                </div>
            </div>
            <h1 className="font-bold text-3xl mb-8">FAQ</h1>
            <div className="space-y-5">
                {questions.FAQs.map((faq, index) => (
                    <FAQ
                        key={index}
                        question={faq.question}
                        answer={faq.answer}
                    />
                ))}
            </div>
        </div>
    )
}

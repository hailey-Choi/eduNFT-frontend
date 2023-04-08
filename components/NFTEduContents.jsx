import Image from 'next/image'

export function NFTEduContents() {
    return (
        <div className="my-5 mx-5 text-lg">
            <h1 className="font-bold text-3xl mt-16 mb-8">
                What is Non-Fungible Token (NFT)?
            </h1>
            <div className="space-y-5">
                <div className="flex mr-10 space-x-5">
                    <p className="mr-10">
                        An NFT, or non-fungible token, is a unique digital asset
                        that represents ownership of a digital or physical item.
                        Just like a digital certificate of ownership, an NFT is
                        stored on the blockchain, which is a decentralized
                        digital ledger that verifies and records transactions.
                        NFTs can be used to buy, sell, trade, and collect
                        digital assets like art, music, videos, and virtual
                        goods.
                    </p>
                    <figure>
                        <Image
                            src="/CryptoPunk.png"
                            width="600"
                            height="200"
                            alt="CryptoPunk.png"
                        />
                        <figcaption className="mt-1 italic text-sm text-gray-500">
                            "CryptoPunk #5822, sold for $23.7 Million"
                        </figcaption>
                    </figure>
                </div>
            </div>
            <h1 className="font-bold text-3xl mb-8">
                What am I going to do now? Minting!
            </h1>
            <div className="space-y-5">
                <p>
                    Minting is the process of creating a new NFT on the
                    blockchain. It involves generating a digital asset, such as
                    an image or a piece of content, and attaching it to a unique
                    token on the blockchain. Once minted, the NFT can be bought,
                    sold, or traded like any other digital asset. Minting is
                    typically done by artists, creators, or users who want to
                    create and sell their unique digital assets as NFTs on NFT
                    marketplaces.
                </p>
                <p>
                    When you mint NFTs on platforms like Ethereum or Klaytn, you
                    need to pay gas fees which represent the cost of computing
                    resources. These fees are paid in cryptocurrency and are
                    used to reward miners or validators for processing
                    transactions and running smart contracts.
                </p>
                <p>
                    In NFT marketplaces, a smart contract acts as a
                    decentralized program that facilitates the buying, selling,
                    and trading of NFTs. It contains the rules and logic that
                    govern the ownership, transfer, and verification of NFTs,
                    ensuring secure and transparent transactions within the
                    marketplace.
                </p>
            </div>
        </div>
    )
}

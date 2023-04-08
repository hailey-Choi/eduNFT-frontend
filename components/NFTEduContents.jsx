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
                        NFTs, or Non-Fungible Tokens, are a type of digital
                        asset that represent ownership of a unique item or piece
                        of content, such as digital art, music, or collectibles.
                        NFTs are bought and sold on digital marketplaces, with
                        OpenSea being a commonly used platform for NFT trading.
                        <br />
                        <br />
                        One key difference between an image file and an NFT is
                        that while an image file is a digital file that can be
                        copied and shared, an NFT represents ownership of a
                        specific instance of a digital asset and is stored on a
                        blockchain, which is a decentralized digital ledger.
                        This means that NFTs have a unique digital fingerprint
                        that verifies their authenticity and ownership, making
                        them scarce and valuable.
                    </p>
                    <figure className="text-center">
                        <Image
                            src="/CryptoPunk.png"
                            width="1000"
                            height="600"
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

import Image from 'next/image'

export function ConnectWalletInfo() {
    return (
        <div className="px-6">
            <p>
                Welcome to EduNFT! If you're new to the world of
                cryptocurrencies, you may be wondering what a crypto wallet is
                and why it's needed to participate in our marketplace.
                <br />
                <br /> A crypto wallet is a digital wallet that allows you to
                store, manage, and transact with cryptocurrencies. In EduNFT,
                you'll need a Kaikas wallet to store and manage Klaytn coins
                called KLAY on testnet, which you'll use to buy and sell NFTs.
                Testnet coin is a digital token that mimics the behavior of real
                Klaytn blockchain coins, but has no monetary value. It allows
                you to test out the features of our marketplace and practice
                buying and selling NFTs without risking any real money. When you
                create a crypto wallet, you'll be given a public address and a
                private key. The public address is what you'll use to receive
                Klay, while the private key is what you'll use to access and
                manage your Klay. It's important to keep your private key secure
                and never share it with anyone, as it provides access to your
                wallet and all the Klay stored within it.
                <br />
                <br />
                In summary, a crypto wallet is essential for participating in
                EduNFT. It allows you to store and manage your Klay, ensuring
                that your transactions are safe and secure.
            </p>
            <h1 className="mt-10 font-semibold text-2xl">
                How do I install PC Kaikas?
            </h1>
            {/* body */}
            <div>
                <ol className="list-decimal list-inside mt-3">
                    <li>
                        Go to Kaikas installation page on Chrome extension
                        program website.
                        <br />- Install Kaikas wallet:{' '}
                        <a
                            className="text-blue-700"
                            href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
                            target="_blank"
                            rel="undefined noreferrer"
                        >
                            https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi
                        </a>
                        <br />
                        <br />
                    </li>
                    <li>
                        Click Add to Chrome.
                        <br />
                        <br />
                    </li>
                    <li>
                        Click Add Extension Program.
                        <br />
                        <br />
                    </li>
                    <li>
                        If you cannot see the Kaikas icon next to the address
                        line after installation, click extension program icon
                        &gt; Pin Kaikas.
                        <br />
                        <br />
                    </li>
                    <li>
                        Set wallet password.
                        <br />- Passwords are only used when unlocking Kaikas on
                        the current computer, with no relevance to blockchain
                        private key.
                        <br />
                        <Image
                            src="/set_wallet_password.png"
                            alt="set_wallet_password.png"
                            width="300"
                            height="400"
                        />
                    </li>
                    <li>
                        Set account name.
                        <br />
                        <Image
                            src="/set_account_name.png"
                            alt="set_account_name.png"
                            width="300"
                            height="400"
                        />
                        <br />
                        <br />
                    </li>
                    <li>
                        Record the seed phrase (mnemonic).
                        <br />
                        <div className="flex">
                            <Image
                                src="/store_seed_phrase.png"
                                alt="store_seed_phrase.png"
                                width="300"
                                height="400"
                            />
                            <Image
                                src="/verify_seed_phrase.png"
                                alt="verify_seed_phrase.png"
                                width="300"
                                height="400"
                            />
                        </div>
                        &nbsp;
                        <br />- Third parties are capable of acquiring all
                        authority to your wallet with the leakage of the seed
                        phrase. Never disclose or leak the seed phrase to
                        others.
                        <br />- Rather than saving information on a computer,
                        cell phone, and other devices that could go online,
                        write down the seed phrase on a piece of paper and store
                        it safely. Leakages through e-mail and online memo pads
                        are often occurring.
                        <br />- Never provide seed phrase or private key to
                        websites, e-mails and social media messages requesting
                        them. General events and customer centers never request
                        seed phrases and private keys, and entities asking seed
                        phrases and private keys are likely to be fraud or scam.
                        <br />
                        <br />
                    </li>
                    <li>
                        Re-enter and check the seed phrase.
                        <br />
                        <Image
                            src="/verify_seed_phrase.png"
                            alt="verify_seed_phrase.png"
                            width="300"
                            height="400"
                        />
                        <br />- When entered, the whole seed phrase must be
                        identical to stop displaying 'seed phrase does not
                        match'.
                    </li>
                </ol>
                <div className="mt-5 italic text-sm text-gray-400">
                    Reference:{' '}
                    <a
                        href="https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-"
                        target="_blank"
                        rel="undefined noreferrer"
                    >
                        https://kaikas.zendesk.com/hc/en-us/articles/6657796272793-How-do-I-install-PC-Kaikas-
                    </a>
                </div>
            </div>
            <h1 className="mt-10 font-semibold text-2xl">
                How do I receive testnet KLAY?
            </h1>
            <div>
                <ol className="list-decimal list-inside space-y-3 mt-3">
                    <li>
                        From the{' '}
                        <a
                            className="text-blue-700"
                            href="https://baobab.wallet.klaytn.foundation/"
                            target="_blank"
                            rel="undefined noreferrer"
                        >
                            Baobab Klaytn Wallet
                        </a>
                        , KLAY Faucet menu on the left bar brings you to the
                        testnet KLAY request page. The requested page will show
                        your address and the current testnet KLAY balance of
                        your account.
                    </li>
                    <Image
                        src="/klay_faucet.webp"
                        alt="klay_faucet.webp"
                        width="700"
                        height="500"
                    />
                    <li>
                        Clicking Run Faucet button will send you 5 testnet KLAY
                        and your balance will be updated. Note that you can run
                        the faucet for each account once every 24 hours.
                    </li>
                </ol>
                <div className="mt-5 italic text-sm text-gray-400">
                    Reference:{' '}
                    <a
                        href="https://docs.klaytn.foundation/content/dapp/developer-tools/klaytn-wallet"
                        target="_blank"
                        rel="undefined noreferrer"
                    >
                        https://docs.klaytn.foundation/content/dapp/developer-tools/klaytn-wallet
                    </a>
                </div>
            </div>
        </div>
    )
}

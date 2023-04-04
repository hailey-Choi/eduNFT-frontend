export function ConnectWalletInfo() {
  return (
    <>
      <header>
        <h1> How do I install PC Kaikas?</h1>
      </header>
      {/* body */}
      <div>
        <ol>
          <li>
            Go to Kaikas installation page on Chrome extension program website.
            <br />- Install Kaikas wallet:{" "}
            <a
              class="waffle-rich-text-link"
              href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
              target="_self"
              rel="undefined"
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
            If you cannot see the Kaikas icon next to the address line after
            installation, click extension program icon &gt; Pin Kaikas.
            <br />
            <br />
          </li>
          <li>
            Set wallet password.
            <br />- Passwords are only used when unlocking Kaikas on the current
            computer, with no relevance to blockchain private key.
            <br />
            <img
              src="/hc/article_attachments/10870863694873/4.png"
              alt="4.png"
            />
          </li>
          <li>
            Set account name.
            <br />
            <img
              src="/hc/article_attachments/10870864017945/5.png"
              alt="5.png"
            />
            <br />
            <br />
          </li>
          <li>
            Record the seed phrase (mnemonic).
            <br />
            <img
              src="/hc/article_attachments/10870914688409/7.png"
              alt="7.png"
            />
            <img
              src="/hc/article_attachments/10870879946649/8.png"
              alt="8.png"
            />
            &nbsp;
            <br />- Third parties are capable of acquiring all authority to your
            wallet with the leakage of the seed phrase. Never disclose or leak
            the seed phrase to others.
            <br />- Rather than saving information on a computer, cell phone,
            and other devices that could go online, write down the seed phrase
            on a piece of paper and store it safely. Leakages through e-mail and
            online memo pads are often occurring.
            <br />- Never provide seed phrase or private key to websites,
            e-mails and social media messages requesting them. General events
            and customer centers never request seed phrases and private keys,
            and entities asking seed phrases and private keys are likely to be
            fraud or scam.
            <br />
            <br />
          </li>
          <li>
            Re-enter and check the seed phrase.
            <br />
            <img
              src="/hc/article_attachments/10870879946649/8.png"
              alt="8.png"
            />
            <br />- When entered, the whole seed phrase must be identical to
            stop displaying 'seed phrase does not match'.
          </li>
        </ol>
      </div>
    </>
  );
}

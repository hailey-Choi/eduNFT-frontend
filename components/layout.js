import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const name = "Welcome to EduNFT";
export const siteTitle = "EduNFT";

export default function Layout({ children, home }) {
  return (
    <div>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <header>
        {home ? (
          <>
            <Image
              priority
              src="/images/elfo.svg"
              height={144}
              width={144}
              alt=""
            />
            <h1>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <Image
                priority
                src="/images/elfo.svg"
                height={108}
                width={108}
                alt=""
              />
            </Link>
            <h2>
              <Link href="/">{name}</Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      <div>
        {home ? (
          <Link href="/dall-e">Next Page</Link>
        ) : (
          <Link href="/">← Back to home</Link>
        )}
      </div>
    </div>
  );
}

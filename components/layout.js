import Head from "next/head";

import { Button } from "./Button";
import { Container } from "./Container";
export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <title>EduNFT</title>
      </Head>
      <header className="relative z-50 pb-11 lg:pt-11">
        <Container className="flex flex-wrap items-center justify-center sm:justify-between lg:flex-nowrap">
          <div className="mt-10 lg:mt-0 lg:grow lg:basis-0">
            <h1
              id="speakers-title"
              className="text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
            >
              EduNFT
            </h1>
          </div>
          <div className="order-first -mx-4 flex flex-auto basis-full overflow-x-auto whitespace-nowrap border-b border-blue-600/10 py-4 font-mono text-sm text-blue-600 sm:-mx-6 lg:order-none lg:mx-0 lg:basis-auto lg:border-0 lg:py-0">
            <div className="mx-auto flex items-center gap-4 px-4">
              <p>
                <time dateTime="2022-04-04">04</time>-
                <time dateTime="2022-04-06">06 of April, 2022</time>
              </p>
              <p>Los Angeles, CA</p>
            </div>
          </div>
          <div className="hidden sm:mt-10 sm:flex lg:mt-0 lg:grow lg:basis-0 lg:justify-end">
            <Button href="#">Connect Wallet</Button>
          </div>
        </Container>
      </header>
      <main>{children}</main>
    </>
  );
}

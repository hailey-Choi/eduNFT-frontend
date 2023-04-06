import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Layout from "../components/layout";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { useAppContext } from "../components/AppContext";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  const walletContext = useAppContext();

  return (
    <Layout home>
      <Container>
        <div className="mt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mx-60">
              The Ultimate Educational Platform for AI and NFT
            </h1>
            <p className="mt-10 mx-20 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt.
              Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
              veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non
              deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
              amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna
              aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim
              aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
              cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
              aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui
              irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
              occaecat fugiat aliqua.
            </p>
            <div className="inline-flex gap-40 mt-10">
              <Image src="/angry_elfo.jpeg" alt="me" width="300" height="400" />
              <Image src="/angry_elfo.jpeg" alt="me" width="300" height="400" />
            </div>
            <p className="mt-10 mx-20 text-lg leading-8 text-gray-600">
              Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui
              lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat
              fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt.
              Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat
              veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non
              deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt
              amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna
              aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat
              commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim
              aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
              cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat
              aliqua. Anim aute id magna aliqua ad ad non deserunt sunt. Qui
              irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
              occaecat fugiat aliqua.
            </p>
          </div>
          <div className="flex flex-col items-center  text-center mt-20 mb-24">
            <div>
              <label
                htmlFor="textinput"
                className="block text-lg font-medium text-gray-700"
              >
                Enter a keyword
              </label>
              <div className="mt-3 mb-3 w-96">
                <input
                  type="text"
                  id="textInput"
                  name="textInput"
                  value={textInput}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg text-center"
                  placeholder="white cat"
                  onChange={(e) => {
                    setTextInput(e.target.value);
                  }}
                />
              </div>
            </div>
            {walletContext.wallet ? (
              <Link
                href={{
                  pathname: "/dall-e",
                  query: {
                    keyword: textInput,
                  },
                }}
              >
                <Button className="p-4 text-s mt-2 ml-2">
                  Generate Images
                </Button>
              </Link>
            ) : (
              <Button
                className="p-4 text-s mt-2 ml-2"
                onClick={() => {
                  alert("Connect wallet first!");
                }}
              >
                Generate Images
              </Button>
            )}
          </div>
        </div>
      </Container>
    </Layout>
  );
}

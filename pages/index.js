import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Layout from "../components/layout";
import Link from "next/link";
import { useState } from "react";
import { Web3Address } from "../components/Web3Address";
import { Web3Button } from "../components/Web3Button";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  return (
    <Layout home>
      <Container>
        <div>
          <div>
            <label
              htmlFor="textinput"
              className="block text-lg font-medium text-gray-700"
            >
              Enter a keyword
            </label>
            <div className="mt-3 mb-3">
              <input
                type="text"
                id="textInput"
                name="textInput"
                value={textInput}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 lg:text-lg"
                placeholder="white cat"
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
            </div>
          </div>
          <Link
            href={{
              pathname: "/dall-e",
              query: {
                keyword: textInput,
              },
            }}
          >
            <Button> Generate Images</Button>
          </Link>
        </div>
        <Web3Button />
        <Web3Address />
      </Container>
    </Layout>
  );
}

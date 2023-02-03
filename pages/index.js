import { Container } from "../components/Container";
import { Button } from "../components/Button";
import Layout from "../components/layout";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [textInput, setTextInput] = useState("");
  return (
    <Layout home>
      <Container>
        <div>
          <div className="mb-5">
            <p>Home Page</p>
          </div>
          <Link
            href={{
              pathname: "/ai",
            }}
          >
            <Button>Learn AI</Button>
          </Link>
        </div>
      </Container>
    </Layout>
  );
}

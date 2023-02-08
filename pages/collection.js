import Layout from "../components/layout";
import { Container } from "../components/Container";
import { useContext } from "react";
import AppContext from "../components/AppContext";

export default function Collection() {
  const context = useContext(AppContext);

  console.log("Context: ", context);
  return (
    <Layout>
      <Container>
        <p>Show Collections Here</p>
      </Container>
    </Layout>
  );
}

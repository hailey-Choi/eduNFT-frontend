import Layout from "../components/layout";
import axios from "axios";
import { useState, useEffect } from "react";

export default function DallE() {

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
      const fetchData = async () => {
          setLoading(true);
          try {
            const response = await axios.post('https://f5omod4tyb.execute-api.ap-northeast-2.amazonaws.com/v1/api/dall-e',{
              //보내고자 하는 데이터 
              description: "a white cat",
              numbers: 3
          });
          setImages(response.data.data);
          } catch (e) {
              console.log(e);
          }
          setLoading(false);
      }
      fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!images) {
    return null;
  }

  return (
    <Layout>
      <div>
        <h1>Dall-E Image Generation</h1>
        <ul>
          {images.map((item, i) => {
            return <li key={i}>{item.url}</li>;
          })}
        </ul>
      </div>
    </Layout>
  );
}


import Layout from "../components/layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Container } from "../components/Container";

export default function DallE() {
  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://f5omod4tyb.execute-api.ap-northeast-2.amazonaws.com/v1/api/dall-e",
          {
            //보내고자 하는 데이터
            description: "a white cat",
            numbers: 3,
          }
        );
        setImages(response.data.data);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        <h1>Dall-E Image Generation</h1>
        {loading ? (
          <ProgressBar
            height="80"
            width="80"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        ) : images ? (
          <section
            id="speakers"
            aria-labelledby="speakers-title"
            className="py-20 sm:py-32"
          >
            <Container>
              <div className="mx-auto max-w-2xl lg:mx-0">
                <h2
                  id="speakers-title"
                  className="font-display text-4xl font-medium tracking-tighter text-blue-600 sm:text-5xl"
                >
                  Dall-E Image Generation
                </h2>
                <p className="mt-4 font-display text-2xl tracking-tight text-blue-900">
                  Choose one from the images generated below!
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                {images.map((image, i) => (
                  <div key={i} className="group relative">
                    <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                      <img
                        src={image.url}
                        alt="new"
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-gray-900">
                      image
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">desc</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}

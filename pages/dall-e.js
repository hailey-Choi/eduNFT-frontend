import Layout from "../components/layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Container } from "../components/Container";
import { useRouter } from "next/router";
import { Modal } from "../components/modal";

export default function DallE() {
  const router = useRouter();
  const data = router.query;
  const [images, setImages] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // async를 사용하는 함수 따로 선언
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://f5omod4tyb.execute-api.ap-northeast-2.amazonaws.com/v1/api/dall-e",
          {
            description: data.keyword,
            numbers: 6,
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

  const handleClose = () => {
    setShowModal(false);
  };

  const handleMint = () => {
    // Minting Logic here
    console.log("Minting Handled!!!");
    setShowModal(false);
  };

  return (
    <Layout>
      <div>
        <Container>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2
              id="speakers-title"
              className=" text-2xl font-medium tracking-tighter text-blue-600 sm:text-2xl"
            >
              Dall-E Image Generation
            </h2>
          </div>
          <div>
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
            ) : (
              <div>
                <div>
                  <p className="mt-4 text-xl tracking-tight text-blue-900">
                    Choose one from the images generated below!
                  </p>
                  <div className="mt-6 grid grid-cols-2 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
                    {images != null ? (
                      images.map((image, i) => (
                        <div key={i} className="group relative">
                          <div className="h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                            <img
                              src={image.url}
                              alt="new"
                              onClick={() => {
                                setShowModal(true);
                                setSelectedImageUrl(image.url);
                              }}
                            />
                          </div>
                          <h3 className="mt-4 text-base font-semibold text-gray-900">
                            image
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">desc</p>
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
                {showModal ? (
                  <Modal
                    selectedImageUrl="/elfo.svg"
                    handleClose={handleClose}
                    handleMint={handleMint}
                  />
                ) : null}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
}

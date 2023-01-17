import Layout from "../components/layout";
import axios from "axios";
import { useState, useEffect } from "react";
import { ProgressBar } from "react-loader-spinner";
import { Container } from "../components/Container";
import { useRouter } from "next/router";

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
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        {/*content*/}
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          {/*header*/}
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">
                              Minting Information
                            </h3>
                          </div>
                          {/*body*/}
                          {/* <div className="relative p-6 flex-auto my-4 text-slate-500 text-lg leading-relaxed"> */}
                          <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="first-name"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                First name
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                  type="text"
                                  name="first-name"
                                  id="first-name"
                                  autoComplete="given-name"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="last-name"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Last name
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                  type="text"
                                  name="last-name"
                                  id="last-name"
                                  autoComplete="family-name"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                                />
                              </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                              >
                                Email address
                              </label>
                              <div className="mt-1 sm:col-span-2 sm:mt-0">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                />
                              </div>
                            </div>
                          </div>
                          {/*footer*/}
                          <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                            <button
                              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                setSelectedImageUrl(null);
                              }}
                            >
                              Close
                            </button>
                            <button
                              className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setShowModal(false);
                                handleMinting(selectedImageUrl);
                              }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </Container>
      </div>
    </Layout>
  );
}

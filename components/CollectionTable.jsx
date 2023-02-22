import { Button } from "./Button";

const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";

export default function CollectionTable({ metadata, selectedTab }) {
  return (
    <div className="bg-white mb-6">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <p className="mt-6 text-lg text-gray-600 font-semibold">
          {selectedTab === "My EduNFTs"
            ? "EduNFTs owned by you"
            : "All NFTs in EduNFT Collection"}
        </p>
      </div>
      <ul
        role="list"
        className="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
      >
        {metadata ? (
          metadata.map((data, i) => (
            <li key={i}>
              <img
                className="w-full rounded-2xl object-cover"
                src={pinataEndpoint + data.image_url.slice(7)}
                alt="new"
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                Name
              </h3>
              <p className="text-base leading-7 text-gray-600">Description</p>
              <Button className="p-3 text-xs mt-2">
                {selectedTab === "My EduNFTs" ? "List for sale" : "Buy now"}
              </Button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </div>
  );
}

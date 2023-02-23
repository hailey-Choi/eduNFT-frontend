import { Button } from "./Button";

const pinataEndpoint = "https://gateway.pinata.cloud/ipfs/";
const tabs = ["My EduNFTs", "My EduNFTs on Listing", "All EduNFTs"];

export default function CollectionTable({ metadata, selectedTab }) {
  return (
    <div className="bg-white mb-6">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <p className="mt-6 text-lg text-gray-600 font-semibold">
          {selectedTab === tabs[0]
            ? "EduNFTs owned by you"
            : selectedTab === tabs[1]
            ? "My EduNFTs on Listing"
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
                {data.name}
              </h3>
              <p className="text-base leading-7 text-gray-600">
                {data.description}
              </p>
              <Button className="p-3 text-xs mt-2">
                {selectedTab === tabs[0]
                  ? "List for sale"
                  : selectedTab === tabs[1]
                  ? "Cancel Listing"
                  : "Buy now"}
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

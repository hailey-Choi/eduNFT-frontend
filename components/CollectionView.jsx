import { useState } from "react";
import CollectionTable from "./CollectionTable";

const tabs = ["My EduNFTs", "My EduNFTs on Listing", "All EduNFTs"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CollectionView({ userMetadata, allMetadata }) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div>
      <div className="hidden sm:block mb-5">
        <div className="border-b border-gray-200">
          <ul className="-mb-px flex space-x-8">
            <li
              className={classNames(
                selectedTab === tabs[0]
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default"
              )}
              onClick={() => setSelectedTab(tabs[0])}
            >
              My EduNFTs
            </li>
            <li
              className={classNames(
                selectedTab === tabs[1]
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default"
              )}
              onClick={() => setSelectedTab(tabs[1])}
            >
              My EduNFTs on Listing
            </li>
            <li
              className={classNames(
                selectedTab === tabs[2]
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default"
              )}
              onClick={() => setSelectedTab(tabs[2])}
            >
              All EduNFTs
            </li>
          </ul>
        </div>
      </div>
      <CollectionTable
        metadata={selectedTab === tabs[0] ? userMetadata : allMetadata}
        selectedTab={selectedTab}
      />
    </div>
  );
}

import { useState } from "react";
import CollectionTable from "./CollectionTable";

const tabs = ["My EduNFTs", "All EduNFTs"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CollectionView({ userImages, allImages }) {
  const [selectedTab, setSelectedTab] = useState("My EduNFTs");

  return (
    <div>
      <div className="hidden sm:block mb-5">
        <div className="border-b border-gray-200">
          <ul className="-mb-px flex space-x-8">
            <li
              className={classNames(
                selectedTab === "My EduNFTs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default"
              )}
              onClick={() => setSelectedTab("My EduNFTs")}
            >
              My EduNFTs
            </li>
            <li
              className={classNames(
                selectedTab === "All EduNFTs"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default"
              )}
              onClick={() => setSelectedTab("All EduNFTs")}
            >
              All EduNFTs
            </li>
          </ul>
        </div>
      </div>
      <CollectionTable
        userImages={userImages}
        allImages={allImages}
        selectedTab={selectedTab}
      />
    </div>
  );
}

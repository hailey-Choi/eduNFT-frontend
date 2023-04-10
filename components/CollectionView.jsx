import { useState } from 'react'
import CollectionTable from './CollectionTable'
import { FAQContents } from '../components/FAQContents'
import { ExclamationCircleIcon } from '@heroicons/react/20/solid'

const tabs = [
    'FAQ',
    'My EduNFTs',
    'My EduNFTs on Listing',
    'All EduNFTs',
    'All EduNFTs on Listing',
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function CollectionView({
    userMetadata,
    userListedMetadata,
    allMetadata,
    allListedMetadata,
    wallet,
}) {
    const [selectedTab, setSelectedTab] = useState(tabs[4])

    return (
        <div>
            <div className="hidden sm:block mb-5">
                <div className="border-b border-gray-200">
                    <ul className="-mb-px flex space-x-8">
                        <li
                            className={classNames(
                                selectedTab === tabs[4]
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default',
                            )}
                            onClick={() => setSelectedTab(tabs[4])}
                        >
                            FAQ
                        </li>
                        <li
                            className={classNames(
                                selectedTab === tabs[0]
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default',
                            )}
                            onClick={() => setSelectedTab(tabs[0])}
                        >
                            My EduNFTs
                        </li>
                        <li
                            className={classNames(
                                selectedTab === tabs[1]
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default',
                            )}
                            onClick={() => setSelectedTab(tabs[1])}
                        >
                            My EduNFTs on Listing
                        </li>
                        <li
                            className={classNames(
                                selectedTab === tabs[2]
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default',
                            )}
                            onClick={() => setSelectedTab(tabs[2])}
                        >
                            All EduNFTs
                        </li>
                        <li
                            className={classNames(
                                selectedTab === tabs[3]
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm cursor-default',
                            )}
                            onClick={() => setSelectedTab(tabs[3])}
                        >
                            All EduNFTs on Listing
                        </li>
                    </ul>
                </div>
            </div>
            {selectedTab == tabs[4] ? (
                <FAQContents />
            ) : (
                <>
                    {wallet ? (
                        <CollectionTable
                            metadata={
                                selectedTab == tabs[0]
                                    ? userMetadata
                                    : selectedTab == tabs[1]
                                    ? userListedMetadata
                                    : selectedTab == tabs[2]
                                    ? allMetadata
                                    : selectedTab == tabs[3]
                                    ? allListedMetadata
                                    : {}
                            }
                            selectedTab={selectedTab}
                        />
                    ) : (
                        <div className="flex my-10 bg-gray-100 p-5 rounded-2xl font-semibold text-gray-500">
                            <ExclamationCircleIcon className="w-5 h-5 mr-2" />
                            Connect your wallet first
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiAlert } from "@/components/ui/api-alert";

import { columns, CollectionColumn } from './columns';
import { ApiList } from "@/components/ui/api-list";

interface CollectionsClientProps {
	data: CollectionColumn[];
}

export const CollectionsClient: React.FC<CollectionsClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

  const collectionsData: CollectionColumn[] = [
		{
			id: '1',
			name: 'Người Mặt Trời',
			description: 'cNFT',
			mint: 'Cc4bV...PGcT',
			tokenAccount: '9r9a...nQ8N',
			metadataAccount: '9zK5...mWyn',
			masterEditionAccount: 'GW2i...PAyv',
			createdAt: '2023-09-17T13:31:04Z',
			actions: ['approve', 'reject'],
		},
		{
			id: '2',
			name: 'Collection 1',
			description: 'Example Collection 1',
			mint: 'Mint Address 1',
			tokenAccount: 'Token Account 1',
			metadataAccount: 'Metadata Account 1',
			masterEditionAccount: 'Master Edition Account 1',
			createdAt: '2023-09-18T14.22.32Z',
			actions: ['approve', 'reject'],
		},
		{
			id: '3',
			name: 'Collection 2',
			description: 'Example Collection 2',
			mint: 'Mint Address 2',
			tokenAccount: 'Token Account',
			metadataAccount: 'Metadata Address',
			masterEditionAccount: 'Master Edition Address',
			createdAt: '2023/12/03',
			actions: ['approve', 'reject'],
		},
		{
			id: '3',
			name: 'Collection 3',
			description: 'Example Collection 3',
			mint: 'Mint Address 3',
			tokenAccount: 'Token Account 3',
			metadataAccount: 'Metadata Account 3',
			masterEditionAccount: 'Master Edition Account 3',
			createdAt: '2024-01-23T10.45.15Z',
			actions: ['approve', 'reject'],
		},
		{
			id: '10',
			name: 'Collection Example Number Ten',
			description: 'This is an example of collection number ten',
			mint: 'Mint Address Ten',
			tokenAccount: 'Token Account Ten',
			metadataAccount: 'Metadata Address Ten',
			masterEditionAccount: 'Master Edition AddressTen',
			createdAt: '2022/12/03',
			actions: ['approve', 'reject'],
		},
	];
	// const useGetCollections
	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Collections (${collectionsData.length})`}
					description="Manage collections"
				/>
				<Button
					onClick={() => router.push(`/${params.storeId}/collections/new`)}
				>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={collectionsData} />
			<Heading title="API" description="API Calls for Collections" />
			<Separator />
			<ApiList entityName="collections" entityIdName="collectionId" />
		</>
	);
};

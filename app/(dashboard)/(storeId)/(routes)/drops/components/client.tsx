"use client";

import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { columns, DropColumn } from './columns';

interface DropClientProps {
	data: DropColumn[];
}

export const DropClient: React.FC<DropClientProps> = ({ data }) => {
  const dropsData: DropColumn[] = [
		{
			id: '1',
			dropName: 'Airdrop for fan',
			blockchain: 'Solana',
			supply: '2 / 10 minted',
			status: 'Live',
			startDate: '2022/12/03',
		},
		{
			id: '2',
			dropName: 'Airdrop cNFT',
			blockchain: 'Solana',
			supply: '5 / 1000 minted',
			status: 'Live',
			startDate: '2022/12/03',
		},
	];
	return (
		<>
			<Heading
				title={`Drops (${dropsData.length})`}
				description="Manage drops for your website"
			/>
			<Separator />
			<DataTable searchKey="drops" columns={columns} data={dropsData} />
		</>
	);
};

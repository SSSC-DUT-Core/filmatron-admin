"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { columns, CreditColumn } from './columns';

interface CreditsClientProps {
	data: CreditColumn[];
}

export const CreditsClient: React.FC<CreditsClientProps> = ({ data }) => {
	const params = useParams();
	const router = useRouter();

  const creditsData: CreditColumn[] = [
		{
			id: '1',
			addressUser: 'DzMe...mWco',
			event: 'GIFTED',
			amount: 1000,
			pricePerCredit: 100,
			total: 100,
			createdAt: '2022/12/03',
		},
		{
			id: '2',
			addressUser: '0xe19...E1Bff',
			event: 'CREDITED',
			amount: 2000,
			pricePerCredit: 200,
			total: 200,
			createdAt: '2022/12/03',
		},
	];

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Credit (${creditsData.length})`}
					description="Manage credits for your products"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={creditsData} />
			<Heading title="API" description="API Calls for Credit" />
			<Separator />
			<ApiList entityName="credits" entityIdName="creditId" />
		</>
	);
};

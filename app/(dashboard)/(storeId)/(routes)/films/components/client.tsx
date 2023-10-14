"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import {  columns } from "./columns";
import { FilmEntity } from "@/graphql/generated";

interface ProductsClientProps {
  data?: FilmEntity[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();


  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Films (${data?.length})`}
					description="Manage films campaign"
				/>
				<Button onClick={() => router.push(`/films/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={data ?? []} />
			<Heading title="API" description="API Calls for Products" />
			<Separator />
			<ApiList entityName="products" entityIdName="productId" />
		</>
	);
};

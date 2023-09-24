"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import { ProductColumn, columns } from "./columns";

interface ProductsClientProps {
  data: ProductColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  const productData: ProductColumn[] = [
		{
			id: '1',
			name: 'Người Mặt Trời',
			category: 'film',
			price: '5000',
			isArchived: false,
			isFeatured: true,
			createdAt: '2022/12/03',
		},
		{
			id: '2',
			name: 'Chị Chị Em Em',
			category: 'film',
			price: '5000',
			isArchived: false,
			isFeatured: true,
			createdAt: '2022/12/03',
		},
	];

  return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Products (${productData.length})`}
					description="Manage products for your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
					<Plus className="mr-2 h-4 w-4" /> Add New
				</Button>
			</div>
			<Separator />
			<DataTable searchKey="name" columns={columns} data={productData} />
			<Heading title="API" description="API Calls for Products" />
			<Separator />
			<ApiList entityName="products" entityIdName="productId" />
		</>
	);
};

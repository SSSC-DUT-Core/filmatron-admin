
"use client"
import { mapFilmsFromGraphQLResponse } from "@/lib/utils";
import { ProductsClient } from "./components/client";
import {useGetFilmsQuery} from "@/graphql/generated";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  " "
	const { data:films, loading, error }  = useGetFilmsQuery(
      {variables: {
                  first: 0,
                  after: "1",
                  last: 5,
                  before: "1"
              },}
        );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={mapFilmsFromGraphQLResponse(films)} />
      </div> 
    </div>
  );
};

export default ProductsPage;

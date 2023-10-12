import { CompressedNFTMetadata } from "./components/collection-form";

const CategoryPage = async ({
  params
}: {
  params: { categoryId: string, storeId: string }
}) => {
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompressedNFTMetadata initialData={null} />
      </div>
    </div>
  );
}

export default CategoryPage;

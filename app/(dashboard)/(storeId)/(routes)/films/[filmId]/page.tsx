import { FilmForm } from "./components/film-form";

const ProductPage = async ({
  params
}: {
  params: { productId: string, storeId: string }
}) => {
  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <FilmForm 
          categories={[]} 
          colors={[]}
          sizes={[]}
          initialData={null}
        />
      </div>
    </div>
  );
}

export default ProductPage;

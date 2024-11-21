import ProductsComponent from "@/components/root/products/ProductsComponent";

export const metadata = {
  title: "Products",
};

export default function Products() {
  return (
    <div className="px-4 lg:px-0 mb-6">
      <h2 className="text-4xl text-center my-10 font-semibold mx-2 mb-6">
        Products
      </h2>
      <ProductsComponent />
    </div>
  );
}

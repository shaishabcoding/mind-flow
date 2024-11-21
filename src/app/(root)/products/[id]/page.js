/* eslint-disable @next/next/no-img-element */
import AddToCart from "@/components/root/products/addToCart";

const getProductById = async (id) => {
  const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  const { data } = await res.json();
  return data;
};

export default async function Product({ params }) {
  const { id } = await params;

  const product = await getProductById(id);

  return (
    <div className="my-10 mx-4 lg:mx-0">
      <div
        key={product._id}
        className="border flex flex-col gap-6 md:flex-row drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
      >
        <img
          alt={product.name}
          src={"/logo.png" || product.image}
          className="drop-shadow-sm aspect-video grow object-center bg-gray-100 dark:bg-gray-500 rounded-md"
        />

        <div className="grow">
          <h3 className="font-semibold text-2xl mt-4">{product.name}</h3>
          <p>Price: ${product.price}</p>
          <div className="mb-4 mt-2">
            <AddToCart id={product._id} />
          </div>
          <p className="text-sm">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

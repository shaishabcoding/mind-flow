/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import AddToCart from "@/components/root/products/addToCart";

const getProductById = async (id) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/products/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const { data } = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await getProductById(id);

    if (!product) {
      return {
        title: "Product Not Found",
        description: "The product you're looking for could not be found.",
      };
    }

    return {
      title: `${product.name} - Product Details`,
      description: product.description,
      openGraph: {
        title: `${product.name} - Product Details`,
        description: product.description,
        images: [product.image],
      },
    };
  } catch {
    return {
      title: "Error",
      description: "An error occurred while fetching the product details.",
    };
  }
}

export default async function Product({ params }) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return (
      <div className="container mx-auto my-10 px-4 text-center">
        <h1 className="text-2xl font-bold text-red-500">Product Not Found</h1>
        <p className="text-gray-500">
          We couldn't find the product you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 mx-4 lg:mx-0">
      <div
        key={product._id}
        className="border flex flex-col gap-6 md:flex-row drop-shadow-sm rounded-md p-4 bg-white dark:bg-gray-700"
      >
        <img
          alt={product.name}
          src={product.image}
          className="drop-shadow-sm border md:w-1/2 aspect-video object-center bg-gray-100 dark:bg-gray-500 rounded-md"
        />

        <div className="grow md:w-1/2">
          <h3 className="font-semibold text-2xl mt-4">{product.name}</h3>
          <p className="text-lg text-green-600 font-bold">
            Price: ${product.price}
          </p>
          <div className="mb-4 mt-2">
            <AddToCart id={product._id} />
          </div>
          <p className="text-sm">{product.description}</p>
        </div>
      </div>
    </div>
  );
}

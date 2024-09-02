"use client";
import { Fragment, useEffect, useState } from "react";
import Product, { AddNewProduct } from "./product/product";
import Navbar from "../../navbar/Navbar";
import Loading from "@/components/Loading";
import { useGetSellerProducts } from "@/hooks/useGetUser";

interface ProductType {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  stock: number;
  name: string;
  label: string;
}

interface ProductsProps {
  address: string;
}

export default function Products({ address }: ProductsProps) {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [doNothing, setDoNothing] = useState<null>(null);
  const { data, isLoading } = useGetSellerProducts(address);

  useEffect(() => {
    if (data && !data.err && data.data) {
      setProducts(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Fragment>
      <div className="hidden">{doNothing}</div>
      <Navbar />
      <div className="grid grid-cols-3 justify-center m-5">
        <div> </div>
        <h1 className="text-4xl text-center subpixel-antialiased font-bold">
          Your Products
        </h1>
        <div className="justify-self-end"></div>
      </div>
      <div className="flex justify-center m-4">
        <ProductsDataRender
          products={products}
          setDoNothing={setDoNothing}
          setProducts={setProducts}
        />
      </div>
    </Fragment>
  );
}

interface ProductsDataRenderProps {
  products: ProductType[] | null;
  setDoNothing: React.Dispatch<React.SetStateAction<null>>;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
}

function ProductsDataRender({ products, setDoNothing, setProducts }: ProductsDataRenderProps) {
  return (
    <div className="grid gap-4 justify-center md:justify-start grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products ? (
        products.length > 0 ? (
          products.map((product) => (
            <Product
              key={product.id}
              title={product.title}
              description={product.description}
              imageUrl={product.imageUrl}
              price={product.price}
              stock={product.stock}
              name={product.name}
              id={product.id}
              label={product.label}
              setDoNothing={setDoNothing}
              setProducts={setProducts}
            />
          ))
        ) : (
          <div className="text-2xl text-center">No Products Found</div>
        )
      ) : (
        <div className="text-2xl text-center">Loading...</div>
      )}
      <AddNewProduct />
    </div>
  );
}

import React from "react";
import ProductCard from "./components/ProductCard";
import { getProducts } from "./lib/actions";
import next from "next";

const page = async () => {
  const products = await getProducts({next:{
    tags:["product"]
  }});

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;

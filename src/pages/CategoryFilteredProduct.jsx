import React from "react";
import { useParams } from "react-router";
import { products } from "../data/products";


const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter(
    (product) => product.category === categoryName
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Category: {categoryName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2"
              />
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="font-bold mt-1">${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryFilteredProduct;

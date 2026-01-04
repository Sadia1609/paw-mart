import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch(
  //     `https://paw-mart-two.vercel.app/services?category=${encodeURIComponent(
  //       categoryName
  //     )}`
  //   )
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data))
  //     .catch((err) => console.log(err));
  // }, [categoryName]);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch services based on category and search
  useEffect(() => {
    let url = `/api/services?category=${encodeURIComponent(categoryName)}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error("Fetch error:", err);
        // Optionally show error message to user
      });
  }, [API_BASE_URL, categoryName]);

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-36">
      <title>Products</title>

      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        {categoryName}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product._id} className="card bg-base-100 shadow-sm">
            <figure>
              <img
                className="w-full h-56 object-cover"
                src={product?.image}
                alt={product?.name}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product?.name}</h2>
              <p>Price: ${product?.price}</p>
              <div className="card-actions justify-end">
                <Link to={`/details/${product?._id}`}>
                  <button className="btn btn-primary btn-sm sm:btn-md">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredProduct;

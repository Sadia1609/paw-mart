import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';

const CategoryFilteredProduct = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`https://paw-mart-two.vercel.app/services?category=${encodeURIComponent(categoryName)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [categoryName]);

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-36">
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


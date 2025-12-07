import React from "react";
import { useNavigate } from "react-router";

// Dummy images for categories
import petsImg from "../assets/pets.jfif";
import foodImg from "../assets/cat food.jfif";
import accessoriesImg from "../assets/accessories.jfif";
import careImg from "../assets/petcare.jfif";

const categories = [
  { name: "Pets (Adoption)", image: petsImg },
  { name: "Pet Food", image: foodImg },
  { name: "Accessories", image: accessoriesImg },
  { name: "Pet Care Products", image: careImg },
];

const CategorySection = () => {
  const navigate = useNavigate();

  return (
    <section className="my-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, idx) => (
          <div
            key={idx}
            className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            onClick={() =>
              navigate(`/category-filtered-product/${encodeURIComponent(category.name)}`)
            }
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center font-semibold">{category.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;

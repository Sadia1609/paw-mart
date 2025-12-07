import React from 'react';
import { Link } from 'react-router';

const categories = [
  {
    name: 'Pets',
    category: 'Pets',
    icon: '🐾',
  },
  {
    name: 'Pet Food',
    category: 'Food',
    icon: '🍖',
  },
  {
    name: 'Accessories',
    category: 'Accessories',
    icon: '🎀',
  },
  {
    name: 'Pet Care Products',
    category: 'Care-products',
    icon: '🧴',
  },
];

const CategoryCards = () => {
  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-36">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Browse by Category
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.name}
            to={`/category-filtered-product/${encodeURIComponent(cat.category)}`}
          >
            <div className="card bg-base-200 shadow-lg hover:shadow-xl transition-all p-6 flex flex-col items-center justify-center h-40 text-center">
              <span className="text-4xl mb-2">{cat.icon}</span>
              <h3 className="font-semibold text-lg">{cat.category}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCards;

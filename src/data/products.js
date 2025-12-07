import pets1 from "../assets/pet11.jpg";
import pets2 from "../assets/pets22.jpg";
import pets3 from "../assets/pets33.jpg";

import food1 from "../assets/dog food.jpg";
import food2 from "../assets/cat ffod.jpg";
import food3 from "../assets/bird.jpg";

import accs1 from "../assets/dogleash.jpg";
import accs2 from "../assets/catbelt.jpg";
import accs3 from "../assets/petbed.jpg";

import care1 from "../assets/shampoo.jpg";
import care2 from "../assets/brush.jpg";
import care3 from "../assets/paste.jpg";

export const products = [
  // Pets (Adoption)
  { id: "1", name: "Golden Retriever cat and dog", description: "Friendly dog", price: 200, image: pets1, category: "Pets (Adoption)" },
  { id: "2", name: "Persian Cat and dog", description: "Fluffy cat", price: 150, image: pets2, category: "Pets (Adoption)" },
  { id: "3", name: "kitty cat and dog", description: "Friendly kitten", price: 50, image: pets3, category: "Pets (Adoption)" },

  // Pet Food
  { id: "4", name: "Dog Food - Chicken", description: "Healthy dog food", price: 20, image: food1, category: "Pet Food" },
  { id: "5", name: "Cat Food - Salmon", description: "Nutritious cat food", price: 18, image: food2, category: "Pet Food" },
  { id: "6", name: "Bird Seeds Mix", description: "Rich in nutrients", price: 12, image: food3, category: "Pet Food" },

  // Accessories
  { id: "7", name: "Dog Leash", description: "Comfortable leash", price: 15, image: accs1, category: "Accessories" },
  { id: "8", name: "Cat Collar", description: "Colorful collar", price: 10, image: accs2, category: "Accessories" },
  { id: "9", name: "Pet Bed", description: "Soft and cozy", price: 40, image: accs3, category: "Accessories" },

  // Pet Care Products
  { id: "10", name: "Dog Shampoo", description: "Soft and clean", price: 12, image: care1, category: "Pet Care Products" },
  { id: "11", name: "Cat Grooming Brush", description: "Easy brushing", price: 8, image: care2, category: "Pet Care Products" },
  { id: "12", name: "Pet Toothpaste", description: "Fresh breath", price: 6, image: care3, category: "Pet Care Products" },
];

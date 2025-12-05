import React, { useContext } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const AddService = () => {


    
        const {user} = useContext(AuthContext)



    const handleSubmit = (e)=>{

        
        

        e.preventDefault();

        const form = e.target;

        const name = form.petName.value;
        const category = form.category.value;
        const price = parseInt(form.price.value);
        const location = form.location.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = form.date.value;
        const email = form.email.value;


        const formData = {
            name, 
            category,
            price,
            location,
            description,
            image,
            date,
            email,

        }

        console.log(formData);
        axios.post('http://localhost:3000/services', formData)
        .then(res=>{
            console.log(res);
        })

    }





    return (
       <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl p-6 mt-8 my-12">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Pet Name */}
        <div>
          <label className="block mb-1 font-medium">Product/Pet Name</label>
          <input
            type="text"
            name="petName"
            required
            className="w-full input input-bordered rounded-lg"
            placeholder="Enter name"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            className="w-full select select-bordered rounded-lg"
          >
            <option value="pets">Pets</option>
            <option value="food">Food</option>
            <option value="accessories">Accessories</option>
            <option value="care-products">Care Products</option>
          </select>
        </div>

        {/* Price */}
        <div >
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            name="price"
            className={`w-full border rounded-lg px-3 py-2`}
            min="0"
            required
          />
         
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            className="w-full input input-bordered rounded-lg"
            placeholder="Enter location"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            required
            className="w-full textarea textarea-bordered rounded-lg"
            placeholder="Enter description"
          ></textarea>
        </div>

        {/* Image URL */}
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="image"
            required
            className="w-full input input-bordered rounded-lg"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium">Pick-up Date</label>
          <input
            type="date"
            name="date"
            required
            className="w-full input input-bordered rounded-lg"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            value={user?.email}
            type="email"
            name="email"
            readOnly
            
            className="w-full input input-bordered rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Submit Button */}
        <button className="btn btn-primary w-full mt-4">Submit</button>
      </form>
    </div>
    );
};

export default AddService;
// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router";
// import { AuthContext } from "../Provider/AuthProvider";
// import axios from "axios";
// import toast from "react-hot-toast";

// const ServiceDetails = () => {
//   const [service, setService] = useState([]);
//   const { id } = useParams();

//   const { user } = useContext(AuthContext);

//   // useEffect(() => {
//   //   fetch(`https://paw-mart-two.vercel.app/services/${id}`)
//   //     .then((res) => res.json())
//   //     .then((data) => setService(data))
//   //     .catch((err) => console.log(err));
//   // }, [id]);

//   // API base URL
//   const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

//   // Fetch services based on category and search
//   useEffect(() => {
//     let url = `/api/services?${id}`;

//     fetch(url)
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => setService(data))
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         // Optionally show error message to user
//       });
//   }, [API_BASE_URL, id]);

//   const handleOrder = (e) => {
//     e.preventDefault();
//     const form = e.target;

//     const productName = form.productName.value;
//     const buyerName = form.buyerName.value;
//     const buyerEmail = form.buyerEmail.value;
//     const quantity = parseInt(form.quantity.value);
//     const price = parseInt(form.price.value);
//     const address = form.address.value;
//     const phone = form.phone.value;
//     const note = form.note.value;

//     const formData = {
//       productId: id,

//       productName,
//       buyerName,
//       buyerEmail,
//       quantity,
//       price,
//       address,
//       phone,
//       note,
//       date: new Date(),
//     };

//     axios
//       // .post("https://paw-mart-two.vercel.app/orders", formData)
//       .post(`/api/services/orders`, formData)
//       .then((res) => {
//         console.log(res);
//         toast.success("Order Placed Successfully!");

//         document.getElementById("my_modal_3").close();
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-8 space-y-6 text-center">
//       <title>Product Details</title>
//       <img
//         className="w-full max-w-md rounded-lg shadow-md object-cover"
//         src={service?.image}
//         alt=""
//       />

//       {/* modal */}

//       <button
//         className="btn"
//         onClick={() => document.getElementById("my_modal_3").showModal()}
//       >
//         Adapt/Order
//       </button>
//       <dialog id="my_modal_3" className="modal">
//         <div className="modal-box">
//           <form method="dialog">
//             <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
//               ✕
//             </button>
//           </form>

//           <form
//             onSubmit={handleOrder}
//             className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
//           >
//             <legend className="fieldset-legend">Order details</legend>

//             <label className="label">Product Name</label>
//             <input
//               readOnly
//               defaultValue={service?.name}
//               type="text"
//               name="productName"
//               className="input"
//               placeholder="product name"
//             />

//             <label className="label">Buyer Name</label>
//             <input
//               defaultValue={user?.displayName}
//               type="text"
//               name="buyerName"
//               className="input"
//               placeholder="Buyer Name"
//             />

//             <label className="label">Buyer Email</label>
//             <input
//               readOnly
//               defaultValue={user?.email}
//               type="email"
//               name="buyerEmail"
//               className="input"
//               placeholder="buyer Email"
//             />

//             <label className="label">Quantity</label>
//             <input
//               required
//               type="number"
//               className="input"
//               name="quantity"
//               placeholder="quantity"
//             />

//             <label className="label">Price</label>
//             <input
//               readOnly
//               defaultValue={service?.price}
//               type="number"
//               name="price"
//               className="input"
//               placeholder="price"
//             />

//             <label className="label">Address</label>
//             <input
//               required
//               type="text"
//               name="address"
//               className="input"
//               placeholder="Address"
//             />

//             <label className="label">Phone</label>
//             <input
//               required
//               type="text"
//               name="phone"
//               className="input"
//               placeholder="phone"
//             />

//             <label className="label">Additional Note</label>
//             <textarea
//               type="text"
//               name="note"
//               className="input"
//               placeholder="Additional Note"
//             />

//             <button type="submit" className="btn btn-primary">
//               Order
//             </button>
//           </form>
//         </div>
//       </dialog>

//       <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl">
//         {service?.description}
//       </p>
//     </div>
//   );
// };

// export default ServiceDetails;

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";

const ServiceDetails = () => {
  const [service, setService] = useState(null); // null দিয়ে শুরু করুন, [] না
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  // API base URL
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch single service by ID
  useEffect(() => {
    // Method 1: Direct fetch (use this if proxy not working)
    // let url = `${API_BASE_URL}/services/${id}`;

    // Method 2: Using proxy (if you have vite proxy setup)
    let url = `/api/services/${id}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("Service data:", data); // Debugging জন্য
        setService(data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        // Optionally show error message to user
      });
  }, [id, API_BASE_URL]);

  const handleOrder = (e) => {
    e.preventDefault();
    const form = e.target;

    const productName = form.productName.value;
    const buyerName = form.buyerName.value;
    const buyerEmail = form.buyerEmail.value;
    const quantity = parseInt(form.quantity.value);
    const price = parseInt(form.price.value);
    const address = form.address.value;
    const phone = form.phone.value;
    const note = form.note.value;

    const formData = {
      productId: id,
      productName,
      buyerName,
      buyerEmail,
      quantity,
      price,
      address,
      phone,
      note,
      date: new Date(),
    };

    // Method 1: Direct axios call
    // axios.post(`${API_BASE_URL}/orders`, formData)

    // Method 2: Using proxy
    axios
      .post(`/api/orders`, formData)
      .then((res) => {
        console.log(res);
        toast.success("Order Placed Successfully!");
        document.getElementById("my_modal_3").close();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to place order!");
      });
  };

  // Loading state
  if (!service) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-4">Loading product details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <title>{service?.name} - Product Details | PawMart</title>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2">
          <img
            className="w-full h-auto max-h-[500px] rounded-lg shadow-lg object-cover"
            src={service?.image}
            alt={service?.name}
          />
        </div>

        {/* Details Section */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {service?.name}
          </h1>

          <div className="mb-6">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-bold text-primary">
                ${service?.price}
              </span>
              <span className="badge badge-primary">{service?.category}</span>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-2">Description</h3>
              <p className="text-gray-600 whitespace-pre-line">
                {service?.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-base-100 p-4 rounded-lg">
              <h4 className="font-semibold">Product ID</h4>
              <p className="text-sm text-gray-500">{service?._id}</p>
            </div>
            <div className="bg-base-100 p-4 rounded-lg">
              <h4 className="font-semibold">Category</h4>
              <p className="text-sm text-gray-500 capitalize">
                {service?.category}
              </p>
            </div>
          </div>

          {/* Order Button */}
          <div className="mt-8">
            <button
              className="btn btn-primary btn-lg w-full"
              onClick={() => document.getElementById("my_modal_3").showModal()}
              disabled={!user}
            >
              {user ? "Adapt/Order Now" : "Login to Order"}
            </button>

            {!user && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please login to place an order
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-3xl">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>

          <h3 className="font-bold text-lg mb-4">
            Order Form - {service?.name}
          </h3>

          <form onSubmit={handleOrder} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Product Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  readOnly
                  defaultValue={service?.name}
                  name="productName"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  readOnly
                  defaultValue={service?.price}
                  name="price"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Buyer Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  defaultValue={user?.displayName || ""}
                  name="buyerName"
                  className="input input-bordered"
                  placeholder="Enter your name"
                  required
                />
              </div>

              {/* Buyer Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  readOnly
                  defaultValue={user?.email || ""}
                  name="buyerEmail"
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Quantity */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  className="input input-bordered"
                  placeholder="1"
                  min="1"
                  defaultValue="1"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="input input-bordered"
                  placeholder="+8801XXXXXXXXX"
                  required
                />
              </div>
            </div>

            {/* Address */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Delivery Address</span>
              </label>
              <textarea
                name="address"
                className="textarea textarea-bordered h-24"
                placeholder="Enter full delivery address"
                required
              />
            </div>

            {/* Additional Note */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Additional Note (Optional)</span>
              </label>
              <textarea
                name="note"
                className="textarea textarea-bordered h-20"
                placeholder="Any special instructions?"
              />
            </div>

            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Order
              </button>
            </div>
          </form>
        </div>

        {/* Modal backdrop */}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ServiceDetails;

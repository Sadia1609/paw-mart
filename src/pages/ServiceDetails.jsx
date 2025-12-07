import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import axios from 'axios';

const ServiceDetails = () => {
     const [service, setService] = useState([]);
    const {id} = useParams()

    const {user} = useContext(AuthContext)




   
    
        
          useEffect(() => {
            fetch(`http://localhost:3000/services/${id}`)
              .then(res => res.json())
              .then(data => setService(data))
              .catch(err => console.log(err));
          }, [id]);

          const handleOrder = (e)=>{
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
              date: new Date()

            }

            axios.post('http://localhost:3000/orders', formData)
            .then(res=>{
              console.log(res);
              
            })
            .catch(err=>{
              console.log(err)
            })


          }

         
    return (
        <div className="flex flex-col items-center px-4 sm:px-8 md:px-16 py-8 space-y-6 text-center">
  <img
    className="w-full max-w-md rounded-lg shadow-md object-cover"
    src={service?.image}
    alt=""
  />
  

  {/* modal */}
  {/* You can open the modal using document.getElementById('ID').showModal() method */}
<button className="btn" onClick={()=>document.getElementById('my_modal_3').showModal()}>Adapt/Order</button>
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>


    {/* form copied form daisy */}
    <form onSubmit={handleOrder} className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
  <legend className="fieldset-legend">Order details</legend>

  <label className="label">Product Name</label>
  <input readOnly defaultValue={service?.name} type="text" name='productName' className="input" placeholder="product name" />

  <label className="label">Buyer Name</label>
  <input defaultValue={user?.displayName} type="text" name='buyerName' className="input" placeholder="Buyer Name" />

  <label className="label">Buyer Email</label>
  <input readOnly defaultValue={user?.email} type="email" name='buyerEmail' className="input" placeholder="buyer Email" />

  <label className="label">Quantity</label>
  <input required type="number" className="input" name='quantity' placeholder="quantity" />

  <label className="label">Price</label>
  <input readOnly defaultValue={service?.price} type="number" name='price' className="input" placeholder="price" />

  <label className="label">Address</label>
  <input required type="text" name='address' className="input" placeholder="Address" />

  <label className="label">Phone</label>
  <input required type="text"  name='phone' className="input" placeholder="phone" />

  <label className="label">Additional Note</label>
  <textarea type="text" name='note' className="input" placeholder="Additional Note" />

  <button type='submit' className="btn btn-primary">Order</button>
</form>
   
  </div>
</dialog>


  <p className="text-gray-700 text-base sm:text-lg md:text-xl max-w-2xl">
    {service?.description}
  </p>
</div>

    );
};

export default ServiceDetails;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Link } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const MyServices = () => {
  const [myServices, setMyServices] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`https://paw-mart-two.vercel.app/my-services?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyServices(data))
      .catch((err) => console.log(err));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://paw-mart-two.vercel.app/delete/${id}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.deletedCount == 1) {
              const filterData = myServices.filter(
                (service) => service._id !== id
              );
              setMyServices(filterData);

              Swal.fire(
                "Deleted!",
                "Your service has been deleted.",
                "success"
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  };

  return (
    <div>
      <title>My Listings</title>
      <h2>My Listings</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myServices?.map((service) => (
              <tr key={service._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={service.image} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.name}</div>
                    </div>
                  </div>
                </td>

                <td>{service.description}</td>
                <td>{service.price}</td>

                <td className="flex gap-3">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="btn btn-error btn-xs"
                  >
                    Delete
                  </button>

                  <Link to={`/update-services/${service._id}`}>
                    <button className="btn btn-primary btn-xs">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyServices;

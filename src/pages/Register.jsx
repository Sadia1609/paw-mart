import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import auth from "../firebase/firebase.config";
import { FcGoogle } from "react-icons/fc";

import toast from "react-hot-toast";

const Register = () => {
  const { registerWithEmailPassword, setUser, user, handleGoogleSignin } =
    useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl.value;
    console.log(name, photoUrl);
    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      return alert("less than 6 characters");
    }
    if (!uppercase.test(pass)) {
      return alert("need a uppercase");
    }
    if (!lowercase.test(pass)) {
      return alert("need a lowercase");
    }

    registerWithEmailPassword(email, pass)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoUrl,
        })
          .then(() => {
            setUser(userCredential.user);

            toast.success("Account created successfully!");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Failed to update profile.");
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  console.log(user);

  const googleSignup = () => {
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <title>Register</title>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleSubmit} className="fieldset">
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  placeholder="your full name"
                />

                <label className="label">PhotoUrl</label>
                <input
                  name="photoUrl"
                  type="text"
                  className="input"
                  placeholder="Enter your photo url"
                />

                <label className="label">Password</label>
                <input
                  name="password"
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>

                <button onClick={googleSignup} className="btn">
                  <FcGoogle />
                </button>

                <div>
                  <span>Already have an account? </span>
                  <Link to={"/login"} className="text-blue-500">
                    Login
                  </Link>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

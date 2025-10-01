import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../Firebase_init";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password, terms);

    setSuccess(false);
    setErrorMessage("");

    if (!terms) {
      setErrorMessage("Please accept Our Terms and Conditions");
      return;
    }

    //password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        "password must have one lowercase one degit and 6 characters or longer."
      );
      return;
    }

    // Create User
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result);

        // email verify

        sendEmailVerification(auth.currentUser).then(() => {
          setSuccess(true);
          alert("We sent you a verification email. Please check your email");
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  const [show, setShow] = useState(false);

  return (
    <div className="card mx-auto mt-10 bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl text-center font-bold">Please Sign Up Now</h1>
        <form onSubmit={handleSignUp}>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              name="password"
              className="input"
              placeholder="Password"
            />
            <button
              onClick={() => setShow(!show)}
              className="btn btn-xs  absolute top-2 right-6"
            >
              {show ? <FaRegEyeSlash size={15} /> : <FaEye size={15} />}
            </button>
          </div>
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>

          <label className="label mt-2">
            <input
              type="checkbox"
              name="terms"
              defaultChecked
              className="checkbox"
            />
            Accept Terms and Conditions
          </label>

          <br />

          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
        <p>
          Already have an Account ? Please{" "}
          <Link className="underline text-blue-600 font-bold" to="/login">
            Login
          </Link>
        </p>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && (
          <p className="text-green-500">User has created Successfully</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;

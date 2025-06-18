import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firbase.init";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  // const handleEye = () => {
  //   console.log("object");
  //   setShowPassword(!showPassword);
  // };
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log(email, password,terms);

    setSuccess(false);
    setErrorMassage("");

    if(!terms){
      setErrorMassage('please accept our Terms and Conditions');
      return;
    }

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if (passwordRegExp.test(password) === false) {
      setErrorMassage("Wrong Password");
      return;
    }

    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        setSuccess(true);
      })
      .catch((error) => {
        console.log(error);
        setErrorMassage(error.message);
      });
  };
  return (
    <div className="card mt-10 bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-3xl font-bold">Please Sign Up Now!</h1>
        <form onSubmit={handleSignup}>
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />
          <label className="label">Password</label>

          <div className={`relative`}>
            <input
              type={showPassword ?"text":"password" }
              name="password"
              className="input"
              placeholder="Password"
            />

            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="btn btn-xs absolute right-6 top-2"
            >
              {showPassword ? <FaRegEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>


          
          <label className="label mt-2">
            <input type="checkbox" name="terms" className="checkbox" />
            Accept Term an Conditions
          </label>
          <br />


          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
        <p>Already have an account? Please <Link className="text-blue-400 underline" to='/login'>Login</Link></p>
        {errorMassage && <p className="text-red-500">{errorMassage}</p>}
        {success && (
          <p className="text-green-500">User has create account successfully</p>
        )}
      </div>
    </div>
  );
};

export default Signup;

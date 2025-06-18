import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firbase.init";

const Signup = () => {
  const [success, setSuccess] = useState(false);
  const [errorMassage, setErrorMassage] = useState("");
  const handleSignup = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    setSuccess(false);
    setErrorMassage("");

    // password validate
    const passwordRegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    if(passwordRegExp.test(password)===false){
     setErrorMassage('Wrong Password')
     return
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
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Sign Up</button>
        </form>
        {errorMassage && <p className="text-red-500">{errorMassage}</p>}
        {success && (
          <p className="text-green-500">User has create account successfully</p>
        )}
      </div>
    </div>
  );
};

export default Signup;

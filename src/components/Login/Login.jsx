import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { auth } from "../../firebase/firbase.init";
import { Link } from "react-router";

const Login = () => {
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef();

  const handleForgetPassword = () => {
    console.log(emailRef.current.value);
    const email = emailRef.current.value;

    setErrorMessage('')
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("A password reset email is sent.Please check your email ");
      })
      .catch((error) => {
        setErrorMessage(error.message)
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    // reset
    setSuccess(false);
    setErrorMessage("");
    // login user

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (!userCredential.user.emailVerified) {
          alert("Please verify your email address");
        } else {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="card bg-base-100 mt-10 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-5xl font-bold">Login now!</h1>
        <form onSubmit={handleLogin} className="fieldset">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
            ref={emailRef}
          />
          <label className="label">Password</label>
          <input
            type="password"
            name="password"
            className="input"
            placeholder="Password"
          />
          <div>
            <a onClick={handleForgetPassword} className="link link-hover">
              Forgot password?
            </a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </form>
        <p>
          New to this Website? Please{" "}
          <Link className="text-blue-400 underline" to="/signup">
            Sign Up
          </Link>
        </p>
        {errorMessage && (
          <p className="text-red-500 font-bold">{errorMessage}</p>
        )}
        {success && (
          <p className="text-green-500 font-bold">User login SuccessFully</p>
        )}
      </div>
    </div>
  );
};

export default Login;

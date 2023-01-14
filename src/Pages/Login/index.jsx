import React from "react";
import { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("user", user);
        if (user.accessToken) {
          navigate("/dashboard");
        } else {
          setError("");
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };
  return (
    <div className="conatiner">
      <div className="card login-card">
        <div className="card-body">
          <h1 className="d-flex justify-content-center">LOGIN</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputEmail1">Email</label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary">
                LOGIN
              </button>
            </div>
            {error && (
              <div className="text-center mt-5 text-danger">{error}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

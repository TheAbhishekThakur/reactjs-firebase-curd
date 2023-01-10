import React from "react";
import { useState } from "react";
import "./Login.css";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../config/firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("user", user)
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="conatiner">
      <div className="card login-card">
        <div className="card-body">
          <h1 className="d-flex justify-content-center">LOGIN</h1>
          <form onSubmit={onSubmit}>
            <div class="form-group mb-3">
              <label for="exampleInputEmail1">Email</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="abc@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="exampleInputPassword1">Password</label>
              <input
                type="password"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary">
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

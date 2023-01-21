import React, { useState } from "react";
import "./AddUser.css";
import Layout from "../../Components/Layout";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { RxAvatar } from "react-icons/rx";

function AddNewUser() {
  const [file, setFile] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    country: "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    // To Insert data in Table
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password
      );
      if (response) {
        // For Create New Table
        await setDoc(doc(db, "users", response.user.uid), {
          username: userData.username,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          password: userData.password,
          address: userData.address,
          country: userData.country,
          timeStamp: serverTimestamp(),
        });
        //   const formData = new FormData();
        //   formData.append("image", file);
        // const res = await addDoc(collection(db, "users"), {
        //   username: userData.username,
        //   name: userData.name,
        //   email: userData.email,
        //   phone: userData.phone,
        //   password: userData.password,
        //   address: userData.address,
        //   country: userData.country,
        //   timeStamp: serverTimestamp(),
        // });
        // console.log("res", res);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      <div className="container pt-4 pb-4 card">
        <div className="d-flex justify-content-center aligin-item-center">
          <h3>Add New User</h3>
        </div>
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="avatar-con">
              <div className="avatar">
                <RxAvatar className="avatar-logo" />
              </div>
            </div>
          </div>
          <div className="col-md-8">
            <form onSubmit={onSubmit}>
              <div className="row g-3 mb-3">
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="image"
                    aria-label="exampleFormControlInput1"
                    // required
                    // value={file}
                    // onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput2"
                    className="form-label"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="jhon_doe"
                    aria-label="exampleFormControlInput2"
                    required
                    value={userData.username}
                    onChange={(e) => {
                      setUserData({ ...userData, username: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput3"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Jhon Doe"
                    aria-label="exampleFormControlInput3"
                    required
                    value={userData.name}
                    onChange={(e) => {
                      setUserData({ ...userData, name: e.target.value });
                    }}
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput4"
                    className="form-label"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="jhon_doe@gmail.com"
                    aria-label="exampleFormControlInput4"
                    required
                    value={userData.email}
                    onChange={(e) => {
                      setUserData({ ...userData, email: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput5"
                    className="form-label"
                  >
                    Phone
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="+12345 65678"
                    aria-label="exampleFormControlInput5"
                    required
                    value={userData.phone}
                    onChange={(e) => {
                      setUserData({ ...userData, phone: e.target.value });
                    }}
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput6"
                    className="form-label"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder=""
                    aria-label="exampleFormControlInput6"
                    required
                    value={userData.password}
                    onChange={(e) => {
                      setUserData({ ...userData, password: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row g-3 mb-3">
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput7"
                    className="form-label"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Noid, 1st cross"
                    aria-label="exampleFormControlInput7"
                    required
                    value={userData.address}
                    onChange={(e) => {
                      setUserData({ ...userData, address: e.target.value });
                    }}
                  />
                </div>
                <div className="col">
                  <label
                    htmlFor="exampleFormControlInput8"
                    className="form-label"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="India"
                    aria-label="exampleFormControlInput8"
                    required
                    value={userData.country}
                    onChange={(e) => {
                      setUserData({ ...userData, country: e.target.value });
                    }}
                  />
                </div>
              </div>
              <div className="row text-center mt-5">
                <div className="col-md-12">
                  <button type="submit" className="btn btn-primary">
                    ADD USER
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AddNewUser;

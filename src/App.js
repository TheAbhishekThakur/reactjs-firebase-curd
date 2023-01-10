import React, { useState, useEffect } from "react";
import "./App.css";
import { db } from "./config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      let res = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setUsers(res);
    };
    getUsers();
  }, []);

  console.log(users);

  const createUser = async (e) => {
    e.preventDefault();
    let data = await addDoc(usersCollectionRef, {
      name: name,
      age: Number(age),
    });
  };

  const updateUser = async (id, age) => {
    let payload = {
      age: age + 1,
    };
    const userDoc = doc(db, "users", id);
    const updatedData = await updateDoc(userDoc, payload);
    console.log(updatedData);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    const deleteData = await deleteDoc(userDoc);
  };

  return (
    <div className="App">
      <h1>React Firebase CURD</h1>
      <form onSubmit={(e) => createUser(e)}>
        <input
          type="text"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Enter Age..."
          value={age}
          onChange={(e) => setAge(e.target.value)}
          maxLength="10"
          required
        />
        <button type="submit">Create User</button>
      </form>
      <ul>
        {users.length > 0
          ? users.map((item, index) => (
              <li key={index}>
                Name :- <span>{item.name}</span>,&nbsp;&nbsp;&nbsp; Age :-{" "}
                <span>{item.age}</span>
                <br />
                <button onClick={() => updateUser(item.id, item.age)}>
                  Increase Age
                </button>
                <br />
                <button onClick={() => deleteUser(item.id)}>Delete user</button>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import DataTable from "react-data-table-component";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

function UserList() {
  const [users, setUsers] = useState([]);

  const checkStatus = (value) => {
    if (value === "active") {
      return <span className="badge rounded-pill bg-primary">Active</span>;
    } else if (value === "passive") {
      return <span className="badge rounded-pill bg-danger">Passive</span>;
    } else {
      return (
        <span className="badge rounded-pill bg-warning text-dark">Pending</span>
      );
    }
  };

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
    },
    {
      name: "User",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Age",
      selector: (row) => "0",
    },
    {
      name: "Status",
      selector: (row) => checkStatus(row.status),
    },
    {
      name: "Action",
      selector: (row) => (
        <div>
          <button type="button" className="btn btn-outline-primary">
            EDIT
          </button>
          &nbsp;&nbsp;
          <button type="button" className="btn btn-outline-danger">
            DELETE
          </button>
        </div>
      ),
    },
  ];

  const fetchUserList = async () => {
    try {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setUsers(list);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <div>
      <Layout>
        <div className="card m-5">
          <DataTable columns={columns} data={users} />
        </div>
      </Layout>
    </div>
  );
}

export default UserList;

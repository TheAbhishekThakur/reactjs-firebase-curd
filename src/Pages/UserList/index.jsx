import * as React from "react";
import { useState, useEffect } from "react";
import Layout from "../../Components/Layout";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import Button from '@mui/material/Button';

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
    { field: "id", headerName: "ID", width: 150 },
    {
      field: "name",
      headerName: "Name",
      width: 160,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: true,
    },
    {
      field: "phone",
      headerName: "Phone",
      type: "number",
      width: 120,
      editable: true,
    },
    {
      field: "country",
      headerName: "Country",
      type: "string",
      width: 150,
    },
    {
      field: "address",
      headerName: "Address",
      type: "string",
      width: 120,
    },
    {
      field: "",
      headerName: "Action",
      type: "",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="outlined"
            size="small"
            tabIndex={params.hasFocus ? 0 : -1}
          >
            VIEW
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            style={{ marginLeft: 10 }}
            tabIndex={params.hasFocus ? 0 : -1}
          >
            DELETE
          </Button>
        </>
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
        <Container>
          <Box sx={{ height: 400, width: "100%", marginTop: "50px" }}>
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h5" component="div">
                USER LIST
              </Typography>
              <Button sx={{ alignItems: "flex-end" }} variant="contained">ADD USER</Button>
            </Box>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </Container>
      </Layout>
    </div>
  );
}

export default UserList;

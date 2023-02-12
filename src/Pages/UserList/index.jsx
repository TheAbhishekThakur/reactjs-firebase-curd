import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { Container } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import {
  Typography,
  Box,
  Button,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Layout from "../../Components/Layout";

function UserList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const gotoAddNewUser = () => {
    navigate("/user/add");
  };

  const gotoUserDetails = (id) => {
    navigate(`/user/${id}`);
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
            onClick={() => gotoUserDetails(params.id)}
          >
            VIEW
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            style={{ marginLeft: 10 }}
            tabIndex={params.hasFocus ? 0 : -1}
            onClick={() => setShowDeleteModal(true)}
          >
            DELETE
          </Button>
        </>
      ),
    },
  ];

  const deleteUser = () => {};

  const fetchUserList = async () => {
    try {
      const list = [];
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      setShowLoader(false);
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
        {showLoader && <LinearProgress />}
        <Container>
          <Box sx={{ height: 400, width: "100%", marginTop: "50px" }}>
            <Box sx={{ display: "flex", marginBottom: "20px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" component="div">
                  USER LIST
                </Typography>
              </Box>
              <Box>
                <Button variant="contained" onClick={gotoAddNewUser}>
                  ADD USER
                </Button>
              </Box>
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
        <Dialog
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to want to delete this user?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description"></DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={deleteUser}
            >
              YES
            </Button>
            <Button
              variant="outlined"
              onClick={() => setShowDeleteModal(false)}
            >
              CANCEL
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </div>
  );
}

export default UserList;

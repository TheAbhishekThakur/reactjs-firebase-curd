import React, { useState, useEffect, useLayoutEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import {
  Box,
  TextField,
  Button,
  Typography,
  LinearProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Layout from "../../Components/Layout";

function ViewUser() {
  const { userId } = useParams();
  const [userData, setUserData] = useState({});
  const [name, setName] = useState("")
  const [showLoader, setShowLoader] = useState(true);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();

  const Row = styled(Box)(({ theme }) => ({
    marginTop: "30px",
  }));

  const AddContainer = styled(Box)(({ theme }) => ({
    padding: "30px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  }));

  const getUserDetails = async () => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    setShowLoader(false);
    if (docSnap.exists()) {
      setUserData(docSnap.data());
      console.log("hgh",docSnap.data());
      setName()
    } else {
      console.error("No such document!");
    }
  };

  console.log("userData", userData);

  useEffect(() => {
    getUserDetails();
  }, []);

  const onSubmit = async (data) => {
    console.log("data", data);
    // To Update data in Table
    try {
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Layout>
      {showLoader ? (
        <>
          <LinearProgress />
          <Typography sx={{ textAlign: "center" }}>Loading...</Typography> 
        </>
      ) : (
        <Container sx={{ paddingTop: "30px" }}>
          <AddContainer>
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              USER DETAILS
            </Typography>
            <Box sx={{ display: "flex" }}>
              <Box flex={4}></Box>
              <Box flex={8}>
                <Row>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Box flex={6}>
                      <TextField
                        type="text"
                        label="Name"
                        name="name"
                        defaultValue={userData.name}
                        variant="filled"
                        fullWidth
                        {...register("name", { required: true })}
                        error={Boolean(errors.name)}
                      />
                    </Box>
                    <Box flex={6}>
                      <TextField
                        type="email"
                        label="Email"
                        variant="filled"
                        defaultValue={userData.email}
                        name="email"
                        fullWidth
                        {...register("email", { required: true })}
                        error={Boolean(errors.email)}
                      />
                    </Box>
                  </Box>
                </Row>
                <Row>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Box flex={6}>
                      <TextField
                        type="text"
                        name="username"
                        defaultValue={userData.username}
                        fullWidth
                        label="Username"
                        variant="filled"
                        {...register("username", { required: true })}
                        error={Boolean(errors.username)}
                      />
                    </Box>
                    <Box flex={6}>
                      <TextField
                        type="phone"
                        label="Phone"
                        variant="filled"
                        name="phone"
                        defaultValue={userData.phone}
                        fullWidth
                        {...register("phone", { required: true })}
                        error={Boolean(errors.email)}
                      />
                    </Box>
                  </Box>
                </Row>
                <Row>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Box flex={6}>
                      <TextField
                        type="text"
                        label="Address"
                        variant="filled"
                        name="address"
                        defaultValue={userData.address}
                        fullWidth
                        {...register("address", { required: true })}
                        error={Boolean(errors.address)}
                      />
                    </Box>
                    <Box flex={6}>
                      <TextField
                        type="text"
                        label="Country"
                        variant="filled"
                        fullWidth
                        defaultValue={userData.country}
                        name="country"
                        {...register("country", { required: true })}
                        error={Boolean(errors.country)}
                      />
                    </Box>
                  </Box>
                </Row>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "30px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    UPDATE USER
                  </Button>
                </Box>
              </Box>
            </Box>
          </AddContainer>
        </Container>
      )}
    </Layout>
  );
}

export default ViewUser;

import React, { useState } from "react";
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
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";


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
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const Row = styled(Box)(({ theme }) => ({
    marginTop: "30px",
  }));

  // const AvatarContainer = styled(Box)(({ theme }) => ({
  //   position: "absolute",
  //   top: "50%",
  //   left: "50%",
  //   "-ms-transform": "translateX(-50%) translateY(-50%)",
  //   "-webkit-transform": "translate(-50%,-50%)",
  //   transform: "translate(-50%,-50%)",
  // }));

  const AddContainer = styled(Box)(({ theme }) => ({
    padding: "30px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  }));

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
  console.log("userData", userData);
  return (
    <Layout>
      <Container sx={{ paddingTop: "30px" }}>
        <AddContainer>
          <Typography variant="h6" sx={{ textAlign: "center" }}>ADD NEW USER</Typography>
          <Box sx={{ display: "flex" }}>
            <Box flex={4}>{/* <AvatarContainer>gdfg</AvatarContainer> */}</Box>
            <Box flex={8}>
              {/* <FormControl variant="standard"> */}
              <Row>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box flex={6}>
                    <TextField
                      type="file"
                      label=""
                      variant="outlined"
                      fullWidth
                      // required
                      // onChange={(e)=>setFile(e.target.files[0])}
                    />
                  </Box>
                  <Box flex={6}>
                    <TextField
                      type="text"
                      label="Username"
                      variant="outlined"
                      fullWidth
                      value={userData.username}
                      onChange={(e) => {
                        setUserData({...userData, username: e.target.value})
                      }}
                    />
                  </Box>
                </Box>
              </Row>
              <Row>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box flex={6}>
                    <TextField
                      type="text"
                      label="Name"
                      variant="outlined"
                      fullWidth
                      value={userData.name}
                      onChange={(e) => {
                        setUserData({...userData, name: e.target.value})
                      }}
                    />
                  </Box>
                  <Box flex={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
                      fullWidth
                      value={userData.email}
                      onChange={(e) => {
                        setUserData({...userData, email: e.target.value})
                      }}
                    />
                  </Box>
                </Box>
              </Row>
              <Row>
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Box flex={6}>
                    <TextField
                      type="phone"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      value={userData.phone}
                      onChange={(e) => {
                        setUserData({...userData, phone: e.target.value})
                      }}
                    />
                  </Box>
                  <Box flex={6}>
                    <OutlinedInput
                      fullWidth
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={(e) => {
                        setUserData({...userData, password: e.target.value})
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
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
                      variant="outlined"
                      fullWidth
                      value={userData.address}
                      onChange={(e) => {
                        setUserData({...userData, address: e.target.value})
                      }}
                    />
                  </Box>
                  <Box flex={6}>
                    <TextField
                      type="text"
                      label="Country"
                      variant="outlined"
                      fullWidth
                      value={userData.country}
                      onChange={(e) => {
                        console.log("e")
                        setUserData({...userData, country: e.target.value})
                      }}
                    />
                  </Box>
                </Box>
              </Row>
              {/* </FormControl> */}
              <Box
                sx={{
                  display: "flex",
                  marginTop: "30px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button variant="contained" onClick={onSubmit}>
                  ADD USER
                </Button>
              </Box>
            </Box>
          </Box>
        </AddContainer>
      </Container>
    </Layout>
  );
}

export default AddNewUser;

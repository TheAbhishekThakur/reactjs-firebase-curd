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
import { useForm } from "react-hook-form";


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

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  const onSubmit = async (data) => {
    console.log("data", data);
    // To Insert data in Table
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      if (response) {
        // For Create New Table
        await setDoc(doc(db, "users", response.user.uid), {
          username: data.username,
          name: data.name,
          email: data.email,
          phone: data.phone,
          password: data.password,
          address: data.address,
          country: data.country,
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
                      name="username"
                      fullWidth
                      {...register("username", { required: true })}
                      error={Boolean(errors.username)}
                      // helperText={emailValidate(errors.email?.type)}
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
                      name="name"
                      variant="outlined"
                      fullWidth
                      {...register("name", { required: true })}
                      error={Boolean(errors.name)}
                    />
                  </Box>
                  <Box flex={6}>
                    <TextField
                      type="email"
                      label="Email"
                      variant="outlined"
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
                      type="phone"
                      label="Phone"
                      variant="outlined"
                      name="phone"
                      fullWidth
                      {...register("phone", { required: true })}
                      error={Boolean(errors.email)}
                    />
                  </Box>
                  <Box flex={6}>
                    <OutlinedInput
                      fullWidth
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      {...register("password", { required: true })}
                      error={Boolean(errors.password)}
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
                      name="address"
                      fullWidth
                      {...register("address", { required: true })}
                      error={Boolean(errors.address)}
                    />
                  </Box>
                  <Box flex={6}>
                    <TextField
                      type="text"
                      label="Country"
                      variant="outlined"
                      fullWidth
                      name="country"
                      {...register("country", { required: true })}
                      error={Boolean(errors.country)}
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
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
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

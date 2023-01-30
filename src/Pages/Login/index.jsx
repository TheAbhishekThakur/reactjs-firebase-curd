import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useForm } from "react-hook-form";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const LoginContainer = styled(Box)(({ theme }) => ({
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    padding: "40px",
    width: "400px",
    position: "absolute",
    top: "50%",
    left: "50%",
    msTransform: "translateX(-50%) translateY(-50%)",
    WebkitTransform: "translate(-50%,-50%)",
    transform: "translate(-50%,-50%)",
  }));

  console.log("errors", errors);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
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

  const passWordValidate = (type) => {
    if (type === "required") {
      console.log("type", type);
      return "Password is required.";
    } else if (type === "minLength") {
      return "Password must be greater than 6.";
    } else if (type === "maxLength") {
      return "Password must be less than 20.";
    }
  };
  const emailValidate = (type) => {
    if (type === "required") {
      console.log("type", type);
      return "Email is required.";
    }
  };
  return (
    <Box>
      <LoginContainer>
        <Typography
          sx={{ marginBottom: "20px", textAlign: "center" }}
          variant="h6"
        >
          LOGIN
        </Typography>
        <Box>
          <TextField
            type="email"
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            {...register("email", { required: true })}
            error={Boolean(errors.email)}
            helperText={emailValidate(errors.email?.type)}
          />
        </Box>
        <Box sx={{ marginTop: "30px" }}>
          <TextField
            type="password"
            label="Password"
            name="password"
            variant="outlined"
            fullWidth
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 20,
            })}
            error={Boolean(errors.password)}
            helperText={passWordValidate(errors.password?.type)}
          />
        </Box>
        <Box sx={{ marginTop: "30px", textAlign: "center" }}>
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            LOGIN
          </Button>
        </Box>

        {error && (
          <Box
            sx={{ marginTop: "30px", textAlign: "center", color: "red" }}
            className="text-center mt-5 text-danger"
          >
            {error}
          </Box>
        )}
      </LoginContainer>
    </Box>
  );
};

export default Login;

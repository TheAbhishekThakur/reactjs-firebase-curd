import React from "react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const LoginContainer = styled(Box)(({ theme }) => ({
    "box-shadow": "0 3px 10px rgb(0 0 0 / 0.2)",
    padding: "50px",
    position: "absolute",
    top: "50%",
    left: "50%",
    "-ms-transform": "translateX(-50%) translateY(-50%)",
    "-webkit-transform": "translate(-50%,-50%)",
    transform: "translate(-50%,-50%)",
  }));

  const onSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
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
  return (
    <Box bgcolor="#ccc">
      <LoginContainer>
        <Typography
          sx={{ marginBottom: "20px", textAlign: "center" }}
          variant="h6"
        >
          LOGIN
        </Typography>
        <Box>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            sx={{ width: "320px" }}
          />
        </Box>
        <Box sx={{ marginTop: "30px" }}>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            sx={{ width: "320px" }}
          />
        </Box>
        <Box sx={{ marginTop: "30px", textAlign: "center" }}>
          <Button variant="contained" onClick={onSubmit}>
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

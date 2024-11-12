import { useState } from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

function SignupPage() {
  const [fname, setFname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setPassword(enteredPassword);
    if (enteredPassword.length < 6) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError(true);
      setRegistrationStatus("error");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setRegistrationStatus("ok");
      console.log(userCredential);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        setRegistrationStatus("error");
      } else {
        setRegistrationStatus("error");
      }
    }
  };

  const openLoginComp = () => {
    navigate("/login");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      {registrationStatus === "error" && (
        <Box
          sx={{
            backgroundColor: "red",
            color: "white",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">
            Registration failed. User already exists or password is too short.
          </Typography>
        </Box>
      )}

      {registrationStatus === "ok" ? (
        <Box
          sx={{
            backgroundColor: "green",
            color: "white",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">
            Registration Successful! You can now log in.
          </Typography>
          <Button
            onClick={openLoginComp}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Log In
          </Button>
        </Box>
      ) : (
        <Stack spacing={3} sx={{ marginTop: 2 }}>
          <Typography variant="h4" align="center">
            Sign Up
          </Typography>

          <form onSubmit={createUser}>
            <Stack spacing={2}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                required
              />
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <Typography color="error" variant="body2">
                  Password should be at least 6 characters long.
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Sign Up
              </Button>
            </Stack>
          </form>

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Already Registered?{" "}
              <Button onClick={openLoginComp} color="primary">
                Log In
              </Button>
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default SignupPage;

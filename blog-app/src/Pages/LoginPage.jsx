import { useState } from "react";
import { Box, Stack, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";

const auth = getAuth(app);

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
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

  const loginUser = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setPasswordError(true);
      setLoginStatus("error");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userName = user.displayName || "User";

      console.log("Logged in user:", userName);

      setLoginStatus("ok");
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      if (
        errorCode === "auth/wrong-password" ||
        errorCode === "auth/user-not-found"
      ) {
        setLoginStatus("error");
      } else {
        setLoginStatus("error");
      }
    }
  };

  const openSignupComp = () => {
    navigate("/signup");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      {loginStatus === "error" && (
        <Box
          sx={{
            backgroundColor: "red",
            color: "white",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">
            Login failed. Incorrect email or password.
          </Typography>
        </Box>
      )}

      {loginStatus === "ok" ? (
        <Box
          sx={{
            backgroundColor: "green",
            color: "white",
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Typography variant="body1">
            Login Successful! You are now logged in.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={3} sx={{ marginTop: 2 }}>
          <Typography variant="h4" align="center">
            Log In
          </Typography>

          <form onSubmit={loginUser}>
            <Stack spacing={2}>
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
                Log In
              </Button>
            </Stack>
          </form>

          <Box sx={{ textAlign: "center", marginTop: 2 }}>
            <Typography variant="body2" color="textSecondary">
              Do not have an account?{" "}
              <Button onClick={openSignupComp} color="primary">
                Sign Up
              </Button>
            </Typography>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default LoginPage;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { ACTION_FORGOT_PASSWORD } from "../../utils/config";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import mccImg5 from "../../assets/mcc-corner/5.png";
import "../../styles/globals.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { newPassword, signIn } = useUserHook();

  const [employeeID, setEmployeeID] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleSignIn(persistPassword) {
    let form = new FormData();
    form.append("employee_id", employeeID);
    form.append("password", password);

    if (persistPassword) {
      form.append("persist_password", 1);
    }

    signIn(form, (status, message) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 307) {
          setConfirmPassword(null);
          setLoading(false);
          return setChangePassword(true);
        }

        if (status === 403) {
          setPassword(null);
          setLoading(false);
          return setError(true);
        }

        setLoading(false);
        return console.log(message);
      }

      setLoading(false);
      navigate("/");
    });
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    /**
     * If password is expired.
     */
    if (changePassword) {
      if (password !== confirmPassword) {
        setLoading(false);
        return console.log("Password doesn't match.");
      }

      newPassword(form, (status, message) => {
        if (!(status >= 200 && status < 300)) {
          if (status === 307) {
            setPassword(null);
            setConfirmPassword(null);
            setLoading(false);
            return setChangePassword(true);
          }

          setLoading(false);
          return console.log(message);
        }
      });
    }

    handleSignIn(false);
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "var(--color-systembase-colorsbg-light-100-f9fafb)",
      }}
    >
      <Box sx={{ height: "60%", padding: "15px 2rem" }}>
        <Typography
          variant="h5"
          component="h2"
          color="rgba(15, 87, 33, 1)"
          fontWeight="500"
          sx={{ mb: "1.5rem" }}
          gutterBottom
        >
          Login to One ZCMC
        </Typography>

        {changePassword ? (
          <Typography fontSize={12} sx={{ mb: 4 }}>
            Your password has been expired, though you can still continue to use
            the password for another 3 months if you press continue.
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: 12,
              mb: 4,
              fontFamily: "var(--roboto-font-family)",
              color: "rgba(38,38,38,1)",
            }}
          >
            Protect your account by keeping your credentials private. Never
            share them with anyone.
          </Typography>
        )}

        <form method="POST" onSubmit={submit}>
          {!changePassword && (
            <TextField
              label="Employee ID"
              type="text"
              fullWidth
              sx={{
                fontSize: "14px",
                margin: "normal",
                backgroundColor: "white",
                borderRadius: "10px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                  "& input:-webkit-autofill": {
                    WebkitBoxShadow: "0 0 0 100px white inset",
                    WebkitTextFillColor: "inherit",
                  },
                },
              }}
              color="success"
              value={employeeID}
              onChange={(e) => setEmployeeID(e.target.value)}
              required
            />
          )}
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            color="success"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              fontSize: "14px",
              margin: "normal",
              borderRadius: "10px",
              fontSize: "var(--roboto-font-family)",
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
                "&.Mui-error": {
                  borderColor: "red",
                },
                "& input:-webkit-autofill": {
                  WebkitBoxShadow: "0 0 0 100px white inset",
                  WebkitTextFillColor: "inherit",
                },
              },
            }}
            error={error}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            required
          />
          {changePassword && (
            <TextField
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{
                backgroundColor: "rgb(232,240,254)",
                fontSize: "var(--roboto-font-family)",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {!showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              required
            />
          )}
          <Typography
            variant="body2"
            align="right"
            sx={{
              cursor: "pointer",
              mt: 1,
              color: "rgba(15, 87, 33, 1)",
              fontSize: 11,
              fontWeight: 600,
              fontFamily: "var(--roboto-font-family)",
            }}
            onClick={() => navigate(`/${ACTION_FORGOT_PASSWORD}`)}
          >
            Forgot Password?
          </Typography>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              backgroundColor: "rgba(15, 87, 33, 1)",
              height: "3rem",
              textTransform: "none",
              borderRadius: "10px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px",
              },
              fontSize: "var(--roboto-font-family)",
            }}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Signing in" : "Login"}
          </Button>
        </form>
        <Button
          variant="contained"
          fullWidth
          sx={{
            color: "rgba(15,87,33,1)",
            mt: 2,
            boxShadow: "none",
            textTransform: "none",
            backgroundColor: "rgba(15,87,33,0.08)",
            height: "3rem",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
            fontFamily: "var(--inter-font-family)",
          }}
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Box
          sx={{
            display: "flex",
            marginTop: "2rem",
            backgroundColor: "White",
            boxShadow: "2px",
            boxShadow: "0px 1px 6px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            paddingLeft: 0,
            gap: "1rem",
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
            },
          }}
        >
          <Box sx={{ width: "3.5rem" }}>
            <img src={mccImg5} alt="" height="90%" />
          </Box>
          <Typography
            sx={{
              fontSize: 13,
              color: "rgba(38,38,38,1)",
            }}
          >
            {`At Zamboanga City Medical Center(ZCMC), we are committed to protecting your personal information and ensuring its privacy and security. Read more..`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

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
import {
  ACTION_FORGOT_PASSWORD,
  ACTION_INPUT_OTP,
  ACTION_SIGN_IN,
} from "../../utils/config";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import { useState } from "react";

const ForgotPassword = () => {
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
          return setError(true);
        }

        return console.log(message);
      }

      setLoading(false);
      navigate("/");
    });
  }

  function submit(e) {
    e.preventDefault();

    navigate(`/${ACTION_INPUT_OTP}`);

    /**
     * If password is expired.
     */
    // if (changePassword) {
    //   if (password !== confirmPassword) {
    //     setLoading(false);
    //     return console.log("Password doesn't match.");
    //   }

    //   newPassword(form, (status, message) => {
    //     if (!(status >= 200 && status < 300)) {
    //       if (status === 307) {
    //         setPassword(null);
    //         setConfirmPassword(null);
    //         setLoading(false);
    //         return setChangePassword(true);
    //       }

    //       setLoading(false);
    //       return console.log(message);
    //     }
    //   });
    // }

    // handleSignIn(false);
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "100%", height: "40%", padding: "15px 2rem" }}>
        <Typography
          variant="h5"
          component="h2"
          color="rgba(15, 87, 33, 1)"
          fontWeight="500"
          gutterBottom
        >
          Let us know it’s you!
        </Typography>

        <Typography sx={{ mb: 2, fontSize: 12, color: "rgba(128,128,128,1)" }}>
          Please verify your email to continue. We will send you a code with
          instructions to create a new password.
        </Typography>
        <form method="POST" onSubmit={submit}>
          <TextField
            label="Email address"
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
            {loading ? "verifying email addres" : "Send one-time code"}
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
          onClick={() => navigate(`/${ACTION_SIGN_IN}`)}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
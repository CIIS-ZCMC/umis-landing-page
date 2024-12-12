import { Visibility, VisibilityOff } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUserHook from "../../hooks/UserHook";
import {
  Modal,
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
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import Container from "./Container/Container";

const CloseModal = (props) => {
  return (
    <IconButton
      onClick={props.handleClose}
      sx={{ position: "absolute", top: 8, right: 8 }}
    >
      <CloseIcon />
    </IconButton>
  );
};

const Auth = (props) => {
  const navigate = useNavigate();
  const { newPassword, signIn } = useUserHook();
  const [action, setAction] = useState(ACTION_SIGN_IN);

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

  function handleClose() {
    setAction(ACTION_SIGN_IN);
    props.handleClose();
  }

  if (action === ACTION_FORGOT_PASSWORD) {
    return (
      <ForgotPassword open={props.open} handleClose={handleClose}>
        <CloseModal handleClose={props.handleClose} />
      </ForgotPassword>
    );
  }

  return (
    <Container open={props.open} handleClose={props.handleClose}>
      <CloseModal handleClose={props.handleClose} />
      <Typography variant="h6" component="h2" gutterBottom>
        Sign In
      </Typography>

      {changePassword && (
        <Typography fontSize={12} sx={{ mb: 2 }}>
          Your password has been expired, though you can still continue to use
          the password for another 3 months if you press continue.
        </Typography>
      )}

      <form method="POST" onSubmit={submit}>
        {!changePassword && (
          <TextField
            label="Employee ID"
            type="text"
            fullWidth
            margin="normal"
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
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            backgroundColor: "rgb(232,240,254)",
            "& .MuiOutlinedInput-root": {
              "&.Mui-error": {
                borderColor: "red",
              },
            },
          }}
          error={error}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
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
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
          color="primary"
          sx={{ cursor: "pointer", mt: 1, color: "rgba(15, 87, 33, 1)" }}
          onClick={() => setAction(ACTION_FORGOT_PASSWORD)}
        >
          Forgot Password?
        </Typography>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2, backgroundColor: "rgba(15, 87, 33, 1)" }}
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Signing in" : "Sign In"}
        </Button>
      </form>
      {changePassword && (
        <Button
          variant="normal"
          fullWidth
          sx={{ mt: 2, backgroundColor: "rgba(15, 87, 33, 1)" }}
          onClick={() => handleSignIn(1)}
        >
          Sign in anyway
        </Button>
      )}
    </Container>
  );
};

export default Auth;

import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  ACTION_ASSIGN_NEW_PASSWORD,
  ACTION_FORGOT_PASSWORD,
  ACTION_INPUT_OTP,
  ACTION_NEW_ACCOUNT,
  ACTION_SIGN_IN,
  ACTION_SIGNIN_OTP,
} from "../../utils/config";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import Container from "./Container/Container";
import { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import OTPVerification from "./OTPVerification/OTPVerification";
import NewPassword from "./NewPassword/NewPassword";

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
        if (status === 302) {
          setEmployeeID(null);
          setPassword(null);
          setLoading(false);
          return setAction(ACTION_SIGNIN_OTP);
        }

        if (status === 307) {
          setConfirmPassword(null);
          setLoading(false);
          setAction(
            message === "new-account"
              ? ACTION_NEW_ACCOUNT
              : ACTION_ASSIGN_NEW_PASSWORD
          );
          return setExpiredPasswordMessage(message);
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
      handleClose();
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

  function handleClose() {
    setAction(ACTION_SIGN_IN);
    props.handleClose();
  }

  if (action === ACTION_FORGOT_PASSWORD) {
    return (
      <ForgotPassword
        open={props.open}
        handleClose={handleClose}
        setAction={setAction}
      >
        <CloseModal handleClose={props.handleClose} />
      </ForgotPassword>
    );
  }

  if (action === ACTION_INPUT_OTP || action === ACTION_SIGNIN_OTP) {
    return (
      <OTPVerification
        open={props.open}
        handleClose={handleClose}
        action={action}
        setAction={setAction}
      >
        <CloseModal handleClose={props.handleClose} />
      </OTPVerification>
    );
  }

  if (action === ACTION_ASSIGN_NEW_PASSWORD || action === ACTION_NEW_ACCOUNT) {
    return (
      <NewPassword
        open={props.open}
        handleClose={handleClose}
        action={action}
        setAction={setAction}
      >
        <CloseModal handleClose={props.handleClose} />
      </NewPassword>
    );
  }

  return (
    <Container open={props.open} handleClose={props.handleClose}>
      <CloseModal handleClose={props.handleClose} />
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
          Protect your account by keeping your credentials private. Never share
          them with anyone.
        </Typography>
      )}
      <form method="POST" onSubmit={submit}>
        <TextField
          label="Employee ID"
          type="number"
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
          onClick={() => setAction(ACTION_FORGOT_PASSWORD)}
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
      {changePassword && (
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
          onClick={() => handleSignIn(1)}
        >
          Sign in anyway
        </Button>
      )}
    </Container>
  );
};

export default Auth;

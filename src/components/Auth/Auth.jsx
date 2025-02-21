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
import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import OTPVerification from "./OTPVerification";
import useAuthHook from "../../hooks/AuthHook";
import { AUTH_TITLE } from "../../constant/AuthConstant";
import NewAccount from "./NewAccount";
import ExpiredPassword from "./ExpiredPassword";
import SignInWithOTP from "./SignInWithOTP";
import { ACTION } from "../../constant/AuthModalActions";

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
  const {
    title,
    setTitle,
    setDescription,
    setIsPasswordExpired,
    setMandatoryChangePassword,
  } = useAuthHook();
  const { newPassword, signIn } = useUserHook();
  const { action, setAction } = useAuthHook();

  const [employeeID, setEmployeeID] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [feedback, setFeedback] = useState(null);

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
          setTitle(AUTH_TITLE.SIGN_IN_WITH_OTP);
          return setAction(ACTION.SIGNIN_WITH_OTP);
        }

        if (status === 422) {
          setTitle(AUTH_TITLE.EXPIRED_PASSWORD);
          setIsPasswordExpired(true);
          setAction(ACTION.EXPIRED_PASSWORD);
          if (message.includes("mandatory")) {
            setMandatoryChangePassword(true);
          }
          setDescription(message);
          setLoading(false);
          return;
        }

        if (status === 307) {
          setConfirmPassword(null);
          setLoading(false);
          setAction(
            message.includes("New account")
              ? ACTION.NEW_ACCOUNT
              : ACTION.EXPIRED_PASSWORD
          );
          return;
        }

        if (status === 403) {
          setPassword(null);
          setLoading(false);
          setFeedback(message);
          return setError(true);
        }

        setLoading(false);
        return setFeedback(message);
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
    setAction(ACTION.SIGN_IN);
    props.handleClose();
  }

  // New Account
  if (action === ACTION.NEW_ACCOUNT) {
    return (
      <NewAccount
        open={props.open}
        handleClose={handleClose}
        setAction={setAction}
      >
        <CloseModal handleClose={handleClose} />
      </NewAccount>
    );
  }

  if (action === ACTION.EXPIRED_PASSWORD) {
    return (
      <ExpiredPassword
        open={props.open}
        handleClose={handleClose}
        action={action}
        setAction={setAction}
      >
        <CloseModal handleClose={handleClose} />
      </ExpiredPassword>
    );
  }

  // Verify Email
  if (action === ACTION.FORGOT_PASSWORD) {
    return (
      <ForgotPassword
        open={props.open}
        handleClose={handleClose}
        setAction={setAction}
      >
        <CloseModal handleClose={handleClose} />
      </ForgotPassword>
    );
  }

  if (action === ACTION.SIGNIN_WITH_OTP) {
    return (
      <SignInWithOTP
        open={props.open}
        handleClose={handleClose}
        action={action}
        setAction={setAction}
      >
        <CloseModal handleClose={handleClose} />
      </SignInWithOTP>
    );
  }

  if (action === ACTION.VERIFY_OTP) {
    return (
      <OTPVerification
        open={props.open}
        handleClose={handleClose}
        action={action}
        setAction={setAction}
      >
        <CloseModal handleClose={handleClose} />
      </OTPVerification>
    );
  }

  return (
    <Container open={props.open} handleClose={handleClose}>
      <CloseModal handleClose={handleClose} />
      <Typography
        variant="h5"
        component="h2"
        color="rgba(15, 87, 33, 1)"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
        gutterBottom
      >
        {title}
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
          {feedback !== null
            ? feedback
            : `Protect your account by keeping your credentials private. Never share
          them with anyone.`}
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
            fontFamily: "var(--roboto-font-family)",
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
            fontFamily: "var(--roboto-font-family)",
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

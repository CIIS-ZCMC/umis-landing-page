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

const Container = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          // position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: "10px",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

const Timer = ({ initialSeconds = 60, setIsOTPExpired = false }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval on component unmount
    } else {
      setIsOTPExpired(true);
    }
  }, [seconds]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <Typography variant="h6" color={seconds > 10 ? "textPrimary" : "error"}>
      {seconds > 0 ? ` ${formatTime(seconds)}` : "Time's up!"}
    </Typography>
  );
};

const ForgotPassword = ({ open, handleClose, children }) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOTPExpired, setIsOTPExpired] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (isNaN(value)) return; // Only allow numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input field if available
    // if (value && index < otp.length - 1) {
    document.getElementById(`otp-${index + 1}`).focus();
    // }
  };

  const handleFocus = (index) => {
    if (!otp[index]) {
      document.getElementById(`otp-${index}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    console.log(`VALUE: ${e.target.value} INDEX: ${index}`);
    document.getElementById(`otp-${index + 1}`).focus();
    // if (e.key === "Backspace" && !otp[index] && index > 0) {
    //   document.getElementById(`otp-${index - 1}`).focus();
    // }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = otp.map((_, i) => pasteData[i] || "");
    setOtp(newOtp);
    // Autofocus each input field
    newOtp.forEach((_, i) => {
      const nextInput = document.getElementById(`otp-${i}`);
      if (nextInput) nextInput.value = newOtp[i];
    });
  };

  return (
    <Container open={open} handleClose={handleClose}>
      {children}
      <Typography variant="h6" component="h2" marginBottom="1rem" gutterBottom>
        Sign In
      </Typography>
      <Typography fontSize={12} marginBottom="1rem">
        {`
        A OTP has been sent to your email. Please check your inbox.
            If you didn't receive an email click resend.
        `}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography>One Time Password</Typography>
        <Timer initialSeconds={90} setIsOTPExpired={setIsOTPExpired} />
      </Box>
      <Box display="flex" justifyContent="center" gap={1}>
        {otp.map((value, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={value}
            onChange={(e) => handleChange(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "1.5rem",
                width: "2.5rem",
              },
            }}
            autoComplete="off"
          />
        ))}
      </Box>
      <Box display="flex" justifyContent="end" marginTop="0.5rem">
        <Typography fontSize={12} color="blue">
          Resend OTP
        </Typography>
      </Box>
      <Button
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 2, backgroundColor: "rgba(15, 87, 33, 1)" }}
        disabled={loading || isOTPExpired}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {loading ? "Processing" : "Send OTP"}
      </Button>
    </Container>
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

  if (action === ACTION_FORGOT_PASSWORD) {
    return (
      <ForgotPassword open={props.open} handleClose={props.handleClose}>
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

import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Timer from "../Timer/Timer";
import Container from "../Container/Container";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../../hooks/UserHook";
import {
  ACTION_ASSIGN_NEW_PASSWORD,
  ACTION_SIGN_IN,
  ACTION_SIGNIN_OTP,
} from "../../../utils/config";

const OTPVerification = ({
  open,
  handleClose,
  action,
  setAction,
  children,
}) => {
  const navigate = useNavigate();
  const { verifyOTP, resendOTP, signInWithOTP } = useUserHook();

  const [initialTime, setInitialTime] = useState(120);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOTPExpired, setIsOTPExpired] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

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

  function handleResendOTP() {
    resendOTP((status, message) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 307) {
          setErrorMessage(message);
          return setLoading(false);
        }

        setErrorMessage(message);
        return console.log(message);
      }
      setInitialTime(90);
      setLoading(false);
    });
  }

  function submit(e) {
    e.preventDefault();

    let form = new FormData();
    form.append("otp", otp.join(""));

    const is2fa = action === ACTION_SIGNIN_OTP;

    if (is2fa) {
      signInWithOTP(form, (status, message) => {
        if (!(status >= 200 && status < 300)) {
          if (status === 307) {
            setErrorMessage(message);
            return setLoading(false);
          }

          setErrorMessage(message);
          return console.log(message);
        }

        navigate("/");
        setLoading(false);
      });
    }

    verifyOTP(form, (status, message) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 307) {
          setErrorMessage(message);
          return setLoading(false);
        }

        setErrorMessage(message);
        return console.log(message);
      }

      setAction(ACTION_ASSIGN_NEW_PASSWORD);
      setLoading(false);
    });
  }

  return (
    <Container open={open} handleClose={handleClose}>
      {children}
      <Typography
        variant="h5"
        component="h2"
        color="rgba(15, 87, 33, 1)"
        fontWeight="500"
        gutterBottom
      >
        Verify One-time Pin
      </Typography>

      <Typography
        sx={{
          mb: 2,
          fontSize: 12,
          color: errorMessage !== null ? "darkred" : "rgba(128,128,128,1)",
        }}
      >
        {errorMessage !== null
          ? errorMessage
          : `Please type in the code that we sent to your email to help us confirm
          it’s you. The code is valid for 3 minutes only.`}
      </Typography>

      <Typography
        sx={{ fontSize: 14, color: "rgba(38,38,38,1)", fontWeight: 500 }}
      >
        Enter Code
      </Typography>
      <Box display="flex" justifyContent="center" gap={1} marginTop="5px">
        {otp.map((value, index) => (
          <TextField
            key={index}
            id={`otp-${index}`}
            value={value}
            color="success"
            onChange={(e) => handleChange(e, index)}
            onFocus={() => handleFocus(index)}
            onPaste={handlePaste}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: "1rem",
                width: "2.5rem",
                fontWeight: 600,
              },
            }}
            autoComplete="off"
          />
        ))}
      </Box>
      <Box display="flex" gap={1} alignItems="center" sx={{ marginTop: "5px" }}>
        <Typography sx={{ fontSize: 12, color: "rgba(128,128,128,1)" }}>
          One-time pin expires in:
        </Typography>
        <Timer initialSeconds={initialTime} setIsOTPExpired={setIsOTPExpired} />
      </Box>
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
        disabled={loading || isOTPExpired}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
        onClick={submit}
      >
        {loading ? "Saving" : "Continue"}
      </Button>
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
        onClick={() => setAction(ACTION_SIGN_IN)}
      >
        Cancel
      </Button>
      <Box display="flex" justifyContent="center" marginTop="1rem">
        <Typography
          sx={{
            mb: 2,
            fontSize: 11,
            color: "rgba(128,128,128,1)",
            fontFamily: "var(--roboto-font-family)",
          }}
        >
          Didn't receive the code?{" "}
          <Typography
            component="span"
            sx={{
              fontSize: 11,
              color: "rgba(15, 87, 33, 1)",
              fontFamily: "var(--roboto-font-family)",
              fontWeight: 500,
            }}
            onClick={handleResendOTP}
          >
            Send me a new OTP
          </Typography>
          .
        </Typography>
      </Box>
    </Container>
  );
};

export default OTPVerification;

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
  ACTION_ASSIGN_NEW_PASSWORD,
  ACTION_FORGOT_PASSWORD,
  ACTION_SIGN_IN,
} from "../../utils/config";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import { useState } from "react";
import Timer from "../../components/Auth/Timer/Timer";

const OTPVerification = () => {
  const navigate = useNavigate();
  const { newPassword, signIn } = useUserHook();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [isOTPExpired, setIsOTPExpired] = useState(false);
  const [employeeID, setEmployeeID] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

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
      <Box sx={{ width: "100%", height: "50%", padding: "15px 2rem" }}>
        <Typography
          variant="h5"
          component="h2"
          color="rgba(15, 87, 33, 1)"
          fontWeight="500"
          gutterBottom
        >
          Verify One-time Pin
        </Typography>

        <Typography sx={{ mb: 2, fontSize: 12, color: "rgba(128,128,128,1)" }}>
          Please type in the code that we sent to your email to help us confirm
          it’s you. The code is valid for 3 minutes only.
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
        <Box
          display="flex"
          gap={1}
          alignItems="center"
          sx={{ marginTop: "5px" }}
        >
          <Typography sx={{ fontSize: 12, color: "rgba(128,128,128,1)" }}>
            One-time pin expires in:
          </Typography>
          <Timer initialSeconds={90} setIsOTPExpired={setIsOTPExpired} />
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
          disabled={loading}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
          onClick={() => navigate(`/${ACTION_ASSIGN_NEW_PASSWORD}`)}
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
          onClick={() => navigate(`/${ACTION_SIGN_IN}`)}
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
            >
              Send me a new OTP
            </Typography>
            .
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default OTPVerification;

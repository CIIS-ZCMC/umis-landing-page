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
      <Typography fontSize={12} marginBottom="2rem">
        {`
          A OTP has been sent to your email. Please check your inbox.
              If you didn't receive an email click resend.
          `}
      </Typography>

      <Box display="flex" justifyContent="space-between">
        <Typography>One Time Password</Typography>
        <Timer initialSeconds={90} setIsOTPExpired={setIsOTPExpired} />
      </Box>
      <Box display="flex" justifyContent="center" gap={1} marginTop="5px">
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
                fontSize: "1rem",
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
        sx={{
          mt: 2,
          backgroundColor: "rgba(15, 87, 33, 1)",
          borderRadius: "8px",
        }}
        disabled={loading || isOTPExpired}
        startIcon={
          loading ? <CircularProgress size={20} color="inherit" /> : null
        }
      >
        {loading ? "Processing" : "Send OTP"}
      </Button>
      <Box sx={{ display: "flex", justifyContent: "end", marginTop: "10px" }}>
        <Button
          style={{ color: "gray", textTransform: "none", fontWeight: 400 }}
        >
          Return Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default ForgotPassword;

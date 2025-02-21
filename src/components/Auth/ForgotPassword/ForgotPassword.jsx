import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import Container from "../Container/Container";
import useUserHook from "../../../hooks/UserHook";
import { ACTION_INPUT_OTP, ACTION_SIGN_IN } from "../../../utils/config";
import useAuthHook from "../../../hooks/AuthHook";

const ForgotPassword = ({ open, handleClose, setAction, children }) => {
  const { setIsPasswordExpired } = useAuthHook();
  const { verifyEmailAndSendOTP } = useUserHook();
  const [feedback, setFeedback] = useState(null);

  const [email, setEmail] = useState(null);

  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();

    let form = new FormData();
    form.append("email", email);

    verifyEmailAndSendOTP(form, (status, message) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 307) {
          setPassword(null);
          setConfirmPassword(null);
          setLoading(false);
          return setChangePassword(true);
        }

        setLoading(false);
        return setFeedback(message);
      }

      setIsPasswordExpired(false);
      setLoading(false);
      setAction(ACTION_INPUT_OTP);
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
        Let us know it’s you!
      </Typography>

      <Typography
        sx={{
          mb: 2,
          fontSize: 12,
          color: feedback === null ? "rgba(128,128,128,1)" : "darkred",
        }}
      >
        {feedback !== null
          ? feedback
          : ` Please verify your email to continue. We will send you a code with
        instructions to create a new password.`}
      </Typography>
      <form method="POST" onSubmit={submit}>
        <TextField
          label="Email address"
          type="email"
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        onClick={() => setAction(ACTION_SIGN_IN)}
      >
        Cancel
      </Button>
    </Container>
  );
};

export default ForgotPassword;

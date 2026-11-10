import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  ACTION_INPUT_OTP,
  ACTION_SIGN_IN,
} from "../../utils/config";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import zcmcLogo from "../../assets/zcmc-logo-1.png";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { verifyEmailAndSendOTP } = useUserHook();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    let form = new FormData();
    form.append("email", email);

    verifyEmailAndSendOTP(form, (status, message) => {
      if (!(status >= 200 && status < 300)) {
        setLoading(false);
        return console.log(message);
      }

      setLoading(false);
      navigate(`/${ACTION_INPUT_OTP}`);
    });
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: { xs: "16px", sm: "24px" },
        background: "linear-gradient(135deg, #f3f8f5 0%, #e4f0ea 100%)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "440px",
          boxSizing: "border-box",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 16px 48px rgba(10, 62, 48, 0.12)",
          border: "1px solid rgba(15, 87, 33, 0.1)",
          padding: { xs: "28px 20px", sm: "36px 32px" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            mb: 2,
          }}
        >
          <img
            src={zcmcLogo}
            alt="ZCMC Logo"
            style={{ width: "42px", height: "42px", objectFit: "contain" }}
          />
          <Box>
            <Typography
              sx={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.6px",
                color: "rgba(15, 87, 33, 0.8)",
                lineHeight: 1.2,
              }}
            >
              Zamboanga City Medical Center
            </Typography>
            <Typography
              variant="h5"
              component="h2"
              color="rgba(10, 62, 48, 1)"
              fontWeight="700"
              sx={{ fontSize: { xs: "20px", sm: "22px" }, lineHeight: 1.3 }}
            >
              Let us know it’s you!
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            mb: 2.5,
            fontSize: 13,
            lineHeight: 1.5,
            color: "#4b5563",
          }}
        >
          Please verify your email to continue. We will send you a code with
          instructions to create a new password.
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
              mt: 3,
              backgroundColor: "rgba(15, 87, 33, 1)",
              "&:hover": { backgroundColor: "rgba(10, 62, 48, 1)" },
              height: "48px",
              fontWeight: 600,
              fontSize: "15px",
              textTransform: "none",
              borderRadius: "10px",
              fontFamily: "var(--roboto-font-family)",
            }}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Verifying email address..." : "Send one-time code"}
          </Button>
        </form>

        <Button
          variant="contained"
          fullWidth
          sx={{
            color: "rgba(15,87,33,1)",
            mt: 1.5,
            boxShadow: "none",
            textTransform: "none",
            fontWeight: 600,
            backgroundColor: "rgba(15,87,33,0.08)",
            "&:hover": {
              backgroundColor: "rgba(15,87,33,0.14)",
              boxShadow: "none",
            },
            height: "46px",
            borderRadius: "10px",
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

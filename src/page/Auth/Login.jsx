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
  ACTION_NEW_ACCOUNT,
  ACTION_SIGNIN_OTP,
} from "../../utils/config";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import mccImg5 from "../../assets/mcc-corner/5.png";
import zcmcLogo from "../../assets/zcmc-logo-1.png";
import "../../styles/globals.css";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { newPassword, signIn } = useUserHook();

  const [employeeID, setEmployeeID] = useState("");
  const [password, setPassword] = useState("");
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

    signIn(form, (status, message, data) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 302) {
          sessionStorage.setItem("pending_employee_id", employeeID);
          const type =
            data?.two_factor_type ||
            (typeof message === "string" &&
            message.includes("Google Authenticator")
              ? "totp"
              : "email");
          sessionStorage.setItem("pending_2fa_type", type);
          setEmployeeID(null);
          setPassword(null);
          setLoading(false);
          return navigate(`/${ACTION_SIGNIN_OTP}`, {
            state: { twoFactorType: type },
          });
        }

        if (status === 307) {
          setConfirmPassword(null);
          setLoading(false);
          navigate(`/${ACTION_NEW_ACCOUNT}`);
          return setChangePassword(true);
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

      let form = new FormData();
      form.append("password", password);
      form.append("confirm_password", confirmPassword);
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
              Login to One ZCMC
            </Typography>
          </Box>
        </Box>

        {changePassword ? (
          <Typography fontSize={12.5} sx={{ mb: 2.5, color: "#4b5563", lineHeight: 1.5 }}>
            Your password has been expired, though you can still continue to use
            the password for another 3 months if you press continue.
          </Typography>
        ) : (
          <Typography
            sx={{
              fontSize: 12.5,
              mb: 2.5,
              lineHeight: 1.5,
              fontFamily: "var(--roboto-font-family)",
              color: "#4b5563",
            }}
          >
            Protect your account by keeping your credentials private. Never
            share them with anyone.
          </Typography>
        )}

        <form method="POST" onSubmit={submit}>
          {!changePassword && (
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
          )}
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
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
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
                fontFamily: "var(--roboto-font-family)",
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                    >
                      {!showConfirmPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
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
            sx={{
              cursor: "pointer",
              mt: 1,
              color: "rgba(15, 87, 33, 1)",
              fontSize: 12,
              fontWeight: 600,
              fontFamily: "var(--roboto-font-family)",
            }}
            onClick={() => navigate(`/${ACTION_FORGOT_PASSWORD}`)}
          >
            Forgot Password?
          </Typography>
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
            {loading ? "Signing in..." : "Login"}
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
          onClick={() => navigate("/")}
        >
          Cancel
        </Button>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "1.5rem",
            backgroundColor: "#f8faf9",
            border: "1px solid rgba(15, 87, 33, 0.12)",
            padding: "12px 14px",
            gap: "12px",
            borderRadius: "12px",
            boxSizing: "border-box",
          }}
        >
          <Box sx={{ width: "44px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src={mccImg5} alt="DPO Seal" style={{ width: "40px", height: "auto", objectFit: "contain" }} />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              lineHeight: 1.45,
              color: "#374151",
            }}
          >
            At Zamboanga City Medical Center (ZCMC), we are committed to protecting your personal information and ensuring its privacy and security. Read more..
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

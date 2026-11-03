import { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { ShieldOutlined, Sync, VpnKeyOutlined } from "@mui/icons-material";
import Timer from "../Timer/Timer";
import Container from "../Container/Container";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../../hooks/UserHook";
import { ACTION_SIGN_IN } from "../../../utils/config";
import useAuthHook from "../../../hooks/AuthHook";

const SignInWithOTP = ({ open, handleClose, action, setAction, children }) => {
  const navigate = useNavigate();
  const { twoFactorType } = useAuthHook();
  const { resendOTP, signInWithOTP } = useUserHook();

  const currentType =
    twoFactorType || sessionStorage.getItem("pending_2fa_type") || "totp";
  const isTotp = currentType === "totp";

  // Email 2FA OTP state
  const [initialTime, setInitialTime] = useState(120);
  const [isOTPExpired, setIsOTPExpired] = useState(false);

  // 6-digit state
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [isRecovery, setIsRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  useEffect(() => {
    if (!isRecovery) {
      inputsRef.current[0]?.focus();
    }
  }, [isRecovery]);

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutSeconds === null || lockoutSeconds <= 0) return;
    const timer = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [lockoutSeconds]);

  const isLocked = lockoutSeconds !== null && lockoutSeconds > 0;

  const handleDigitChange = (index, value) => {
    if (loading || isLocked) return;

    const char = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMessage(null);

    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    const fullCode = newDigits.join("");
    if (fullCode.length === 6) {
      triggerSubmit(fullCode, false);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputsRef.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (loading || isLocked) return;
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      const newDigits = pasted.split("");
      setDigits(newDigits);
      inputsRef.current[5]?.focus();
      triggerSubmit(pasted, false);
    }
  };

  const triggerSubmit = (codeToSubmit, isRecoveryMode) => {
    if (loading || isLocked || !codeToSubmit) return;

    setLoading(true);
    setErrorMessage(null);

    let form = new FormData();
    form.append("otp", codeToSubmit);
    if (isRecoveryMode) {
      form.append("is_recovery_code", "1");
    }
    const pendingEmployeeId = sessionStorage.getItem("pending_employee_id");
    if (pendingEmployeeId) {
      form.append("employee_id", pendingEmployeeId);
    }

    signInWithOTP(form, (status, message, data) => {
      setLoading(false);
      if (status >= 200 && status < 300) {
        sessionStorage.removeItem("pending_employee_id");
        sessionStorage.removeItem("pending_2fa_type");
        handleClose();
        navigate("/");
        return;
      }

      if (status === 423 || data?.is_locked) {
        setErrorMessage(
          message || "Account temporarily locked for security. Please try again later."
        );
        if (data?.locked_until) {
          const target = new Date(data.locked_until).getTime();
          const rem = Math.max(1, Math.ceil((target - Date.now()) / 1000));
          setLockoutSeconds(rem);
        } else {
          setLockoutSeconds(900);
        }
        return;
      }

      setErrorMessage(message || "Invalid verification code.");
      if (data?.remaining_attempts !== undefined && data?.remaining_attempts !== null) {
        setRemainingAttempts(data.remaining_attempts);
      }

      if (!isRecoveryMode) {
        setDigits(["", "", "", "", "", ""]);
        inputsRef.current[0]?.focus();
      }
    });
  };

  function handleResendOTP() {
    setLoading(true);
    resendOTP((status, message) => {
      setLoading(false);
      if (!(status >= 200 && status < 300)) {
        setErrorMessage(message);
        return;
      }
      setInitialTime(90);
      setErrorMessage(null);
    });
  }

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (isTotp && isRecovery) {
      triggerSubmit(recoveryCode.trim(), true);
    } else {
      triggerSubmit(digits.join(""), false);
    }
  };

  return (
    <Container open={open} handleClose={handleClose}>
      {children}

      {/* HEADER ICON */}
      <Box
        sx={{
          width: 52,
          height: 52,
          mx: "auto",
          mb: 1.5,
          borderRadius: "14px",
          bgcolor: "rgba(15, 87, 33, 0.08)",
          color: "rgba(15, 87, 33, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isTotp ? (
          <ShieldOutlined sx={{ fontSize: 30 }} />
        ) : (
          <VpnKeyOutlined sx={{ fontSize: 30 }} />
        )}
      </Box>

      {/* TITLE */}
      <Typography
        variant="h5"
        component="h2"
        color="rgba(15, 87, 33, 1)"
        fontWeight="600"
        textAlign="center"
        gutterBottom
      >
        {isTotp
          ? "Two-Factor Authentication"
          : "Two-Factor Authentication (Email)"}
      </Typography>

      {/* SUBTITLE */}
      <Typography
        sx={{
          mb: 2.5,
          fontSize: 12.5,
          color: "rgba(100, 116, 139, 1)",
          textAlign: "center",
          lineHeight: 1.5,
        }}
      >
        {isTotp
          ? isRecovery
            ? "Enter one of your 8-character emergency backup recovery codes."
            : "Enter the 6-digit verification code from your Google Authenticator app."
          : "Please type in the 6-digit code that we sent to your email to help us confirm it’s you."}
      </Typography>

      {/* LOCKOUT BANNER */}
      {isLocked && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: "10px",
            textAlign: "left",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          Account temporarily locked for security. Try again in{" "}
          <strong>
            {Math.floor(lockoutSeconds / 60)}m {lockoutSeconds % 60}s
          </strong>
          .
        </Alert>
      )}

      {/* ERROR BANNER */}
      {errorMessage && !isLocked && (
        <Alert
          severity="error"
          sx={{
            mb: 2,
            borderRadius: "10px",
            textAlign: "left",
            fontSize: 12,
          }}
        >
          {errorMessage}
          {remainingAttempts !== null && remainingAttempts > 0 && (
            <Box component="div" sx={{ mt: 0.5, fontWeight: 700 }}>
              {remainingAttempts} attempt{remainingAttempts > 1 ? "s" : ""} remaining.
            </Box>
          )}
        </Alert>
      )}

      <form onSubmit={handleManualSubmit}>
        {isTotp && isRecovery ? (
          /* RECOVERY CODE INPUT */
          <Box mb={2}>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                mb: 1,
                textAlign: "center",
              }}
            >
              Emergency Recovery Code
            </Typography>
            <TextField
              fullWidth
              autoFocus
              placeholder="XXXX-XXXX"
              value={recoveryCode}
              disabled={loading || isLocked}
              onChange={(e) => setRecoveryCode(e.target.value.toUpperCase())}
              inputProps={{
                maxLength: 12,
                style: {
                  textAlign: "center",
                  fontFamily: "monospace",
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                },
              }}
            />
          </Box>
        ) : (
          /* 6-DIGIT BOXES */
          <Box mb={2}>
            <Box
              display="flex"
              justifyContent="center"
              gap={1}
              onPaste={handlePaste}
            >
              {digits.map((value, index) => (
                <TextField
                  key={index}
                  inputRef={(el) => (inputsRef.current[index] = el)}
                  value={value}
                  disabled={loading || isLocked}
                  inputMode="numeric"
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  inputProps={{
                    maxLength: 1,
                    style: {
                      textAlign: "center",
                      fontSize: "1.25rem",
                      width: "2.2rem",
                      height: "2.1rem",
                      fontWeight: 700,
                      fontFamily: "monospace",
                      padding: "6px 0",
                    },
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#f8fafc",
                      "&.Mui-focused fieldset": {
                        borderColor: "rgba(15, 87, 33, 1)",
                        borderWidth: "2px",
                      },
                    },
                  }}
                  autoComplete="off"
                />
              ))}
            </Box>

            {/* 30-SECOND ROTATING TIMER INDICATOR (GOOGLE AUTHENTICATOR MODE) */}
            {isTotp && (
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                mt={2}
              >
                <Sync
                  sx={{
                    fontSize: 15,
                    color: "rgba(15, 87, 33, 1)",
                    animation: "spin 3s linear infinite",
                    "@keyframes spin": {
                      "0%": { transform: "rotate(0deg)" },
                      "100%": { transform: "rotate(360deg)" },
                    },
                  }}
                />
                <Typography sx={{ fontSize: 11, color: "#64748b" }}>
                  Rotating code updates every 30 seconds
                </Typography>
              </Stack>
            )}

            {/* EMAIL OTP TIMER (EMAIL 2FA MODE) */}
            {!isTotp && (
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: "10px" }}
              >
                <Typography sx={{ fontSize: 12, color: "rgba(128,128,128,1)" }}>
                  One-time pin expires in:
                </Typography>
                <Timer
                  initialSeconds={initialTime}
                  setIsOTPExpired={setIsOTPExpired}
                />
              </Box>
            )}
          </Box>
        )}

        {/* SUBMIT BUTTON */}
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "rgba(15, 87, 33, 1)",
            "&:hover": {
              backgroundColor: "rgba(12, 70, 26, 1)",
            },
            height: "3.2rem",
            textTransform: "none",
            borderRadius: "10px",
            fontFamily: "var(--roboto-font-family)",
            fontWeight: 600,
            fontSize: "0.95rem",
          }}
          disabled={
            loading ||
            isLocked ||
            (!isTotp && isOTPExpired) ||
            (!isRecovery && digits.join("").length !== 6) ||
            (isRecovery && !recoveryCode.trim())
          }
          startIcon={
            loading ? <CircularProgress size={18} color="inherit" /> : null
          }
        >
          {loading ? "Verifying..." : "Verify & Sign In"}
        </Button>

        {/* GOOGLE AUTHENTICATOR EMERGENCY RECOVERY TOGGLE */}
        {isTotp && (
          <Box mt={1.5} pt={1} borderTop="1px solid #f1f5f9" textAlign="center">
            <Button
              type="button"
              variant="text"
              size="small"
              onClick={() => {
                setIsRecovery((prev) => !prev);
                setDigits(["", "", "", "", "", ""]);
                setRecoveryCode("");
                setErrorMessage(null);
              }}
              sx={{
                textTransform: "none",
                fontSize: 12,
                fontWeight: 600,
                color: "rgba(15, 87, 33, 1)",
                "&:hover": { bgcolor: "transparent", textDecoration: "underline" },
              }}
            >
              {isRecovery
                ? "Back to 6-digit Google Authenticator code"
                : "Don't have your phone? Use emergency recovery code"}
            </Button>
          </Box>
        )}

        {/* CANCEL BUTTON */}
        <Button
          variant="contained"
          fullWidth
          sx={{
            color: "rgba(15,87,33,1)",
            mt: 1.5,
            boxShadow: "none",
            textTransform: "none",
            backgroundColor: "rgba(15,87,33,0.08)",
            height: "3rem",
            borderRadius: "10px",
            fontFamily: "var(--inter-font-family)",
          }}
          onClick={() => {
            sessionStorage.removeItem("pending_employee_id");
            sessionStorage.removeItem("pending_2fa_type");
            setAction(ACTION_SIGN_IN);
          }}
        >
          Cancel
        </Button>

        {/* RESEND OTP (EMAIL 2FA ONLY) */}
        {!isTotp && (
          <Box display="flex" justifyContent="center" marginTop="1rem">
            <Typography
              sx={{
                mb: 1,
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
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
                onClick={handleResendOTP}
              >
                Send me a new OTP
              </Typography>
              .
            </Typography>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default SignInWithOTP;

import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import {
  ShieldOutlined,
  Sync,
  VpnKeyOutlined,
  ArrowBack,
} from "@mui/icons-material";
import {
  ACTION_ASSIGN_NEW_PASSWORD,
  ACTION_FORGOT_PASSWORD,
  ACTION_INPUT_OTP,
  ACTION_SIGN_IN,
  ACTION_SIGNIN_OTP,
} from "../../utils/config";
import { useLocation, useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import Timer from "../../components/Auth/Timer/Timer";

const OTPVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { verifyOTP, resendOTP, signInWithOTP } = useUserHook();

  const is2fa = location.pathname.includes(ACTION_SIGNIN_OTP);
  const twoFactorType =
    location.state?.twoFactorType ||
    sessionStorage.getItem("pending_2fa_type") ||
    "totp";
  const isTotp = is2fa && twoFactorType === "totp";

  // Email OTP state (for forgot password & email 2FA)
  const [initialTime, setInitialTime] = useState(120);
  const [isOTPExpired, setIsOTPExpired] = useState(false);

  // 2FA Google Authenticator state
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [isRecovery, setIsRecovery] = useState(false);
  const [recoveryCode, setRecoveryCode] = useState("");
  const [remainingAttempts, setRemainingAttempts] = useState(null);
  const [lockoutSeconds, setLockoutSeconds] = useState(null);

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputsRef = useRef([]);

  // Auto-focus first digit box on mount
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

  // Single digit typing & auto-advance
  const handleDigitChange = (index, value) => {
    if (loading || isLocked) return;

    const char = value.replace(/\D/g, "").slice(-1);
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);
    setErrorMessage(null);

    // Auto-advance to next box if character was entered
    if (char && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits are populated
    const fullCode = newDigits.join("");
    if (fullCode.length === 6) {
      triggerSubmit(fullCode, false);
    }
  };

  // Keyboard navigation
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

  // Clipboard paste support
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

  // Unified submission
  const triggerSubmit = (codeToSubmit, isRecoveryMode) => {
    if (loading || isLocked || !codeToSubmit) return;

    setLoading(true);
    setErrorMessage(null);

    let form = new FormData();
    form.append("otp", codeToSubmit);

    if (is2fa) {
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
          navigate("/");
          return;
        }

        // Lockout handling (HTTP 423)
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
      return;
    }

    // Standard email OTP (Forgot Password)
    verifyOTP(form, (status, message) => {
      setLoading(false);
      if (!(status >= 200 && status < 300)) {
        setErrorMessage(message || "Invalid verification code.");
        return;
      }
      navigate(`/${ACTION_ASSIGN_NEW_PASSWORD}`);
    });
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (isTotp && isRecovery) {
      triggerSubmit(recoveryCode.trim(), true);
    } else {
      triggerSubmit(digits.join(""), false);
    }
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

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f8fafc",
        p: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 440,
          bgcolor: "#fff",
          borderRadius: "24px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          border: "1px solid #e2e8f0",
          p: { xs: 3, sm: 4 },
          textAlign: "center",
        }}
      >
        {/* TOP ICON */}
        <Box
          sx={{
            width: 56,
            height: 56,
            mx: "auto",
            mb: 2,
            borderRadius: "16px",
            bgcolor: "rgba(15, 87, 33, 0.08)",
            color: "rgba(15, 87, 33, 1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isTotp ? (
            <ShieldOutlined sx={{ fontSize: 32 }} />
          ) : (
            <VpnKeyOutlined sx={{ fontSize: 32 }} />
          )}
        </Box>

        {/* TITLE */}
        <Typography
          variant="h5"
          component="h2"
          color="rgba(15, 87, 33, 1)"
          fontWeight="700"
          gutterBottom
        >
          {isTotp
            ? "Two-Factor Authentication"
            : is2fa
            ? "Two-Factor Authentication (Email)"
            : "Verify One-time Pin"}
        </Typography>

        {/* SUBTITLE */}
        <Typography
          sx={{
            mb: 3,
            fontSize: 13,
            color: "rgba(100, 116, 139, 1)",
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
              mb: 2.5,
              borderRadius: "12px",
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

        {/* ERROR MESSAGE BANNER */}
        {errorMessage && !isLocked && (
          <Alert
            severity="error"
            sx={{
              mb: 2.5,
              borderRadius: "12px",
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
            <Box mb={3}>
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
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                  },
                }}
              />
            </Box>
          ) : (
            /* 6 SEGMENTED DIGIT BOXES */
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
                        fontSize: "1.35rem",
                        width: "2.3rem",
                        height: "2.2rem",
                        fontWeight: 700,
                        fontFamily: "monospace",
                        padding: "8px 0",
                      },
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
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

              {/* EMAIL OTP TIMER (FOR EMAIL 2FA / FORGOT PASSWORD) */}
              {!isTotp && (
                <Box
                  display="flex"
                  gap={1}
                  justifyContent="center"
                  alignItems="center"
                  mt={1.5}
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
            disabled={
              loading ||
              isLocked ||
              (!isTotp && isOTPExpired) ||
              (!isRecovery && digits.join("").length !== 6) ||
              (isRecovery && !recoveryCode.trim())
            }
            sx={{
              mt: 2,
              backgroundColor: "rgba(15, 87, 33, 1)",
              "&:hover": {
                backgroundColor: "rgba(12, 70, 26, 1)",
              },
              height: "3.2rem",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? "Verifying..." : "Verify & Sign In"}
          </Button>

          {/* MODE TOGGLE FOR GOOGLE AUTHENTICATOR (TOTP VS RECOVERY CODE) */}
          {isTotp && (
            <Box mt={2} pt={1} borderTop="1px solid #f1f5f9">
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

          {/* CANCEL & RETURN TO LOGIN */}
          <Button
            variant="text"
            fullWidth
            sx={{
              mt: 1.5,
              textTransform: "none",
              color: "#64748b",
              fontSize: 12,
              fontWeight: 600,
              "&:hover": { color: "#334155", bgcolor: "transparent" },
            }}
            startIcon={<ArrowBack sx={{ fontSize: 16 }} />}
            onClick={() => {
              sessionStorage.removeItem("pending_employee_id");
              sessionStorage.removeItem("pending_2fa_type");
              navigate(`/${ACTION_SIGN_IN}`);
            }}
          >
            Cancel and return to login
          </Button>

          {/* RESEND OTP (FOR EMAIL 2FA / FORGOT PASSWORD ONLY) */}
          {!isTotp && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Typography sx={{ fontSize: 11, color: "rgba(128,128,128,1)" }}>
                Didn't receive the code?{" "}
                <Typography
                  component="span"
                  sx={{
                    fontSize: 11,
                    color: "rgba(15, 87, 33, 1)",
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
      </Box>
    </Box>
  );
};

export default OTPVerification;

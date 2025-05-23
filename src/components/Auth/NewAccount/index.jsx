import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
  List,
  ListItem,
  Checkbox,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { ACTION_NEW_ACCOUNT, ACTION_SIGN_IN } from "../../../utils/config";
import useUserHook from "../../../hooks/UserHook";
import Container from "../Container/Container";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import useAuthHook from "../../../hooks/AuthHook";
import { useNavigate } from "react-router-dom";
import { ACTION } from "../../../constant/AuthModalActions";

const NewAccount = ({ open, handleClose, action, setAction, children }) => {
  const navigate = useNavigate();
  const { newPassword, skipForNow } = useUserHook();
  const { isPasswordExpired, mandatoryChangePassword, description } =
    useAuthHook();

  const [authorizationPin, setAuthorizationPin] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [is2faActive, setIs2faActive] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNewPasswordRegistered, setIsNewPasswordRegistered] = useState(false);

  const [error, setError] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const [loading, setLoading] = useState(false);

  const validatePassword = () => {
    const validations = [
      password?.length >= 8, // At least 8 characters
      /[A-Z]/.test(password), // At least one uppercase letter
      /\d/.test(password), // At least one number
      password?.length > 0 && !/\s/.test(password), // No spaces
      /[!@#$%^&*(),.?":{}|<>]/.test(password), // At least one special character
    ];

    return validations.every(Boolean); // Returns true if all validations pass
  };

  function handleSkip() {
    skipForNow((status, message) => {
      if (!(status >= 200 && status < 300)) {
        setLoading(false);
        return console.log(message);
      }

      setIsNewPasswordRegistered(true);
      navigate("/");
      return setLoading(false);
    });
  }

  function submit(e) {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setPassword(null);
      setConfirmPassword(null);
      setError(true);
      setErrorConfirmPassword(true);
      setErrorMessage("Password doesn't match.");
      return setLoading(false);
    }

    let form = new FormData();
    form.append("password", password);
    form.append("two_factor", is2faActive ? 1 : 0);
    form.append("pin", authorizationPin);
    form.append("is_recover", 0);

    newPassword(form, (status, message) => {
      if (!(status >= 200 && status < 300)) {
        if (status === 400) {
          setPassword(null);
          setConfirmPassword(null);
          setLoading(false);
          setErrorMessage(message);
          return setError(true);
        }

        if (status === 307) {
          setPassword(null);
          setConfirmPassword(null);
          return setLoading(false);
        }

        setLoading(false);
        return console.log(message);
      }

      if (ACTION_NEW_ACCOUNT) {
        setIsNewPasswordRegistered(true);
      }

      setAction(ACTION.SIGN_IN);
      navigate("/");
      return setLoading(false);
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
        sx={{
          fontFamily: "var(--roboto-font-family)",
          fontWeight: 500,
        }}
        gutterBottom
      >
        Create a new password
      </Typography>

      <Typography
        sx={{
          mb: 2,
          fontSize: 12,
          color: error ? "darkred" : "rgba(128,128,128,1)",
        }}
      >
        {error
          ? errorMessage
          : `New users are required to create a strong password for first login
            attempt. Do not reuse your temporary password or other sequential
            details like “12345”.`}
      </Typography>

      <form method="POST" onSubmit={submit}>
        <TextField
          label="New password"
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
        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          margin="normal"
          color="success"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
          error={errorConfirmPassword}
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
        <Box>
          <List
            sx={{
              listStyleType: "disc",
              pl: 1, // Padding for proper alignment
            }}
          >
            {[
              {
                label: "Password must be at least 8 characters",
                status: password?.length >= 8,
              },
              {
                label: "Must contain at least one uppercase letter",
                status: /[A-Z]/.test(password),
              },
              {
                label: "Must include at least one number",
                status: /\d/.test(password),
              },
              {
                label: "Cannot include spaces",
                status: password?.length > 0 && !/\s/.test(password),
              },
              {
                label: "Must include at least one special character",
                status: /[!@#$%^&*(),.?":{}|<>]/.test(password),
              },
              {
                label: "Passwords must match",
                status: password === confirmPassword && password !== null,
              },
            ].map((item, index) => (
              <ListItem
                key={index}
                sx={{
                  fontSize: 11,
                  display: "list-item",
                  listStylePosition: "inside", // Positions bullet closer to text
                  padding: 0, // Removes extra padding
                  margin: 0,
                  marginBottom: "5px",
                  fontFamily: "var(--roboto-font-family)",
                  color: item.status
                    ? "rgba(15, 87, 33, 1)"
                    : "rgba(38,38,38,0.6)",
                  fontWeight: 300,
                }}
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box>
          <TextField
            label="Authorization pin"
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
            value={authorizationPin}
            onChange={(e) => setAuthorizationPin(e.target.value)}
            required
          />
          <Typography
            sx={{
              fontSize: 12,
              color: "rgba(38,38,38,0.8)",
              fontWeight: 300,
              marginTop: "10px",
              marginLeft: "12px",
            }}
          >
            Must be of six digit number
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            marginLeft: "-10px",
          }}
        >
          <Checkbox
            size="small"
            checked={is2faActive}
            sx={{
              color: "rgba(15, 87, 33, 1)",
              "&.Mui-checked": {
                color: "rgba(15, 87, 33, 1)",
              },
            }}
            onChange={(_) => setIs2faActive(!is2faActive)}
          />
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 300,
              color: "rgba(38,38,38,0.8)",
            }}
          >
            Enable two-factor authentication
          </Typography>
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
          disabled={
            loading ||
            !(password === confirmPassword && authorizationPin?.length > 0) ||
            !validatePassword()
          }
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {loading ? "Saving" : "Continue"}
        </Button>
      </form>
    </Container>
  );
};

export default NewAccount;

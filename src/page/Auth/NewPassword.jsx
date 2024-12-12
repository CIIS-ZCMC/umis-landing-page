import { CheckBox, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  ListItem,
  List,
  Checkbox,
} from "@mui/material";
import { ACTION_FORGOT_PASSWORD, ACTION_SIGN_IN } from "../../utils/config";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import useUserHook from "../../hooks/UserHook";
import { useState } from "react";

const NewPassword = () => {
  const navigate = useNavigate();
  const { newPassword, signIn } = useUserHook();

  const [employeeID, setEmployeeID] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isNewPasswordRegistered, setIsNewPasswordRegistered] = useState(false);

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
    setIsNewPasswordRegistered(true);

    /**
     * If password is expired.
     */
    // if (changePassword) {
    //   if (password !== confirmPassword) {
    //     setLoading(false);
    //     return console.log("Password doesn't match.");
    //   }

    //   newPassword(form, (status, message) => {
    //     if (!(status >= 200 && status < 300)) {
    //       if (status === 307) {
    //         setPassword(null);
    //         setConfirmPassword(null);
    //         setLoading(false);
    //         return setChangePassword(true);
    //       }

    //       setLoading(false);
    //       return console.log(message);
    //     }
    //   });
    // }

    // handleSignIn(false);
  }

  if (isNewPasswordRegistered) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ height: "40%", padding: "15px 2rem" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                width: "50px",
                height: "50px",
                backgroundColor: "rgba(215, 244, 222, 1)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "50%",
                padding: "35px",
              }}
            >
              <CheckCircleOutlineIcon
                sx={{
                  fontSize: 50,
                  color:
                    "var(--color-systembase-colorshighlight-green-500-34c658)",
                }}
              />
            </Box>
          </Box>
          <Typography
            sx={{
              marginTop: "1.5rem",
              fontWeight: 500,
              fontFamily: "var(--roboto-font-family)",
              textAlign: "center",
            }}
          >
            {"New password successfully created"}
          </Typography>
          <Box
            sx={{
              display: "flex", // Make the container a flexbox
              justifyContent: "center", // Center horizontally
              alignItems: "center", // Center vertically (if needed)
              width: "100%", // Ensure the parent container takes full width
            }}
          >
            <Typography
              sx={{
                width: "75%",
                marginTop: "5px",
                textAlign: "center",
                mb: 2,
                fontSize: 13,
                color: "rgba(128,128,128,1)",
                fontFamily: "var(--roboto-font-family)",
                fontWeight: 400,
              }}
            >
              Your password will expire after three months, on{" "}
              <Typography
                component="span"
                sx={{
                  color: "rgba(15, 87, 33, 1)",
                  fontSize: 13,
                  fontFamily: "var(--roboto-font-family)",
                  fontWeight: 500,
                }}
              >
                January 10, 2023
              </Typography>
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
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
            onClick={() => navigate(`/${ACTION_SIGN_IN}`)}
          >
            Click to login
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
            onClick={() => navigate("/")}
          >
            Close
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ height: "70%", padding: "15px 2rem" }}>
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

        <Typography sx={{ mb: 2, fontSize: 12, color: "rgba(128,128,128,1)" }}>
          New users are required to create a strong password for first login
          attempt. Do not reuse your temporary password or other sequential
          details like “12345”.
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
              fontSize: "var(--roboto-font-family)",
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
            type={showPassword ? "text" : "password"}
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
              type="text"
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
              sx={{
                color: "rgba(15, 87, 33, 1)",
                "&.Mui-checked": {
                  color: "rgba(15, 87, 33, 1)",
                },
              }}
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
              fontSize: "var(--roboto-font-family)",
            }}
            disabled={loading}
            startIcon={
              loading ? <CircularProgress size={20} color="inherit" /> : null
            }
          >
            {loading ? "Saving" : "Continue"}
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default NewPassword;

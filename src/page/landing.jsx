import FeaturedVideos from "../components/FeaturedVideos/FeaturedVideos";
import GovComponent from "../components/GovComponent/GovComponent";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HeaderHero from "../components/HeaderHero/HeaderHero";
import MccCorner from "../components/MccCorner/MccCorner";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import Contact from "../components/Contact/Contact";
import Careers from "../components/Careers/Careers";
import CloseIcon from "@mui/icons-material/Close";
import Header from "../components/Header/Header";
import Agency from "../components/Agency/Agency";
import { useNavigate } from "react-router-dom";
import useUserHook from "../hooks/UserHook";
import News from "../components/News/News";
import { useState } from "react";
import {
  Modal,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";

const Landing = () => {
  const navigate = useNavigate();
  const { test, newPassword, signIn } = useUserHook();
  const [open, setOpen] = useState(false);

  const [employeeID, setEmployeeID] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState(false);

  const [changePassword, setChangePassword] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
          return setChangePassword(true);
        }

        if (status === 403) {
          setPassword(null);
          return setError(true);
        }

        return console.log(message);
      }

      navigate("/");
    });
  }

  function submit(e) {
    e.preventDefault();

    /**
     * If password is expired.
     */
    if (changePassword) {
      if (password !== confirmPassword) {
        return console.log("Password doesn't match.");
      }

      newPassword(form, (status, message) => {
        if (!(status >= 200 && status < 300)) {
          if (status === 307) {
            setPassword(null);
            setConfirmPassword(null);
            return setChangePassword(true);
          }

          return console.log(message);
        }
      });
    }

    handleSignIn(false);
  }

  return (
    <>
      <Header onClick={handleOpen} />
      <HeaderHero />
      <News />
      <FeaturedVideos />
      <MoreInfo />
      <Careers />
      <MccCorner />
      <Contact />
      <Agency />
      <GovComponent />

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            // position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" component="h2" gutterBottom>
            Sign In
          </Typography>

          {changePassword && (
            <Typography fontSize={12} sx={{ mb: 2 }}>
              Your password has been expired, though you can still continue to
              use the password for another 3 months if you press continue.
            </Typography>
          )}

          <form method="POST" onSubmit={submit}>
            {!changePassword && (
              <TextField
                label="Employee ID"
                type="text"
                fullWidth
                margin="normal"
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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                backgroundColor: "rgb(232,240,254)",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-error": {
                    borderColor: "red",
                  },
                },
              }}
              error={error}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
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
              color="primary"
              sx={{ cursor: "pointer", mt: 1 }}
              onClick={() => console.log("Forgot Password clicked")}
            >
              Forgot Password?
            </Typography>
            <Button
              variant="contained"
              backgroundColor="rgba(15, 87, 33, 1)"
              type="submit"
              fullWidth
              sx={{ mt: 2 }}
            >
              Sign In
            </Button>
          </form>
          {changePassword && (
            <Button
              variant="normal"
              backgroundColor="rgba(15, 87, 33, 1)"
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => handleSignIn(1)}
            >
              Sign in anyway
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Landing;

import { Box, LinearProgress, Stack } from "@mui/material";
import zcmc from "../assets/zcmc.png";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Stack spacing={4} direction={"column"} sx={{ width: "25%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img width={"50%"} src={zcmc} alt="Zcmc logo" />
        </Box>
        <LinearProgress color="success" />
      </Stack>
    </Box>
  );
}

export default LoadingScreen;

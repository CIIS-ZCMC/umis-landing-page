import { Modal, Box } from "@mui/material";

const Container = ({ open, handleClose, children }) => {
  return (
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
        {children}
      </Box>
    </Modal>
  );
};

export default Container;

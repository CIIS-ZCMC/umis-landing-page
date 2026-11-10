import { Modal, Box } from "@mui/material";

const Container = ({ open, handleClose, children }) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "calc(100vw - 32px)", sm: 420 },
          maxWidth: 420,
          maxHeight: "90vh",
          overflowY: "auto",
          boxSizing: "border-box",
          bgcolor: "background.paper",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.28)",
          p: { xs: "24px 20px", sm: "32px 28px" },
          borderRadius: "16px",
          position: "relative",
          outline: "none",
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default Container;

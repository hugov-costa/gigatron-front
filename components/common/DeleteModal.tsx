import { Box, Button, Modal, Stack, Typography } from "@mui/material";

interface DeleteModalProps {
  open: boolean;
  handleClose: () => void;
  handleDelete: () => void;
  loading: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  open,
  handleClose,
  handleDelete,
  loading,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          backgroundColor: "rgba(0, 0, 0, 0.03)",
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          p: 4,
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Exclusão de usuário
        </Typography>

        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textJustify: "justified" }}
        >
          Tem certeza de que deseja excluir esse usuário?
        </Typography>

        <Stack direction="row" spacing={5} sx={{ mt: 3 }}>
          <Button variant="contained" onClick={handleDelete} disabled={loading}>
            Sim
          </Button>

          <Button variant="contained" color="error" onClick={handleClose}>
            Não
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default DeleteModal;

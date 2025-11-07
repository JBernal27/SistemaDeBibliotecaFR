import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";

export interface AlertModalProps {
  open: boolean;
  title?: string;
  message?: React.ReactNode | string;
  positiveText?: string; // e.g., "Sí", "Aceptar"
  negativeText?: string; // e.g., "No", "Cancelar"
  onConfirm?: () => void;
  onClose?: () => void;
  loading?: boolean;
  positiveColor?: "primary" | "secondary" | "error" | "success" | "warning";
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
}

const AlertModal: React.FC<AlertModalProps> = ({
  open,
  title = "Confirmación",
  message = "¿Estás seguro?",
  positiveText = "Aceptar",
  negativeText = "Cancelar",
  onConfirm,
  onClose,
  loading = false,
  positiveColor = "success",
  maxWidth = "sm",
}) => {
  const handleClose = () => {
    if (loading) return;
    onClose?.();
  };

  const handleConfirm = () => {
    if (loading) return;
    onConfirm?.();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={Boolean(maxWidth)}
      aria-labelledby="alert-modal-title"
    >
      <DialogTitle id="alert-modal-title">{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          {typeof message === "string" ? (
            <Typography variant="body1" color="text.primary">
              {message}
            </Typography>
          ) : (
            message
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        {negativeText && (
          <Button onClick={handleClose} disabled={loading}>
            {negativeText}
          </Button>
        )}
        <Button
          onClick={handleConfirm}
          variant="contained"
          color={positiveColor}
          disabled={loading}
          sx={{ minWidth: 100 }}
        >
          {positiveText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertModal;

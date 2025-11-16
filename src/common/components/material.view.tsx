import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { IMaterial } from "../interfaces/material.interface";
import noImageAvailable from "../../assets/images/image-not-found.jpg";

interface Props {
  open: boolean;
  onClose: () => void;
  material: IMaterial | null;
}

export default function MaterialView({ open, onClose, material }: Props) {
  if (!material) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Información del Material</DialogTitle>

      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          
          <Box display="flex" justifyContent="center">
            <img
              src={material.img || noImageAvailable}
              alt={material.title}
              style={{ width: 180, borderRadius: 8 }}
            />
          </Box>

          <Typography><b>Título:</b> {material.title}</Typography>
          <Typography><b>Autor:</b> {material.author?.name}</Typography>
          <Typography>
            <b>Tipo:</b> {material.material_type?.description}
          </Typography>

        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
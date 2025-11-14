import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IMaterialType } from "../../../../../common/interfaces/matertialType.interface";
import { MaterialTypeService } from "../../../../../services/material_type/materialType.service";

interface MaterialTypeModalProps {
  open: boolean;
  onClose: () => void;
  materialType?: IMaterialType | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const MaterialTypeModal: React.FC<MaterialTypeModalProps> = ({ open, onClose, materialType, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<{ name: string; description: string }>({
    defaultValues: { name: "", description: "" },
  });

  useEffect(() => {
    if (open) {
      if (materialType) reset({ name: materialType.name ?? "", description: materialType.description ?? "" });
      else reset({ name: "", description: "" });
      setError(null);
    } else {
      reset({ name: "", description: "" });
      setError(null);
      setLoading(false);
    }
  }, [open, materialType, reset]);

  const onSubmit = async (data: { name: string; description: string }) => {
    const name = data.name?.trim() || "";
    if (!name) {
      setError("El nombre es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (materialType) {
        await MaterialTypeService.update(materialType.id, { name: data.name, description: data.description });
      } else {
        await MaterialTypeService.create({ name: data.name, description: data.description });
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("Material type save error:", err);
      setError("Error al guardar el tipo de material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{materialType ? "Editar tipo" : "Crear tipo"}</DialogTitle>
      <DialogContent>
        <form id="material-type-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Nombre" fullWidth required {...field} sx={{ mt: 1 }} />}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => <TextField label="Descripción" fullWidth multiline rows={3} {...field} sx={{ mt: 2 }} />}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="material-type-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : materialType ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialTypeModal;
 

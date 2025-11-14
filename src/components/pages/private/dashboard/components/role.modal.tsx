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
import { IRole } from "../../../../../common/interfaces/role.interface";
import { RolesService } from "../../../../../services/roles/roles.service";

interface RoleModalProps {
  open: boolean;
  onClose: () => void;
  role?: IRole | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const RoleModal: React.FC<RoleModalProps> = ({ open, onClose, role, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<{ name: string; description: string }>(
    {
      defaultValues: { name: "", description: "" },
    }
  );

  useEffect(() => {
    if (open) {
      if (role) reset({ name: role.name ?? "", description: role.description ?? "" });
      else reset({ name: "", description: "" });
      setError(null);
    } else {
      reset({ name: "", description: "" });
      setError(null);
      setLoading(false);
    }
  }, [open, role, reset]);

  const onSubmit = async (data: { name: string; description: string }) => {
    const name = data.name?.trim() || "";
    if (!name) {
      setError("El nombre es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (role) {
        await RolesService.update(role.id, { name, description: data.description });
      } else {
        await RolesService.create({ name, description: data.description });
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("Role save error:", err);
      setError("Error al guardar el role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{role ? "Editar role" : "Crear role"}</DialogTitle>
      <DialogContent>
        <form id="role-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => <TextField label="Nombre" fullWidth required {...field} sx={{ mt: 1 }} />}
          />

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField label="Descripción" fullWidth multiline rows={3} {...field} sx={{ mt: 2 }} />
            )}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="role-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : role ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleModal;
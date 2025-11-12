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
import { IUser } from "../../../../../common/interfaces/user.interface";
import { UsersService } from "../../../../../services/users";
import { IUserCreate, IUserUpdate } from "../../../../../models/services/users-services.interface";

interface UserModalProps {
  open: boolean;
  onClose: () => void;
  user?: IUser | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const UserModal: React.FC<UserModalProps> = ({ open, onClose, user, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<IUserCreate>({
    defaultValues: {
      name: "",
      email: "",
      role_id: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (user) {
        reset({
          name: user.full_name ?? "",
          email: user.email ?? "",
          role_id: user.role_id ?? "",
        });
      } else {
        reset({ name: "", email: "", role_id: "" });
      }
      setError(null);
    } else {
      reset({ name: "", email: "", role_id: "" });
      setError(null);
      setLoading(false);
    }
  }, [open, user, reset]);

  const onSubmit = async (data: IUserCreate) => {
    if (!data.name || !data.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!data.email || !data.email.trim()) {
      setError("El email es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload: IUserCreate = {
      name: data.name.trim(),
      email: data.email.trim(),
      role_id: data.role_id ?? "",
    };

    try {
      if (user) {
        await UsersService.update(user.id, payload as IUserUpdate);
      } else {
        await UsersService.create(payload);
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("User save error:", err);
      setError("Error al guardar el usuario.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{user ? "Editar usuario" : "Crear usuario"}</DialogTitle>
      <DialogContent>
        <form id="user-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Nombre" fullWidth required {...field} sx={{ mt: 1 }} />
            )}
          />

          <Controller
            name="email"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Email" fullWidth required {...field} sx={{ mt: 2 }} />
            )}
          />

          <Controller
            name="role_id"
            control={control}
            render={({ field }) => (
              <TextField label="Rol ID" fullWidth {...field} sx={{ mt: 2 }} />
            )}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="user-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : user ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserModal;
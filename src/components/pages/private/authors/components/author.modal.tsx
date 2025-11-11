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
import { IAuthor } from "../../../../../common/interfaces/author.interface";
import { AuthorsService } from "../../../../../services/authors";
import { IAuthorReq } from "../../../../../models/services/authors-services.interface";

interface AuthorModalProps {
  open: boolean;
  onClose: () => void;
  author?: IAuthor | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const formatToInputDate = (d?: string | Date | null) => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

const AuthorModal: React.FC<AuthorModalProps> = ({ open, onClose, author, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<IAuthorReq>({
    defaultValues: {
      name: "",
      nationality: null,
      birth_date: null,
      death_date: null,
      biography: null,
    },
  });

  useEffect(() => {
    if (open) {
      if (author) {
        reset({
          name: author.name ?? "",
          nationality: author.nationality ?? null,
          birth_date: formatToInputDate(author.birth_date) || null,
          death_date: formatToInputDate(author.death_date) || null,
          biography: author.biography ?? null,
        });
      } else {
        reset({ name: "", nationality: null, birth_date: null, death_date: null, biography: null });
      }
      setError(null);
    } else {
      reset({ name: "", nationality: null, birth_date: null, death_date: null, biography: null });
      setError(null);
      setLoading(false);
    }
  }, [open, author, reset]);

  const onSubmit = async (data: IAuthorReq) => {
    if (!data.name || !data.name.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload: IAuthorReq = {
      name: data.name.trim(),
      nationality: data.nationality ?? null,
      birth_date: data.birth_date ?? null,
      death_date: data.death_date ?? null,
      biography: data.biography ?? null,
    };

    try {
      if (author) {
        await AuthorsService.update(author.id, payload);
      } else {
        await AuthorsService.create(payload);
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("Author save error:", err);
      setError("Error al guardar el autor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{author ? "Editar autor" : "Crear autor"}</DialogTitle>
      <DialogContent>
        <form id="author-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Nombre" fullWidth required {...field} sx={{ mt: 1 }} />
            )}
          />

          <Controller
            name="nationality"
            control={control}
            render={({ field }) => (
              <TextField label="Nacionalidad" fullWidth {...field} sx={{ mt: 2 }} />
            )}
          />

          <Controller
            name="birth_date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...field}
                sx={{ mt: 2 }}
              />
            )}
          />

          <Controller
            name="death_date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Fecha de fallecimiento"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...field}
                sx={{ mt: 2 }}
              />
            )}
          />

          <Controller
            name="biography"
            control={control}
            render={({ field }) => (
              <TextField label="Biografía" fullWidth multiline minRows={3} {...field} sx={{ mt: 2 }} />
            )}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="author-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : author ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AuthorModal;
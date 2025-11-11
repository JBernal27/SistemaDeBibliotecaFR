import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IMaterial } from "../../../../../common/interfaces/material.interface";
import { IMaterialCreate, IMaterialUpdate } from "../../../../../models/services/materials-services.interface";
import { MaterialsService } from "../../../../../services/materials/material.service";
import { AuthorsService } from "../../../../../services/authors";
import { MaterialTypeService } from "../../../../../services/material_type/materialType.service";

interface MaterialModalProps {
  open: boolean;
  onClose: () => void;
  material?: IMaterial | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const MaterialModal: React.FC<MaterialModalProps> = ({ open, onClose, material, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<IMaterialCreate>({
    defaultValues: {
      title: "",
      author_id: "",
      type_id: "",
      img: "",
    } as IMaterialCreate,
  });

  useEffect(() => {
    if (open) {
      if (material) {
        reset({
          title: material.title ?? "",
          author_id: material.author_id ?? "",
          type_id: material.type_id ?? "",
          img: material.img ?? "",
        } as IMaterialCreate);
      } else {
        reset({ title: "", author_id: "", type_id: "", img: "" } as IMaterialCreate);
      }
      setError(null);
    } else {
      reset({ title: "", author_id: "", type_id: "", img: "" } as IMaterialCreate);
      setError(null);
      setLoading(false);
    }
  }, [open, material, reset]);

  // options for selects
  const [authorsOptions, setAuthorsOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [typesOptions, setTypesOptions] = useState<Array<{ id: string; name: string }>>([]);
  const [authorsLoading, setAuthorsLoading] = useState<boolean>(false);
  const [typesLoading, setTypesLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setAuthorsLoading(true);
      setTypesLoading(true);
      try {
        const [aList, tList] = await Promise.all([AuthorsService.getAll(), MaterialTypeService.getAll()]);
        setAuthorsOptions(aList.map((a) => ({ id: a.id, name: a.name })));
        setTypesOptions(tList.map((t) => ({ id: t.id, name: t.description })));
      } catch (err) {
        console.error("Error fetching authors/types:", err);
      } finally {
        setAuthorsLoading(false);
        setTypesLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const onSubmit = async (data: IMaterialCreate) => {
    const title = data.title?.trim() || "";
    if (!title) {
      setError("El título es obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    const payload: IMaterialCreate = {
      title,
      author_id: data.author_id || "",
      type_id: data.type_id || "",
      img: data.img || null,
    };

    try {
      if (material) {
        await MaterialsService.update(material.id, payload as IMaterialUpdate);
      } else {
        await MaterialsService.create(payload as IMaterialCreate);
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("Material save error:", err);
      setError("Error al guardar el material.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{material ? "Editar autor" : "Crear autor"}</DialogTitle>
      <DialogContent>
        <form id="material-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField label="Título" fullWidth required {...field} sx={{ mt: 1 }} />
            )}
          />

          <Controller
            name="author_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={authorsOptions}
                getOptionLabel={(opt) => opt.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={authorsOptions.find((o) => o.id === field.value) ?? null}
                onChange={(_, newVal) => field.onChange(newVal ? newVal.id : "")}
                loading={authorsLoading}
                renderInput={(params) => (
                  <TextField {...params} label="Autor" fullWidth sx={{ mt: 2 }} />
                )}
              />
            )}
          />

          <Controller
            name="type_id"
            control={control}
            render={({ field }) => (
              <Autocomplete
                options={typesOptions}
                getOptionLabel={(opt) => opt.name}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={typesOptions.find((o) => o.id === field.value) ?? null}
                onChange={(_, newVal) => field.onChange(newVal ? newVal.id : "")}
                loading={typesLoading}
                renderInput={(params) => (
                  <TextField {...params} label="Tipo" fullWidth sx={{ mt: 2 }} />
                )}
              />
            )}
          />

          <Controller
            name="img"
            control={control}
            render={({ field }) => (
              <TextField label="Imagen (URL)" fullWidth {...field} sx={{ mt: 2 }} />
            )}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="material-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : material ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MaterialModal;
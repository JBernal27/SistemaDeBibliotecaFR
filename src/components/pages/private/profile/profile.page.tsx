import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  CircularProgress,
  Typography,
  Grid,
  Divider,
  Alert,
  Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import axios from "axios";
import { UsersService } from "../../../../services/users";
import AuthStorage from "../../../utilities/auth-storage.utility";
import { IUser } from "../../../../common/interfaces/user.interface";
import AlertModal from "../../../utilities/alert-modal.utility";

interface IProfileForm {
  full_name: string;
  email: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const currentUser = AuthStorage.getUser();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm<IProfileForm>({
    defaultValues: {
      full_name: "",
      email: "",
    },
  });

  // Cargar datos del usuario
  useEffect(() => {
    const loadUserData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!currentUser?.id) {
          throw new Error("Usuario no autenticado");
        }

        const user = await UsersService.getById(currentUser.id);
        setUserData(user);
        reset({
          full_name: user.full_name || "",
          email: user.email || "",
        });
      } catch (e) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.detail ?? "Error al cargar perfil");
        } else if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("Error al cargar el perfil");
        }
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [reset, currentUser?.id]);

  // Manejar actualización de perfil
  const onSubmit = async (formData: IProfileForm) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      if (!currentUser?.id) {
        throw new Error("Usuario no autenticado");
      }

      await UsersService.update(currentUser.id, {
        full_name: formData.full_name,
        email: formData.email,
      });

      setSuccess("Perfil actualizado correctamente");
      // Actualizar AuthStorage con los nuevos datos
      const updatedUser = await UsersService.getById(currentUser.id);
      setUserData(updatedUser);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.detail ?? "Error al actualizar perfil");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error al actualizar el perfil");
      }
    } finally {
      setSaving(false);
    }
  };

  // Manejar cierre de cuenta
  const handleDeleteAccount = async () => {
    setDeletingAccount(true);
    setError(null);

    try {
      if (!currentUser?.id) {
        throw new Error("Usuario no autenticado");
      }

      await UsersService.delete(currentUser.id);

      // Logout y redirigir
      AuthStorage.logout();
      window.dispatchEvent(new Event("authChange"));
      navigate("/auth");
    } catch (e) {
      setDeletingAccount(false);
      if (axios.isAxiosError(e)) {
        setError(e.response?.data?.detail ?? "Error al eliminar cuenta");
      } else if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("Error al eliminar la cuenta");
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!userData) {
    return (
      <Box>
        <Typography color="error">
          No se pudo cargar la información del usuario
        </Typography>
      </Box>
    );
  }

  const formValues = watch();
  const hasChanges =
    formValues.full_name !== (userData.full_name || "") ||
    formValues.email !== (userData.email || "");

  return (
    <Box
      width={"100%"}
      height={"70vh"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box sx={{ maxWidth: 600, mx: "auto" }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert
            severity="success"
            sx={{ mb: 2 }}
            onClose={() => setSuccess(null)}
          >
            {success}
          </Alert>
        )}

        {/* Sección de Información del Perfil */}
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title="Mi Perfil"
            subheader={`Rol: ${userData.role?.name || "N/A"}`}
          />
          <Divider />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="full_name"
                    control={control}
                    rules={{ required: "El nombre es requerido" }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Nombre Completo"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "El email es requerido",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Email inválido",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Email"
                        type="email"
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Typography variant="caption" color="text.secondary">
                    ID de Usuario: {userData.id}
                  </Typography>
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={saving || !hasChanges}
                    startIcon={
                      saving ? <CircularProgress size={20} /> : <SaveIcon />
                    }
                  >
                    {saving ? "Guardando..." : "Guardar Cambios"}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>

        {/* Sección de Peligro - Cerrar Cuenta */}
        <Card sx={{ borderColor: "error.main", borderWidth: 2 }}>
          <CardHeader
            title="Zona de Peligro"
            titleTypographyProps={{ color: "error" }}
          />
          <Divider />
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="body2" color="text.secondary">
                Una vez que elimines tu cuenta, no hay marcha atrás. Por favor,
                asegúrate de que esta es la acción que deseas realizar.
              </Typography>

              <Button
                variant="contained"
                color="error"
                fullWidth
                startIcon={<DeleteIcon />}
                onClick={() => setDeleteModalOpen(true)}
              >
                Eliminar Mi Cuenta
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* Modal de Confirmación */}
        <AlertModal
          open={deleteModalOpen}
          title="Eliminar Cuenta"
          message="¿Estás completamente seguro de que deseas eliminar tu cuenta? Esta acción es irreversible y perderás acceso a todos tus datos."
          positiveText="Sí, eliminar mi cuenta"
          negativeText="Cancelar"
          positiveColor="error"
          loading={deletingAccount}
          onConfirm={handleDeleteAccount}
          onClose={() => setDeleteModalOpen(false)}
        />
      </Box>
    </Box>
  );
}

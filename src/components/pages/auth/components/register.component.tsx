import { useForm, Controller } from "react-hook-form";
import {
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { IRegisterReq } from "../../../../models/services/auth-services.interface";
import { useRegister } from "../hooks/auth.hook";

export const RegisterForm = () => {
  const { register: registerUser, loading, error, clearError } = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterReq>({
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IRegisterReq) => {
    clearError();
    await registerUser(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Controller
        name="full_name"
        control={control}
        rules={{
          required: "El nombre completo es requerido",
          minLength: {
            value: 3,
            message: "El nombre debe tener al menos 3 caracteres",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="register-fullname"
            label="Nombre Completo"
            autoComplete="name"
            autoFocus
            disabled={loading}
            error={!!errors.full_name}
            helperText={errors.full_name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: "El correo es requerido",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Correo electrónico inválido",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="register-email"
            label="Correo Electrónico"
            autoComplete="email"
            disabled={loading}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{
          required: "La contraseña es requerida",
          minLength: {
            value: 6,
            message: "La contraseña debe tener al menos 6 caracteres",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="register-password"
            autoComplete="new-password"
            disabled={loading}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, py: 1.5 }}
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : <PersonAddIcon />}
      >
        {loading ? "Registrando..." : "Registrarse"}
      </Button>
    </Box>
  );
};

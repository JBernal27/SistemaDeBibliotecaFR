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
  Login as LoginIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useLogin } from "../hooks/auth.hook";
import { ILoginReq } from "../../../../models/services/auth-services.interface";

export const LoginForm = () => {
  const { login, loading, error, clearError } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginReq>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: ILoginReq) => {
    clearError();
    await login(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

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
        render={({ field }: { field: any }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            id="login-email"
            label="Correo Electrónico"
            autoComplete="email"
            autoFocus
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
        render={({ field }: { field: any }) => (
          <TextField
            {...field}
            margin="normal"
            fullWidth
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            id="login-password"
            autoComplete="current-password"
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
        startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
      >
        {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
      </Button>
    </Box>
  );
};

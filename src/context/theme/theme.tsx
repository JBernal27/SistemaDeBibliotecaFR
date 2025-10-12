import {
  ThemeProvider,
  THEME_ID as MATERIAL_THEME_ID,
} from "@mui/material/styles";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material/styles";
import { extendTheme as joyExtendTheme } from "@mui/joy/styles";

const materialTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(25, 118, 210)",
    },
    secondary: {
      main: "rgb(0, 150, 136)",
    },
    success: {
      main: "rgb(56, 142, 60)",
    },
    warning: {
      main: "rgb(255, 179, 0)",
    },
    error: {
      main: "rgb(211, 47, 47)",
    },
    background: {
      paper: "rgb(245, 250, 255)", // Fondo de tarjetas, azul muy claro
      default: "rgb(238, 242, 247)", // Fondo general
    },
  },
  typography: {
    fontFamily: ["Ubuntu"].join(","),
    h1: {
      fontFamily: "Ubuntu",
      fontWeight: 700,
      fontSize: "60px",
      lineHeight: 1.5,
      color: "#0D47A1",
    },
    h2: {
      fontWeight: 700,
      fontSize: "42px",
      lineHeight: 1.5,
      color: "#1565C0",
    },
    h3: {
      fontWeight: 700,
      fontSize: "35px",
      lineHeight: 1.5,
      color: "#1976D2",
    },
    subtitle1: {
      fontWeight: 400,
      fontSize: "18px",
      lineHeight: 1.5,
      color: "#2E4053",
    },
    subtitle2: {
      fontWeight: 400,
      fontSize: "16px",
      lineHeight: 1.5,
      color: "#455A64",
    },
    body1: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: 1.5,
      color: "#37474F",
    },
    body2: {
      fontWeight: 400,
      fontSize: "12px",
      lineHeight: 1.5,
      color: "#607D8B",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          "& label.Mui-focused": {
            color: "#1565C0",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#B0BEC5",
            },
            "&:hover fieldset": {
              borderColor: "#64B5F6",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#1976D2",
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#1565C0",
          "& fieldset": {
            borderColor: "#B0BEC5",
          },
          "&:hover fieldset": {
            borderColor: "#64B5F6",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#1976D2",
          },
        },
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        root: {
          "&.notistack-MuiContent-success": {
            backgroundColor: "#43A047", // Verde éxito
          },
          "&.notistack-MuiContent-error": {
            backgroundColor: "#E53935", // Rojo error
          },
          "&.notistack-MuiContent-info": {
            backgroundColor: "#1E88E5", // Azul info
          },
          "&.notistack-MuiContent-warning": {
            backgroundColor: "#FFB300", // Amarillo advertencia
          },
        },
      },
    },
  },
});

const joyTheme = joyExtendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          500: "rgb(25, 118, 210)", // Azul biblioteca
          softBg: "rgba(25, 118, 210, 0.15)",
          softHoverBg: "rgba(25, 118, 210, 0.25)",
        },
        neutral: {
          500: "rgb(245, 245, 245)",
        },
        success: {
          500: "rgb(76, 175, 80)",
        },
        warning: {
          500: "rgb(255, 193, 7)",
        },
        danger: {
          500: "rgb(211, 47, 47)",
        },
        background: {
          body: "rgb(238, 242, 247)",
        },
      },
    },
  },
});

type RiwiThemeProps = {
  children: React.ReactNode;
};

export const Theme: React.FC<RiwiThemeProps> = ({ children }) => {
  return (
    <ThemeProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
      <JoyCssVarsProvider theme={joyTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </JoyCssVarsProvider>
    </ThemeProvider>
  );
};

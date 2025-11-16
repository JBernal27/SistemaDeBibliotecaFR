import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import axios from "axios";
import GraphicsService from "../../../../../services/graphics/graphics.service";

export default function GetLoansTypesBorrowedGraphic() {
  const [data, setData] = useState<{ label: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await GraphicsService.getMaterialTypesBorrowed();
        if (!mounted) return;
        const mapped = resp.map((d) => ({
          label: d.description || d.material_type,
          value: d.count,
        }));
        setData(mapped);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError(e.response?.data?.detail ?? "Error al cargar datos");
          return;
        }

        if (e instanceof Error) {
          setError(e.message);
          return;
        }

        setError("Error al cargar datos");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={260}
      >
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={260}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!data.length)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={260}
      >
        <Typography>No hay datos para mostrar</Typography>
      </Box>
    );

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h6" sx={{ fontWeight: 600 }}>
        Tipos de material prestado
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
      >
        <PieChart
          series={[
            {
              data,
              arcLabel: (item) => `${item.value}`,
              arcLabelMinAngle: 10,
              arcLabelRadius: "60%",
            },
          ]}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fontWeight: "bold",
            },
          }}
          width={220}
          height={260}
        />
      </Box>
    </Box>
  );
}

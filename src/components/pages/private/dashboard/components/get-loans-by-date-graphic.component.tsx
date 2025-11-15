import { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import axios from "axios";
import GraphicsService, {
  LoanPoint,
} from "../../../../../services/graphics/graphics.service";

export default function GetLoansByDateGraphic() {
  const [data, setData] = useState<LoanPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await GraphicsService.getLoansByDate();

        if (!mounted) return;
        const sorted = resp
          .slice()
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        setData(sorted);
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
        height={300}
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
        height={300}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );

  const xLabels = data.map((d) => d.date);
  const seriesData = data.map((d) => d.count);

  console.log(xLabels, seriesData);

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
        Préstamos por fecha
      </Typography>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ overflowX: "auto" }}
      >
        <LineChart
          xAxis={[{ scaleType: "band", data: xLabels }]}
          series={[
            {
              data: seriesData,
              area: true,
              label: "Préstamos",
            },
          ]}
          height={300}
          // width={Math.min(900, Math.max(300, xLabels.length * 60))}
          sx={{ maxWidth: "100%" }}
        />
      </Box>
    </Box>
  );
}

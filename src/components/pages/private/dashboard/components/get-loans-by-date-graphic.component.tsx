import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import { axiosInstance } from "../../../../../axios.config";

type LoanPoint = { date: string; count: number };

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
        const resp = await axiosInstance.get<LoanPoint[]>("/graphics/loans-by-date");

        if (!mounted) return;
        const sorted = resp.data
          .slice()
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
          );
        setData(sorted);
      } catch (e: any) {
        setError(
          e?.response?.data?.detail ?? e.message ?? "Error al cargar datos"
        );
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
    >
      <LineChart
        xAxis={[{ scaleType: 'point', data: xLabels }]}
        series={[
            { 
                data: seriesData, 
                area: true,
                label: 'Préstamos',
            }
        ]}
        height={300}
        width={Math.min(900, Math.max(300, xLabels.length * 60))}
        sx={{ maxWidth: "100%" }}
      />
    </Box>
  );
}

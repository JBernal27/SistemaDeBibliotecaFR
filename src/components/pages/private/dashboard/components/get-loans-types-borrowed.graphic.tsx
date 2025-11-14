import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { axiosInstance } from "../../../../../axios.config";

type TypePoint = { material_type: string; count: number };

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
        const resp = await axiosInstance.get<TypePoint[]>(
          "/graphics/material-types-borrowed"
        );
        if (!mounted) return;
        const mapped = resp.data.map((d) => ({ label: d.material_type, value: d.count }));
        setData(mapped);
      } catch (e: any) {
        setError(e?.response?.data?.detail ?? e.message ?? "Error al cargar datos");
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
      <Box display="flex" justifyContent="center" alignItems="center" height={260}>
        <CircularProgress />
      </Box>
    );

  if (error)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={260}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!data.length)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={260}>
        <Typography>No hay datos para mostrar</Typography>
      </Box>
    );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" width="100%">
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
        width={360}
        height={260}
      />
    </Box>
  );
}

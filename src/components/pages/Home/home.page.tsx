import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  CircularProgress,
  Zoom,
} from "@mui/material";
import MaterialCard from "./components/bookCard.component";
import { IMaterial } from "../../../common/interfaces/material.interface";
import { MaterialsService } from "../../../services/materials/material.service";
import FilterBar from "./components/filterBar.component";

const HomePage = () => {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterData, setFilterData] = useState<{
    type_id: string | null;
    availability: boolean | null;
    query: string | null;
  }>({
    type_id: null,
    availability: null,
    query: null,
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchMaterials = async () => {
      try {
        const data = await MaterialsService.getAll(filterData);
        setMaterials(data);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError("Error loading materials.");
      } finally {
        setLoading(false);
      }
      setLoading(false);
    };

    console.log("Filter Data Changed:", filterData);

    fetchMaterials();
  }, [filterData]);

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          component="header"
          sx={{
            textAlign: "center",
            py: 8,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "primary.main",
              fontWeight: "bold",
            }}
          >
            Bienvenido al Sistema de Biblioteca
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Aquí podrás ver los libros existentes en nuestra biblioteca: libros,
            revistas y periódicos.
          </Typography>
          <Typography variant="h6" color="text.secondary" mt={3}>
            Acércate a nuestras instalaciones para realizar el préstamo de los
            materiales que desees.
          </Typography>
        </Box>

        <FilterBar filterData={filterData} setFilterData={setFilterData} />

        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexGrow={1}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error" textAlign="center">
            {error}
          </Typography>
        ) : (
          <Grid container rowSpacing={6} columnSpacing={4} component="section">
            {materials.length === 0 ? (
              <Typography variant="h3" color="text.secondary" textAlign="center" flexGrow={1}>
                No se encontraron materiales.
              </Typography>
            ) : (
              materials.map((material, index) => (
                <Grid size={{ xs: 12, md: 4 }} key={index}>
                  <Zoom
                    in={!loading}
                    style={{ transformOrigin: "0 0 0" }}
                    timeout={1000}
                  >
                    <div>
                      <MaterialCard material={material} />
                    </div>
                  </Zoom>
                </Grid>
              ))
            )}
          </Grid>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;

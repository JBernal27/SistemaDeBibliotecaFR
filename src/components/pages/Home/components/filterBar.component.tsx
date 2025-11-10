import {
  Box,
  IconButton,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useFilterBar } from "../hooks/filterBar.hook";

interface FilterBarProps {
  filterData: {
    type_id: string | null;
    availability: boolean | null;
    query: string | null;
  };
  setFilterData: React.Dispatch<
    React.SetStateAction<{
      type_id: string | null;
      availability: boolean | null;
      query: string | null;
    }>
  >;
}

const FilterBar = ({ filterData, setFilterData }: FilterBarProps) => {
  const {
    searchText,
    materialTypes,
    handleTypeChange,
    handleAvailabilityChange,
    handleSearchChange,
    handleSearchSubmit,
  } = useFilterBar({ filterData, setFilterData });

  return (
    <Box pb={4} mt={2}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        flexWrap="wrap"
      >
        {/* Campo de búsqueda */}
        <Box
          display="flex"
          flex={1}
          minWidth={{ xs: "100%", sm: "280px" }}
          alignItems="center"
        >
          <TextField
            fullWidth
            id="search-field"
            label="Buscar Título o Autor"
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
          />
          <IconButton
            color="primary"
            aria-label="search"
            size="large"
            sx={{
              ml: { xs: 1, sm: 2 },
              mt: { xs: 1, sm: 0 },
              alignSelf: { xs: "flex-end", sm: "center" },
            }}
            onClick={handleSearchSubmit}
          >
            <SearchIcon fontSize="medium" />
          </IconButton>
        </Box>

        {/* Select de tipo */}
        <FormControl sx={{ minWidth: { xs: "100%", sm: 140 } }}>
          <InputLabel id="select-type-label">Tipo</InputLabel>
          <Select
            labelId="select-type-label"
            id="select-type"
            value={filterData.type_id ?? ""}
            onChange={handleTypeChange}
            label="Tipo"
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            {materialTypes.map((type) => (
              <MenuItem key={type.id} value={type.id}>
                {type.description}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Select de disponibilidad */}
        <FormControl sx={{ minWidth: { xs: "100%", sm: 160 } }}>
          <InputLabel id="select-availability-label">
            Disponibilidad
          </InputLabel>
          <Select
            labelId="select-availability-label"
            id="select-availability"
            value={
              filterData.availability === null
                ? ""
                : filterData.availability
                ? "Disponible"
                : "No Disponible"
            }
            onChange={handleAvailabilityChange}
            label="Disponibilidad"
          >
            <MenuItem value="">
              <em>Todos</em>
            </MenuItem>
            <MenuItem value="true">Disponible</MenuItem>
            <MenuItem value="false">Prestado</MenuItem>
          </Select>
        </FormControl>
      </Stack>
    </Box>
  );
};

export default FilterBar;

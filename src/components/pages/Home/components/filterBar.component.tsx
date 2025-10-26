import {
  Box,
  IconButton,
  TextField,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
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
    <Box
      display="flex"
      flexWrap="wrap"
      alignItems="center"
      gap={2}
      pb={4}
      mt={2}
    >
      <Box display="flex" flex={1}>
        <TextField
          fullWidth
          id="search-field"
          label="Buscar Titulo o Autor" //! Verificar funcionamiento en el Back
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
        />
        <IconButton
          color="primary"
          aria-label="search"
          size="large"
          sx={{ mr: "20px" }}
          onClick={handleSearchSubmit}
        >
          <SearchIcon fontSize="medium" />
        </IconButton>
      </Box>

      <FormControl sx={{ minWidth: 140 }}>
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

      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id="select-availability-label">Disponibilidad</InputLabel>
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
    </Box>
  );
};

export default FilterBar;

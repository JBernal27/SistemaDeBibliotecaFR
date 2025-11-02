import {
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  useEffect,
} from "react";
import { SelectChangeEvent } from "@mui/material";
import { IMaterialType } from "../../../../common/interfaces/matertialType.interface";
import { MaterialTypeService } from "../../../../services/material_type/materialType.service";

interface FilterData {
  type_id: string | null;
  availability: boolean | null;
  query: string | null;
}

interface UseFilterBarProps {
  filterData: FilterData;
  setFilterData: Dispatch<SetStateAction<FilterData>>;
}

export const useFilterBar = ({ setFilterData }: UseFilterBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [materialTypes, setMaterialTypes] = useState<IMaterialType[]>([]);

  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const types = await MaterialTypeService.getAll();
        setMaterialTypes(types);
      } catch (error) {
        console.error("Error fetching material types:", error);
      }
    };

    fetchTypes();
  }, []);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value === "" ? null : event.target.value;
    setFilterData((prev) => ({ ...prev, type_id: value }));
  };

  const handleAvailabilityChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value === "" ? null : event.target.value === "true" ? true : false;
    setFilterData((prev) => ({ ...prev, availability: value }));
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearchSubmit = () => {
    setFilterData((prev) => ({ ...prev, query: searchText }));
  };

  return {
    searchText,
    materialTypes,
    handleTypeChange,
    handleAvailabilityChange,
    handleSearchChange,
    handleSearchSubmit,
  };
};

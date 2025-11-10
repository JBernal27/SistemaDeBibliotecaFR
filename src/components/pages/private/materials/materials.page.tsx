import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { IMaterial } from "../../../../common/interfaces/material.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlertModal from "../../../utilities/alert-modal.utility";
import MaterialModal from "./components/material.modal";
import { MaterialsService } from "../../../../services/materials/material.service";
import noImageAvailable from "../../../../assets/images/image-not-found.jpg";

export default function MaterialsTable() {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"delete" | "edit" | null>(
    null
  );
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(
    null
  );
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMaterial, setModalMaterial] = useState<IMaterial | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await MaterialsService.getAll();
        setMaterials(data);
        // reset isChanged flag after successful refetch
        setIsChanged(false);
      } catch (err) {
        console.error("Error fetching materials:", err);
        setError("Error loading materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [isChanged]);

  const openConfirm = (type: "delete" | "edit", materialId: string) => {
    setConfirmType(type);
    setSelectedMaterialId(materialId);
    setConfirmOpen(true);
  };

  const handleEdit = (materialId: string) => {
    // open edit modal for the selected material
    const found = materials.find((m) => m.id === materialId) ?? null;
    setModalMaterial(found);
    setModalOpen(true);
  };

  const handleDelete = (materialId: string) => {
    openConfirm("delete", materialId);
  };

  const handleConfirm = async () => {
    if (!selectedMaterialId || !confirmType) {
      setConfirmOpen(false);
      return;
    }

    if (confirmType === "edit") {
      setConfirmOpen(false);
      navigate(`/materials/${selectedMaterialId}/edit`);
      return;
    }

    setActionLoading(true);
    try {
      await MaterialsService.delete(selectedMaterialId);
      const data = await MaterialsService.getAll();
      setMaterials(data);
    } catch (err) {
      console.error("Error deleting material:", err);
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
      setSelectedMaterialId(null);
      setConfirmType(null);
    }
  };

  const handleCancel = () => {
    if (actionLoading) return;
    setConfirmOpen(false);
    setSelectedMaterialId(null);
    setConfirmType(null);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontSize: {
              xs: "1.5rem",
              sm: "1.8rem",
              md: "2rem",
            },
          }}
        >
          Materiales Existentes
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setModalMaterial(null);
            setModalOpen(true);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
            minWidth: { xs: "auto", sm: "150px" },
            px: { xs: 1.5, sm: 3 },
          }}
        >
          <Typography variant="body1" color="inherit">
            Agregar Material
          </Typography>
          <PersonAddIcon sx={{ fontSize: "25px" }} />
        </Button>
      </Box>
      <Box>
        <TableContainer
          component={Paper}
          sx={{
            borderRadius: 2,
            boxShadow: 4,
            width: "100%",
            overflowX: "auto",
            display: "block",
            "&::-webkit-scrollbar": {
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#a8a8a8",
            },
          }}
        >
          {loading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              p={6}
            >
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box p={4} display="flex" justifyContent="center">
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Table sx={{ minWidth: 900, tableLayout: "fixed" }} aria-label="materials table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: 80 }}>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nacionalidad</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nacimiento</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Muerte</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Biografía</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Acciones</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow
                    key={material.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <TableCell sx={{ width: 80 }}>
                      <div style={{ width: 60 }}>
                        <img
                          src={material.img || noImageAvailable}
                          alt={material.title}
                          style={{ width: "60px", height: "auto", display: "block" }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>{material.title}</TableCell>
                    <TableCell>{material.author.name}</TableCell>
                    <TableCell>{material.material_type.description}</TableCell>
                    <TableCell>{String(material.date_added)}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        color="warning"
                        onClick={() => handleEdit(material.id)}
                      >
                        <EditIcon sx={{ fontSize: "25px" }} color="inherit" />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(material.id)}
                      >
                        <DeleteIcon sx={{ fontSize: "25px" }} color="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Box>

      <AlertModal
        open={confirmOpen}
        title={confirmType === "delete" ? "Eliminar material" : "Editar material"}
        message={
          confirmType === "delete"
            ? "¿Estás seguro de que deseas eliminar este material? Esta acción no se puede deshacer."
            : "¿Deseas editar los datos de este material?"
        }
        positiveText={confirmType === "delete" ? "Eliminar" : "Editar"}
        negativeText="Cancelar"
        onConfirm={handleConfirm}
        onClose={handleCancel}
        loading={actionLoading}
        positiveColor={confirmType === "delete" ? "error" : "primary"}
      />

      <MaterialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        material={modalMaterial}
        setIsChanged={setIsChanged}
      />
    </Box>
  );
}

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
import VisibilityIcon from "@mui/icons-material/Visibility";  
import AlertModal from "../../../utilities/alert-modal.utility";
import MaterialModal from "./components/material.modal";
import MaterialView from "../../../../common/components/material.view";        
import { MaterialsService } from "../../../../services/materials/material.service";
import noImageAvailable from "../../../../assets/images/image-not-found.jpg";

export default function MaterialsTable() {
  const [materials, setMaterials] = useState<IMaterial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"delete" | "edit" | null>(null);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalMaterial, setModalMaterial] = useState<IMaterial | null>(null);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
  const [viewMaterial, setViewMaterial] = useState<IMaterial | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await MaterialsService.getAll();
        setMaterials(data);
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
    const found = materials.find((m) => m.id === materialId) ?? null;
    setModalMaterial(found);
    setModalOpen(true);
  };

  const handleDelete = (materialId: string) => openConfirm("delete", materialId);

  
  const handleView = (material: IMaterial) => {
    setViewMaterial(material);
    setViewOpen(true);
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
      {/* HEADER */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
      >
        <Typography variant="h4">Materiales Existentes</Typography>

        <Button
          variant="contained"
          onClick={() => {
            setModalMaterial(null);
            setModalOpen(true);
          }}
        >
          Agregar Material <PersonAddIcon sx={{ ml: 1 }} />
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 4 }}>
        {loading ? (
          <Box p={6} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={4} display="flex" justifyContent="center">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Imagen</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Autor</strong></TableCell>
                <TableCell><strong>Tipo</strong></TableCell>
                <TableCell><strong>Fecha</strong></TableCell>
                <TableCell align="right"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => (
                <TableRow key={material.id}>
                  
                  {/* IMAGEN */}
                  <TableCell>
                    <img
                      src={material.img || noImageAvailable}
                      style={{ width: 60 }}
                    />
                  </TableCell>

                  <TableCell>{material.title}</TableCell>
                  <TableCell>{material.author.name}</TableCell>
                  <TableCell>{material.material_type.description}</TableCell>
                  <TableCell>{String(material.date_added)}</TableCell>

                  <TableCell align="right">
                    {/* 👁 NUEVO → botón VER */}
                    <IconButton
                      color="info"
                      onClick={() => handleView(material)}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      onClick={() => handleEdit(material.id)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(material.id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* MODALES */}
      <AlertModal
        open={confirmOpen}
        title={confirmType === "delete" ? "Eliminar material" : "Editar material"}
        message={
          confirmType === "delete"
            ? "¿Deseas eliminar este registro?"
            : "¿Deseas editar este material?"
        }
        positiveText={confirmType === "delete" ? "Eliminar" : "Editar"}
        negativeText="Cancelar"
        onConfirm={handleConfirm}
        onClose={handleCancel}
        loading={actionLoading}
      />

      <MaterialModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        material={modalMaterial}
        setIsChanged={setIsChanged}
      />

      {/* 👁 MODAL DE VISUALIZACIÓN */}
      <MaterialView
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        material={viewMaterial}
      />
    </Box>
  );
}

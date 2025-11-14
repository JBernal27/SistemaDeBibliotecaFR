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
  import { IMaterialType } from "../../../../../common/interfaces/matertialType.interface";
  import { useEffect, useState } from "react";
  import EditIcon from "@mui/icons-material/Edit";
  import DeleteIcon from "@mui/icons-material/Delete";
  import PersonAddIcon from "@mui/icons-material/PersonAdd";
  import AlertModal from "../../../../utilities/alert-modal.utility";
  import MaterialTypeModal from "./material-type.modal";
  import { MaterialTypeService } from "../../../../../services/material_type/materialType.service";

  export default function MaterialTypeTable() {
    const [types, setTypes] = useState<IMaterialType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<IMaterialType | null>(null);

    useEffect(() => {
      const fetchTypes = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await MaterialTypeService.getAll();
          setTypes(data);
          setIsChanged(false);
        } catch (err) {
          console.error("Error fetching material types:", err);
          setError("Error loading tipos de material.");
        } finally {
          setLoading(false);
        }
      };

      fetchTypes();
    }, [isChanged]);

    const handleEdit = (typeId: string) => {
      const found = types.find((t) => t.id === typeId) ?? null;
      setModalType(found);
      setModalOpen(true);
    };

    const handleDelete = (typeId: string) => {
      setSelectedTypeId(typeId);
      setConfirmOpen(true);
    };

    const handleConfirm = async () => {
      if (!selectedTypeId) {
        setConfirmOpen(false);
        return;
      }

      setActionLoading(true);
      try {
        await MaterialTypeService.delete(selectedTypeId);
        const data = await MaterialTypeService.getAll();
        setTypes(data);
      } catch (err) {
        console.error("Error deleting material type:", err);
      } finally {
        setActionLoading(false);
        setConfirmOpen(false);
        setSelectedTypeId(null);
      }
    };

    const handleCancel = () => {
      if (actionLoading) return;
      setConfirmOpen(false);
      setSelectedTypeId(null);
    };

    return (
      <Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
          <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }}>
            Tipos de Material
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModalType(null);
              setModalOpen(true);
            }}
            sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: { xs: "auto", sm: "150px" }, px: { xs: 1.5, sm: 3 } }}
          >
            <Typography variant="body1" color="inherit">
              Crear Tipo
            </Typography>
            <PersonAddIcon sx={{ fontSize: "22px" }} />
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 4, width: "100%", overflowX: "auto", display: "block" }}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={6}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box p={4} display="flex" justifyContent="center">
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Table sx={{ minWidth: 500, tableLayout: "fixed" }} aria-label="material types table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Descripción</strong>
                  </TableCell>
                  <TableCell align="right">
                    <strong>Acciones</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {types.map((t) => (
                  <TableRow key={t.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { backgroundColor: "action.hover" } }}>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.description}</TableCell>
                    <TableCell align="right">
                      <IconButton color="warning" onClick={() => handleEdit(t.id)}>
                        <EditIcon sx={{ fontSize: "22px" }} />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(t.id)}>
                        <DeleteIcon sx={{ fontSize: "22px" }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>

        <AlertModal
          open={confirmOpen}
          title={"Eliminar tipo de material"}
          message={"¿Estás seguro de que deseas eliminar este tipo? Esta acción no se puede deshacer."}
          positiveText={"Eliminar"}
          negativeText="Cancelar"
          onConfirm={handleConfirm}
          onClose={handleCancel}
          loading={actionLoading}
          positiveColor={"error"}
        />

        <MaterialTypeModal open={modalOpen} onClose={() => setModalOpen(false)} materialType={modalType} setIsChanged={setIsChanged} />
      </Box>
    );
  }

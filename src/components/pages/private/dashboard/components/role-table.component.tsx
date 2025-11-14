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
import { IRole } from "../../../../../common/interfaces/role.interface";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlertModal from "../../../../utilities/alert-modal.utility";
import RoleModal from "./role.modal";
import { RolesService } from "../../../../../services/roles/roles.service";

export default function RolesTable() {
  const [roles, setRoles] = useState<IRole[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalRole, setModalRole] = useState<IRole | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await RolesService.getAll();
        setRoles(data);
        setIsChanged(false);
      } catch (err) {
        console.error("Error fetching roles:", err);
        setError("Error loading roles.");
      } finally {
        setLoading(false);
      }
    };

    fetchRoles();
  }, [isChanged]);

  const handleEdit = (roleId: string) => {
    const found = roles.find((r) => r.id === roleId) ?? null;
    setModalRole(found);
    setModalOpen(true);
  };

  const handleDelete = (roleId: string) => {
    setSelectedRoleId(roleId);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedRoleId) {
      setConfirmOpen(false);
      return;
    }

    setActionLoading(true);
    try {
      await RolesService.delete(selectedRoleId);
      const data = await RolesService.getAll();
      setRoles(data);
    } catch (err) {
      console.error("Error deleting role:", err);
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
      setSelectedRoleId(null);
    }
  };

  const handleCancel = () => {
    if (actionLoading) return;
    setConfirmOpen(false);
    setSelectedRoleId(null);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap">
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2rem" } }}>
          Roles
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setModalRole(null);
            setModalOpen(true);
          }}
          sx={{ display: "flex", alignItems: "center", gap: 1, minWidth: { xs: "auto", sm: "150px" }, px: { xs: 1.5, sm: 3 } }}
        >
          <Typography variant="body1" color="inherit">
            Crear Role
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
          <Table sx={{ minWidth: 400, tableLayout: "fixed" }} aria-label="roles table">
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
              {roles.map((role) => (
                <TableRow key={role.id} sx={{ "&:last-child td, &:last-child th": { border: 0 }, "&:hover": { backgroundColor: "action.hover" } }}>
                  <TableCell>{role.name}</TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell align="right">
                    <IconButton color="warning" onClick={() => handleEdit(role.id)}>
                      <EditIcon sx={{ fontSize: "22px" }} />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(role.id)}>
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
        title={"Eliminar role"}
        message={"¿Estás seguro de que deseas eliminar este role? Esta acción no se puede deshacer."}
        positiveText={"Eliminar"}
        negativeText="Cancelar"
        onConfirm={handleConfirm}
        onClose={handleCancel}
        loading={actionLoading}
        positiveColor={"error"}
      />

      <RoleModal open={modalOpen} onClose={() => setModalOpen(false)} role={modalRole} setIsChanged={setIsChanged} />
    </Box>
  );
}

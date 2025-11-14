import{
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
import { IUser } from "../../../../common/interfaces/user.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../../../../services/users";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AlertModal from "../../../utilities/alert-modal.utility";
import UserModal from "./components/user.modal";

export default function UsersTable() {
    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoading, setActionLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
    const [confirmType, setConfirmType] = useState<"delete" | "edit" | null>(null);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalUser, setModalUser] = useState<IUser | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await UsersService.getAll();
          setUsers(data);
          setIsChanged(false);
        } catch (err) {
          console.error("Error fetching users:", err);
          setError("Error loading users.");
        } finally {
          setLoading(false);
        }
      };

      fetchUsers();
    }, [isChanged]);

    const openConfirm = (type: "delete" | "edit", userId: string) => {
      setConfirmType(type);
      setSelectedUserId(userId);
      setConfirmOpen(true);
    };

    const handleEdit = (userId: string) => {
      const found = users.find((u) => u.id === userId) ?? null;
      setModalUser(found);
      setModalOpen(true);
    };

    const handleDelete = (userId: string) => {
      openConfirm("delete", userId);
    };

    const handleConfirm = async () => {
      if (!selectedUserId || !confirmType) {
        setConfirmOpen(false);
        return;
      }

      if (confirmType === "edit") {
        setConfirmOpen(false);
        navigate(`/users/${selectedUserId}/edit`);
        return;
      }

      setActionLoading(true);
      try {
        await UsersService.delete(selectedUserId);
        const data = await UsersService.getAll();
        setUsers(data);
      } catch (err) {
        console.error("Error deleting user:", err);
      } finally {
        setActionLoading(false);
        setConfirmOpen(false);
        setSelectedUserId(null);
        setConfirmType(null);
      }
    };

    const handleCancel = () => {
      if (actionLoading) return;
      setConfirmOpen(false);
      setSelectedUserId(null);
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
            Usuarios Registrados
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setModalUser(null);
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
              Agregar Usuario
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
              <Table sx={{ minWidth: 900 }} aria-label="users table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Nombre</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Email</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Rol</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>Acciones</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow
                      key={user.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&:hover": { backgroundColor: "action.hover" },
                      }}
                    >
                      <TableCell>{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role?.name ?? "—"}</TableCell>
                      <TableCell align="center">
                        <IconButton
                          color="warning"
                          onClick={() => handleEdit(user.id)}
                        >
                          <EditIcon sx={{ fontSize: "25px" }} color="inherit" />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(user.id)}
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
          title={confirmType === "delete" ? "Eliminar usuario" : "Editar usuario"}
          message={
            confirmType === "delete"
              ? "¿Estás seguro de que deseas eliminar este usuario? Esta acción no se puede deshacer."
              : "¿Deseas editar los datos de este usuario?"
          }
          positiveText={confirmType === "delete" ? "Eliminar" : "Editar"}
          negativeText="Cancelar"
          onConfirm={handleConfirm}
          onClose={handleCancel}
          loading={actionLoading}
          positiveColor={confirmType === "delete" ? "error" : "primary"}
        />

        <UserModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          user={modalUser}
          setIsChanged={setIsChanged}
        />
      </Box>
    );
}

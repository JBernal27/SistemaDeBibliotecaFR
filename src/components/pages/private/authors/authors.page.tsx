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
import { IAuthor } from "../../../../common/interfaces/author.interface";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthorsService } from "../../../../services/authors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AlertModal from "../../../utilities/alert-modal.utility";
import AuthorModal from "./components/author.modal";

export default function AuthorsTable() {
  const [authors, setAuthors] = useState<IAuthor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"delete" | "edit" | null>(
    null 
  );
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalAuthor, setModalAuthor] = useState<IAuthor | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthors = async () => {
      setLoading(true);
      setError(null);
      try {
          const data = await AuthorsService.getAll();
          setAuthors(data);
          // reset isChanged flag after successful refetch
          setIsChanged(false);
        } catch (err) {
        console.error("Error fetching authors:", err);
        setError("Error loading authors.");
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, [isChanged]);

  const openConfirm = (type: "delete" | "edit", authorId: string) => {
    setConfirmType(type);
    setSelectedAuthorId(authorId);
    setConfirmOpen(true);
  };

  const handleEdit = (authorId: string) => {
    // open edit modal for the selected author
    const found = authors.find((a) => a.id === authorId) ?? null;
    setModalAuthor(found);
    setModalOpen(true);
  };

  const handleDelete = (authorId: string) => {
    openConfirm("delete", authorId);
  };

  const handleConfirm = async () => {
    if (!selectedAuthorId || !confirmType) {
      setConfirmOpen(false);
      return;
    }

    if (confirmType === "edit") {
      setConfirmOpen(false);
      navigate(`/authors/${selectedAuthorId}/edit`);
      return;
    }

    setActionLoading(true);
    try {
      await AuthorsService.delete(selectedAuthorId);
      const data = await AuthorsService.getAll();
      setAuthors(data);
    } catch (err) {
      console.error("Error deleting author:", err);
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
      setSelectedAuthorId(null);
      setConfirmType(null);
    }
  };

  const handleCancel = () => {
    if (actionLoading) return;
    setConfirmOpen(false);
    setSelectedAuthorId(null);
    setConfirmType(null);
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" gutterBottom>
          Autores Registrados
        </Typography>
        <Button variant="contained" color="primary" onClick={() => { setModalAuthor(null); setModalOpen(true); }}>
          <Typography variant="body1" color="inherit">
            Agregar Autor
          </Typography>
          <PersonAddIcon sx={{fontSize: "25px", ml: 2}}/>
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 2 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={6}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box p={4} display="flex" justifyContent="center">
            <Typography color="error">{error}</Typography>
          </Box>
        ) : (
          <Table sx={{ minWidth: 900 }} aria-label="authors table">
            <TableHead>
              <TableRow>
                <TableCell>
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
                  <strong>Biografia</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Materiales</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {authors.map((author) => (
                <TableRow
                  key={author.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <TableCell>{author.name}</TableCell>
                  <TableCell>{author.nationality}</TableCell>
                  <TableCell>
                    {author.birth_date
                      ? new Date(author.birth_date).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    {author.death_date
                      ? new Date(author.death_date).toLocaleDateString()
                      : "—"}
                  </TableCell>
                  <TableCell
                    sx={{
                      maxWidth: 250,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {author.biography ?? "—"}
                  </TableCell>
                  <TableCell align="center">
                    {author.materials.length}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="warning"
                      onClick={() => handleEdit(author.id)}
                    >
                      <EditIcon sx={{ fontSize: "25px" }} color="inherit" />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(author.id)}
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

      <AlertModal
        open={confirmOpen}
        title={confirmType === "delete" ? "Eliminar autor" : "Editar autor"}
        message={
          confirmType === "delete"
            ? "¿Estás seguro de que deseas eliminar este autor? Esta acción no se puede deshacer."
            : "¿Deseas editar los datos de este autor?"
        }
        positiveText={confirmType === "delete" ? "Eliminar" : "Editar"}
        negativeText="Cancelar"
        onConfirm={handleConfirm}
        onClose={handleCancel}
        loading={actionLoading}
        positiveColor={confirmType === "delete" ? "error" : "primary"}
      />

      <AuthorModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        author={modalAuthor}
        setIsChanged={setIsChanged}
      />
    </Box>
  );
}

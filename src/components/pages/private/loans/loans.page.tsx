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
import { useEffect, useState } from "react";
import { ILoan } from "../../../../common/interfaces/loan.interface";
import { LoansService } from "../../../../services/loan";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AlertModal from "../../../utilities/alert-modal.utility";
import LoanModal from "./components/loan.modal";

export default function LoansTable() {
  const [loans, setLoans] = useState<ILoan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [confirmType, setConfirmType] = useState<"return" | null>(null);
  const [selectedLoanId, setSelectedLoanId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalLoan, setModalLoan] = useState<ILoan | null>(null);
  
  useEffect(() => {
    const fetchLoans = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await LoansService.getAll();
        setLoans(data);
      } catch (err) {
        console.error("Error fetching loans:", err);
        setError("Error cargando los préstamos.");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [isChanged]);

  const openConfirm = (type: "return", loanId: string) => {
    setConfirmType(type);
    setSelectedLoanId(loanId);
    setConfirmOpen(true);
  };

  // Edit opens modal with the full loan object
  const handleEdit = (loan: ILoan) => {
    setModalLoan(loan);
    setModalOpen(true);
  };

  // Return opens confirmation modal (AlertModal)
  const handleReturn = (loanId: string) => {
    openConfirm("return", loanId);
  };

  const handleConfirm = async () => {
    if (!selectedLoanId || !confirmType) {
      setConfirmOpen(false);
      return;
    }

    setActionLoading(true);
    try {
      await LoansService.returnLoan(selectedLoanId);
      setIsChanged((prev) => !prev);
    } catch (err) {
      console.error("Error returning loan:", err);
      setError("Error al devolver el préstamo.");
    } finally {
      setActionLoading(false);
      setConfirmOpen(false);
      setSelectedLoanId(null);
      setConfirmType(null);
    }
  };

  const handleCancel = () => {
    if (actionLoading) return;
    setConfirmOpen(false);
    setSelectedLoanId(null);
    setConfirmType(null);
  };

  return (
    <Box>
      <LoanModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        loan={modalLoan}
        setIsChanged={setIsChanged}
      />
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" gutterBottom>
          Préstamos Registrados
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setModalLoan(null);
            setModalOpen(true);
          }}
          startIcon={<AddCircleOutlineIcon />}
        >
          <Typography variant="body1" color="inherit">
            Agregar Préstamo
          </Typography>
        </Button>
      </Box>

      {/* Table */}
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
          <Table sx={{ minWidth: 900 }} aria-label="loans table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Usuario</strong>
                </TableCell>
                <TableCell>
                  <strong>Material</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha de Préstamo</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha Esperada de Devolución</strong>
                </TableCell>
                <TableCell>
                  <strong>Fecha Real de Devolución</strong>
                </TableCell>
                <TableCell>
                  <strong>Estado</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Acciones</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loans.map((loan) => (
                <TableRow
                  key={loan.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <TableCell>{loan.user?.name ?? "—"}</TableCell>
                  <TableCell>{loan.material?.title ?? "—"}</TableCell>
                  <TableCell>{loan.loan_date ? new Date(loan.loan_date).toLocaleDateString() : "—"}</TableCell>
                  <TableCell>
                    {loan.expected_return_date ? new Date(loan.expected_return_date).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>
                    {loan.actual_return_date ? new Date(loan.actual_return_date).toLocaleDateString() : "—"}
                  </TableCell>
                  <TableCell>{loan.status?.name ?? loan.status_id ?? "—"}</TableCell>
                  <TableCell align="center">
                    <IconButton color="warning" onClick={() => handleEdit(loan)}>
                      <EditIcon sx={{ fontSize: "25px" }} color="inherit" />
                    </IconButton>
                    <IconButton color="success" onClick={() => handleReturn(loan.id)} disabled={!!loan.actual_return_date}>
                      <Typography variant="body2">Devolver</Typography>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      {/* Confirmación */}
      <AlertModal
        open={confirmOpen}
        title={"Devolver préstamo"}
        message={"¿Estás seguro de que deseas marcar este préstamo como devuelto?"}
        positiveText={"Devolver"}
        negativeText="Cancelar"
        onConfirm={handleConfirm}
        onClose={handleCancel}
        loading={actionLoading}
        positiveColor={"success"}
      />
    </Box>
  );
}
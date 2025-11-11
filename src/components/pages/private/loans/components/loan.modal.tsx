import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { ILoan } from "../../../../../common/interfaces/loan.interface";
import { LoansService } from "../../../../../services/loan";
import { ILoanReq } from "../../../../../models/services/loans-services.interface";

interface LoanModalProps {
  open: boolean;
  onClose: () => void;
  loan?: ILoan | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

// Formato de fecha compatible con <input type="date">
const formatToInputDate = (d?: string | Date | null): string => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

// Interface para el formulario (usa strings para los inputs de fecha)
interface LoanFormData {
  material_id: string;
  user_id: string;
  expected_return_date: string;
  actual_return_date: string;
  status_id: string;
}

const LoanModal: React.FC<LoanModalProps> = ({ open, onClose, loan, setIsChanged }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { control, handleSubmit, reset } = useForm<LoanFormData>({
    defaultValues: {
      material_id: "",
      user_id: "",
      expected_return_date: "",
      actual_return_date: "",
      status_id: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (loan) {
        reset({
          material_id: loan.material_id ?? "",
          user_id: loan.user_id ?? "",
          expected_return_date: formatToInputDate(loan.expected_return_date),
          actual_return_date: formatToInputDate(loan.actual_return_date),
          status_id: loan.status_id ?? "",
        });
      } else {
        reset({
          material_id: "",
          user_id: "",
          expected_return_date: "",
          actual_return_date: "",
          status_id: "",
        });
      }
      setError(null);
    }
  }, [open, loan, reset]);

  const onSubmit = async (formData: LoanFormData) => {
    if (!formData.material_id || !formData.user_id || !formData.status_id) {
      setError("Todos los campos obligatorios deben estar completos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Convertir los datos del formulario a ILoanReq
      const payload: ILoanReq = {
        material_id: formData.material_id.trim(),
        user_id: formData.user_id.trim(),
        status_id: formData.status_id.trim(),
        expected_return_date: formData.expected_return_date 
          ? new Date(formData.expected_return_date) 
          : new Date(), // Si está vacío, usar fecha actual
        actual_return_date: formData.actual_return_date 
          ? new Date(formData.actual_return_date) 
          : null,
      };

      if (loan) {
        // ⚠️ IMPORTANTE: Necesitas un método update en LoansService
        // Por ahora solo usamos returnLoan para devolver préstamo
        await LoansService.returnLoan(loan.id);
      } else {
        // Para crear nuevo préstamo
        await LoansService.create(payload);
      }

      setIsChanged(true);
      onClose();
    } catch (err) {
      console.error("Loan save error:", err);
      setError("Error al guardar el préstamo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => (loading ? undefined : onClose())} fullWidth maxWidth="sm">
      <DialogTitle>{loan ? "Editar préstamo" : "Crear préstamo"}</DialogTitle>
      <DialogContent>
        <form id="loan-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="material_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField 
                label="ID del material" 
                fullWidth 
                required 
                {...field} 
                sx={{ mt: 1 }} 
              />
            )}
          />

          <Controller
            name="user_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField 
                label="ID del usuario" 
                fullWidth 
                required 
                {...field} 
                sx={{ mt: 2 }} 
              />
            )}
          />

          <Controller
            name="expected_return_date"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Fecha esperada de devolución"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
                {...field}
                sx={{ mt: 2 }}
              />
            )}
          />

          <Controller
            name="actual_return_date"
            control={control}
            render={({ field }) => (
              <TextField
                label="Fecha real de devolución"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                {...field}
                sx={{ mt: 2 }}
              />
            )}
          />

          <Controller
            name="status_id"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Estado del préstamo (ID)"
                fullWidth
                required
                {...field}
                sx={{ mt: 2 }}
              />
            )}
          />

          {error && <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>}
        </form>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="loan-form" variant="contained" disabled={loading}>
          {loading ? <CircularProgress size={20} color="inherit" /> : loan ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanModal;
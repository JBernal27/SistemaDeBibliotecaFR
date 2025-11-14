import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

import { ILoan } from "../../../../../common/interfaces/loan.interface";
import { LoansService } from "../../../../../services/loan";
import { ILoanReq } from "../../../../../models/services/loans-services.interface";

import { UsersService } from "../../../../../services/users";
import { MaterialsService } from "../../../../../services/materials/material.service";
import { LoanStatusService } from "../../../../../services/loan_status/loanStatus.service";

interface LoanModalProps {
  open: boolean;
  onClose: () => void;
  loan?: ILoan | null;
  setIsChanged: Dispatch<SetStateAction<boolean>>;
}

const formatToInputDate = (d?: string | Date | null): string => {
  if (!d) return "";
  const date = d instanceof Date ? d : new Date(d);
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10);
};

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

  const [materials, setMaterials] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [statuses, setStatuses] = useState<any[]>([]);
  const [loadingOptions, setLoadingOptions] = useState<boolean>(true);

  const { control, handleSubmit, reset } = useForm<LoanFormData>({
    defaultValues: {
      material_id: "",
      user_id: "",
      expected_return_date: "",
      actual_return_date: "",
      status_id: "",
    },
  });

  // ---- Cargar opciones (usuarios, materiales, estados) ----
  useEffect(() => {
    if (open) {
      const loadOptions = async () => {
        setLoadingOptions(true);
        try {
          const [materialsResp, usersResp, statusResp] = await Promise.all([
            MaterialsService.getAll(),
            UsersService.getAll(),
            LoanStatusService.getAll(),
          ]);

          setMaterials(materialsResp);
          setUsers(usersResp);
          setStatuses(statusResp);
        } catch (e) {
          console.error(e);
          setError("Error al cargar las opciones del formulario.");
        } finally {
          setLoadingOptions(false);
        }
      };

      loadOptions();
    }
  }, [open]);

  // ---- Cargar datos si es edición ----
  useEffect(() => {
    if (open) {
      if (loan) {
        reset({
          material_id: loan.material_id ?? "",
          user_id: loan.user_id ?? "",
          status_id: loan.status_id ?? "",
          expected_return_date: formatToInputDate(loan.expected_return_date),
          actual_return_date: formatToInputDate(loan.actual_return_date),
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

  // ---- Guardar ----
  const onSubmit = async (formData: LoanFormData) => {
    if (!formData.material_id || !formData.user_id || !formData.status_id) {
      setError("Todos los campos obligatorios deben estar completos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload: ILoanReq = {
        material_id: formData.material_id,
        user_id: formData.user_id,
        status_id: formData.status_id,
        expected_return_date: new Date(formData.expected_return_date),
        actual_return_date: formData.actual_return_date
          ? new Date(formData.actual_return_date)
          : null,
      };

      if (loan) {
        // Aquí puedes agregar update si después lo agregan al backend
        await LoansService.returnLoan(loan.id);
      } else {
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
        {loadingOptions ? (
          <div style={{ textAlign: "center", padding: 40 }}>
            <CircularProgress />
          </div>
        ) : (
          <form id="loan-form" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Select Material */}
            <Controller
              name="material_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField select label="Material" fullWidth required {...field} sx={{ mt: 2 }}>
                  {materials.map((m) => (
                    <MenuItem key={m.id} value={m.id}>
                      {m.name || `Material ${m.id}`}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Select Usuario */}
            <Controller
              name="user_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField select label="Usuario" fullWidth required {...field} sx={{ mt: 2 }}>
                  {users.map((u) => (
                    <MenuItem key={u.id} value={u.id}>
                      {u.name} ({u.email})
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {/* Fecha esperada */}
            <Controller
              name="expected_return_date"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Fecha esperada devolución"
                  type="date"
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  {...field}
                  sx={{ mt: 2 }}
                />
              )}
            />

            {/* Fecha real */}
            <Controller
              name="actual_return_date"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Fecha real devolución"
                  type="date"
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  {...field}
                  sx={{ mt: 2 }}
                />
              )}
            />

            {/* Select Estado */}
            <Controller
              name="status_id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField select label="Estado del préstamo" fullWidth required {...field} sx={{ mt: 2 }}>
                  {statuses.map((s) => (
                    <MenuItem key={s.id} value={s.id}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            {error && (
              <div style={{ color: "#d32f2f", fontSize: 14, marginTop: 8 }}>{error}</div>
            )}
          </form>
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={() => (loading ? undefined : onClose())} disabled={loading}>
          Cancelar
        </Button>
        <Button type="submit" form="loan-form" variant="contained" disabled={loading || loadingOptions}>
          {loading ? <CircularProgress size={20} color="inherit" /> : loan ? "Guardar" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoanModal;

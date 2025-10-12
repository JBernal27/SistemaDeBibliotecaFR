import { Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div>
      <Typography variant="h1">404 PAGINA NO ENCONTRADA</Typography>
        <Button variant="contained" color='primary' onClick={() => navigate("/")}>Ir a la página principal</Button>
    </div>
  )
}

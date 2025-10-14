import { Container, Typography, Box,  Grid } from '@mui/material';
import MaterialCard from './components/book-card.component';
import { Material } from '../../../common/interfaces/material.interface';

const materials: Material[] = [
  {
    title: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    type: "Libro",
    image: "https://m.media-amazon.com/images/I/61jGeNH9exL._UF1000,1000_QL80_.jpg",
  },
  {
    title: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    type: "Libro",
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
  },
  {
    title: "National Geographic - Edición Especial Océanos",
    autor: "Varios autores",
    type: "Revista",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    title: "El Espectador - Domingo Cultural",
    autor: "Redacción El Espectador",
    type: "Periódico",
    image: "https://images.unsplash.com/photo-15244924492112-6e27bf19b6b7",
  },
  {
    title: "Cromos - Especial Moda 2025",
    autor: "Revista Cromos",
    type: "Revista",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e",
  },
  {
    title: "La Odisea",
    autor: "Homero",
    type: "Libro",
    image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4",
  },
  {
    title: "El Tiempo - Economía Hoy",
    autor: "Redacción El Tiempo",
    type: "Periódico",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2",
  },
  {
    title: "Muy Interesante - Ciencia y Tecnología",
    autor: "Equipo Editorial Muy Interesante",
    type: "Revista",
    image: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d",
  },
  {
    title: "Rayuela",
    autor: "Julio Cortázar",
    type: "Libro",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d",
  },
  {
    title: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    type: "Libro",
  },
];

const HomePage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: '100vh',
          py: 2,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="header"
          sx={{
            textAlign: 'center',
            py: 8
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: 'primary.main',
              fontWeight: 'bold'
            }}
          >
            Bienvenido al Sistema de Biblioteca
          </Typography>
          <Typography
            variant="subtitle2"
            color="text.secondary"
          >
            Aqui podras ver los libros existentes en nuestra biblioteca libros, revistas y periódicos.
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            mt={3}
          >
            Acercate a nuestras instalaciones para realizar el préstamo de los materiales que desees.
          </Typography>
        </Box>

        <Grid container rowSpacing={6} columnSpacing={4} component="section">
          {materials.map((material, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <MaterialCard material={material} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
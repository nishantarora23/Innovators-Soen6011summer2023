import { Grid } from '@mui/material';
import './App.scss';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AppRoutes from './views/AppRoutes';

function App() {
  return (
    <Grid container direction="column">
      <Header></Header>
      <AppRoutes></AppRoutes>
      <Footer></Footer>
    </Grid>
  );
}

export default App;

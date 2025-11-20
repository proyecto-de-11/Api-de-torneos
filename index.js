import express from 'express'
import deporteRoutes from './src/routes/tipoDeporteRoute.js'; 
import torneoRoutes from './src/routes/torneoRoute.js'; 
import equiposTorRoutes from './src/routes/equiposTorneoRoute.js'; 
import partidoRoutes from './src/routes/partidoRoute.js'; 
import invitacionPartidoRoutes from './src/routes/invitacionPartidoRoutes.js'; 
import invitacionesTorRoutes from './src/routes/invitacionesTorneoRoute.js'; 
import calificacionesRoutes from './src/routes/calificacionesRoutes.js'; 
import patrocinadoresRoutes from './src/routes/patrocinadoresRoutes.js'; 

const app = express();

app.use(express.json());
app.use('/api', deporteRoutes);
app.use('/api', torneoRoutes);
app.use('/api', equiposTorRoutes);
app.use('/api', partidoRoutes);
app.use('/api', invitacionPartidoRoutes);
app.use('/api', invitacionesTorRoutes);
app.use('/api', calificacionesRoutes);
app.use('/api', patrocinadoresRoutes);

app.get('/', (req, res) => {
  const name = 'bro';
  res.send(`Hello ${name}!`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
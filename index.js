import express from 'express'
import deporteRoutes from './src/routes/tipoDeporteRoute.js'; 
import torneoRoutes from './src/routes/torneoRooute.js'; 

const app = express();

app.use(express.json());
app.use('/api', deporteRoutes);
app.use('/api', torneoRoutes);

app.get('/', (req, res) => {
  const name = 'bro';
  res.send(`Hello ${name}!`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
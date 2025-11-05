import express from 'express';
const app = express();

app.get('/', (req, res) => {
  const name =  'bro';
  res.send(`Hello ${name}!`);
});

const port =  3000;
app.listen(port, () => {
  console.log(`Servidor escuchando en: http://localhost:${port}`);
});
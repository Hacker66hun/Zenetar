import express from 'express';
import eloadoRoutes from './routes/eloadok.js';
import albumokRoutes from './routes/albumok.js';
import orszagokRoutes from './routes/orszagok.js';
import mufajokRoutes from './routes/mufajok.js';
import statisztikaRoutes from './routes/statisztika.js';
const app = express();
const port = 3000;


app.get("/",(req, res) =>{
    res.send("mükszik");
});

app.use("/eloadok", eloadoRoutes);
app.use("/albumok", albumokRoutes);
app.use("/orszagok", orszagokRoutes);
app.use("/mufajok", mufajokRoutes);
app.use("/statisztika",statisztikaRoutes);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
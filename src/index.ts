import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dnaRoutes from "./routes/dnaRoutes";

const app = express();
app.use(bodyParser.json());
dotenv.config();

const port = process.env.PORT || 3000;
const uridb = process.env.MONGODB_URI || "mongodb://localhost:27017/dna_anomalies";
// Configuración de conexión a la base de datos
mongoose.connect(`${uridb}`, { useNewUrlParser: true, useUnifiedTopology: true } as any);

app.get("/", (req, res) => {
    res.send("<h1>Bienvenido a la API de detección de anomalías en el ADN</h1><br> Las rutas disponibles son:<br>POST /api/validate-anomaly<br>GET /api/stats");
});
app.use("/api", dnaRoutes);

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

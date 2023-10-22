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
app.use("/api", dnaRoutes);

app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});

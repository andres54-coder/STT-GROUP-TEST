import { Request, Response } from "express";
import DNAValidation from "../models/dnaValidation";

export const validateAnomaly = async (req: Request, res: Response) => {
  const { dna } = req.body;

  // Lógica para validar la anomalía en la matriz
  function hasAnomaly(dna: string[][]): boolean {
    const rows = dna.length;
    const cols = dna[0].length;
    const targetConsecutive = 3; // Secuencia de al menos tres letras iguales
  
    function checkConsecutive(row: number, col: number, rowStep: number, colStep: number): boolean {
      const letter = dna[row][col];
      let consecutiveCount = 1;
  
      for (let i = 1; i < targetConsecutive; i++) {
        const newRow = row + i * rowStep;
        const newCol = col + i * colStep;
  
        if (
          newRow >= 0 &&
          newRow < rows &&
          newCol >= 0 &&
          newCol < cols &&
          dna[newRow][newCol] === letter
        ) {
          consecutiveCount++;
        } else {
          break;
        }
      }
  
      return consecutiveCount >= targetConsecutive;
    }
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (
          checkConsecutive(row, col, 1, 0) || // Horizontal
          checkConsecutive(row, col, 0, 1) || // Vertical
          checkConsecutive(row, col, 1, 1) || // Diagonal hacia abajo-derecha
          checkConsecutive(row, col, 1, -1) // Diagonal hacia abajo-izquierda
        ) {
          return true; // Se encontró una anomalía
        }
      }
    }
  
    return false; // No se encontraron anomalías
  }
  
  const isAnomaly = hasAnomaly(dna);

  const dnaValidation = new DNAValidation({
    dna,
    result: isAnomaly,
  });

  try {
    const savedValidation = await dnaValidation.save();
    if (isAnomaly) {
      res.status(200).json({ message: "Anomalía detectada", validation: savedValidation });
    } else {
      res.status(403).json({ message: "No se detectó anomalía", validation: savedValidation });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al guardar la validación en la base de datos", error: error });
  }
};

export const getStats = async (req: Request, res: Response) => {
  try {
    const countAnomalies = await DNAValidation.countDocuments({ result: true });
    const countNoAnomalies = await DNAValidation.countDocuments({ result: false });
    const totalRequests = countAnomalies + countNoAnomalies;
    const ratio = (countAnomalies / totalRequests) * 100;

    res.status(200).json({
      count_anomalies: countAnomalies,
      count_no_anomalies: countNoAnomalies,
      ratio: ratio,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las estadísticas", error: error });
  }
};
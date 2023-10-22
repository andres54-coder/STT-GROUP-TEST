import mongoose, { Schema, Document } from "mongoose";

export interface IDNAValidation extends Document {
  dna: string[][];
  result: boolean;
}

const DNAValidationSchema: Schema = new Schema({
  dna: [[String]],
  result: Boolean,
});

export default mongoose.model<IDNAValidation>("DNAValidation", DNAValidationSchema);

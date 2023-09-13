import { Document, model, Schema, Model } from "mongoose";

export interface IssueInterface extends Document {
  repo: string;
  title: string;
  difficulty: "easy" | "medium" | "hard" | "expert";
}

const issueSchema = new Schema<IssueInterface>(
  {
    repo: String,
    title: String,
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard", "expert"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Issue: Model<IssueInterface> = model<IssueInterface>("Issue", issueSchema);

export default Issue;
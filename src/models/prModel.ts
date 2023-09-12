import { Document, model, Schema, Model } from "mongoose";
import  {UserInterface}  from "./userModel"; 
import  {IssueInterface}  from "./issueModel"; 

export interface PRInterface extends Document {
  user: UserInterface["_id"];
  issue: IssueInterface["_id"];
}

const PRSchema = new Schema<PRInterface>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    issue: {
      type: Schema.Types.ObjectId,
      ref: "Issue",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);


const PR: Model<PRInterface> = model<PRInterface>("PR", PRSchema);

export default PR;

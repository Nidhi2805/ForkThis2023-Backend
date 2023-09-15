import { Document, model, Schema, Model } from "mongoose";
import {PRInterface} from "./prModel"; 
import IIssue from "./issueModel"; 

export interface UserInterface extends Document {
  githubUsername: string;
  name: string;
  score: number;
  noOfIssuesSolved: number;
  PRs: Array<PRInterface["_id"]>;
  id: string;
  email: string;
}

const userSchema = new Schema<UserInterface>(
  {
    githubUsername: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: false,
      unique: false,
    },
    name : {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
    id:{
      type: String,
      required: true,
      unique: true,
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.index({ score: -1 });

userSchema.virtual("PRs", {
  ref: "PR",
  foreignField: "user",
  localField: "_id",
});


userSchema.virtual("noOfIssuesSolved", {
  get: function (this: UserInterface) {
    return this.PRs.filter((pr) => pr.issue).length;  
  },
});

const User: Model<UserInterface> = model<UserInterface>("User", userSchema);

export default User;
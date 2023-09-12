import { Document, model, Schema, Model } from "mongoose";
import {PRInterface} from "./prModel"; 
import IIssue from "./issueModel"; 

export interface UserInterface extends Document {
  email: string;
  githubUsername: string;
  score: number;
  isGithubUsername: boolean;
  noOfIssuesSolved: number;
  PRs: Array<PRInterface["_id"]>;
}

const userSchema = new Schema<UserInterface>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    githubUsername: {
      type: String,
      required: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 0,
    },
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
    return this.PRs.filter((pr) => pr.isMerged).length;
  },
});

const User: Model<UserInterface> = model<UserInterface>("User", userSchema);

export default User;
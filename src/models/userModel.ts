import { Document, model, Schema, Model } from "mongoose";
// import {PRInterface} from "./prModel"; 
import IIssue, { IssueInterface } from "./issueModel"; 

export interface UserInterface extends Document {
  githubUsername: string;
  name: string;
  score: number;
  noOfIssuesSolved: number;
  Issues: Array<IssueInterface["_id"]>;
  id: string;
  // email: string;
}

const userSchema = new Schema<UserInterface>(
  {
    githubUsername: {
      type: String,
      required: true,
      unique: true,
    },
    // email: {
    //   type: String,
    //   required: false,
    //   unique: false,
    // },
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

userSchema.virtual("Issues", {
  ref: "Issue",
  foreignField: "user",
  localField: "_id",
});


userSchema.virtual("noOfIssuesSolved", {
  get: function (this: UserInterface) {
    console.log('hi')
    return this.Issues.filter((issue) => issue.issue).length;  
  },
});

const User: Model<UserInterface> = model<UserInterface>("User", userSchema);

export default User;
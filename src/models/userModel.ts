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
  email: string;
  // rank:number;
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
    },
    Issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      }
    ],
    email: {
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

// userSchema.virtual("rank", {
//   get: async function (this: UserInterface) {
//     const users = await this.$model("User").find({}, { score: 1 }).sort({ score: -1 });
//     const rank = users.findIndex(user => user._id.toString() === this._id.toString()) + 1;
//     return rank;
//   },
// });

// userSchema.virtual("rank").get(async function (this: UserInterface) {
//   const user = await UserModel.findById(this._id, { score: 1 });
//   const rank = await UserModel.countDocuments({ score: { $gt: user.score } }) + 1;
//   return rank;
// });


userSchema.virtual("noOfIssuesSolved").get( function(this:UserInterface) {
    return this.Issues.length;  
  })

const User: Model<UserInterface> = model<UserInterface>("User", userSchema);

export default User;
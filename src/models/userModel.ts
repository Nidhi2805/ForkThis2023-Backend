import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Added from the first schema
  name: { type: String, required: true }, // Added from the first schema
  githubId: { type: String, unique: true },
  githubUsername: { type: String },
  avatar_url: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;

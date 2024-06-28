import mongoose from "mongoose";

const viewerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 60,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 65,
    unique: true,
    lowercase: true,
  },
  adminId: {
    type: mongoose.ObjectId,
    required: true,
    ref: "users",
  },
});

// create table
const Viewer = mongoose.model("Viewer", viewerSchema);

export default Viewer;

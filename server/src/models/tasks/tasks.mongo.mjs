import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    isDone: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Task", tasksSchema);

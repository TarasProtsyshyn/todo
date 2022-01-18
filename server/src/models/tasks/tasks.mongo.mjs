import mongoose from "mongoose";

const tasksSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

export default mongoose.model("Task", tasksSchema);

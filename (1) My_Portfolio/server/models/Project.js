import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    desc: { type: String, required: true },
    tech: [{ type: String }],
    github: { type: String, default: "#" },
    live: { type: String, default: "#" },
    stars: { type: Number, default: 0 },
    badge: { type: String, default: "" },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);
export default Project;

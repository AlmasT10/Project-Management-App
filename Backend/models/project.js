const mongoose = require("mongoose");
const router = require("../routes/projects");

const projectSchema = mongoose.Schema({
  name: String,
  type: String,
  createdBy: String,
  starDate: String,
  endDate: String,
  members: [{ memberName: String, memberEmail: String }],
  status: {
    type: Boolean,
    default: false,
  },
});

projectSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

projectSchema.set("toJSON", {
  virtuals: true,
});

exports.Project = mongoose.model("Project", projectSchema);
exports.projectSchema = projectSchema;

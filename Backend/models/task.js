const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  name: String,
  description: String,
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  member: { memberName: String, memberEmail: String },
  startDate: {
    type: String,
  },
  endDate: String,
  hoursWorked: Number,
  status: {
    type: Boolean,
    default: true,
  },
});

taskSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

taskSchema.set("toJSON", {
  virtuals: true,
});

exports.Task = mongoose.model("Task", taskSchema);
exports.taskSchema = taskSchema;

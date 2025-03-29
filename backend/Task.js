const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["En attente", "En cours", "Terminé"], default: "En attente" },
  deadline: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);

const Notes = require('../models/noteModel');

const noteControl = {
  getNotes: async (req, res) => {
    try {
      const notes = await Notes.find({ user_id: req.user.id });
      res.json(notes);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  createNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      const newNote = new Notes({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name,
      });
      await newNote.save();
      res.json({ message: 'New Note Created' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  deleteNotes: async (req, res) => {
    try {
      await Notes.findByIdAndDelete(req.params.id);
      res.json({ message: 'Note Deleted' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  updateNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body;
      await Notes.findOneAndUpdate(
        { _id: req.params.id },
        { title, content, date }
      );
      res.json({ message: 'Note Updated' });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },

  getNote: async (req, res) => {
    try {
      const note = await Notes.findById(req.params.id);
      res.json(note);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  },
};

module.exports = noteControl;

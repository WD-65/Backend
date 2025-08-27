import { Note } from "../models/index.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.findAll({ include: "User" });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { content, userId } = req.body;

    if (!content || !userId) {
      return res.status(400).json({ error: "content and userId are required" });
    }

    const note = await Note.create({ content, userId });
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id, { include: "User" });
    if (!note) return res.status(404).json({ error: "Note not found" });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const {
      body: { content },
      params: { id },
    } = req;

    if (!content) return res.status(400).json({ error: "content is required" });

    const note = await Note.findByPk(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    await note.update({ content });
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await Note.findByPk(id);

    if (!note) return res.status(404).json({ error: "note not found" });

    await note.destroy();

    res.json({ message: "note deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

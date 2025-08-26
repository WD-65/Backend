import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    console.log(firstName, lastName, email);

    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });

    const user = await User.create({ firstName, lastName, email });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const {
      body: { firstName, lastName, email },
      params: { id },
    } = req;

    if (!firstName || !lastName || !email)
      return res
        .status(400)
        .json({ error: "firstName, lastName, and email are required" });

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ error: "User not found" });

    await user.update({ firstName, lastName, email });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ error: "user not found" });

    await user.destroy();

    res.json({ message: "user deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

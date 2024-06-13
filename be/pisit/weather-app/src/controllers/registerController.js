import usersDB from "../database/users-db.js";
import fsPromises from "fs/promises";
import bcrypt from "bcrypt";
import path from "path";

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const duplicate = usersDB.users.find((person) => person.username === user);
  if (duplicate) return res.status(409).json({ message: "conflict"});

  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const newUser = { username: user, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(import.meta.dirname, "..", "database", "users.json"),
      JSON.stringify(usersDB.users)
    );
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handleNewUser;

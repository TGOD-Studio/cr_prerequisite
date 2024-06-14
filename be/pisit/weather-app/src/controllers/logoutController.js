import usersDB from "../database/users-db.js";
import fsPromises from "fs/promises";
import path from "path";

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;

  const foundUser = usersDB.users.find(
    (person) => person.refreshToken === refreshToken
  );
  if (foundUser) {
    const otherUsers = usersDB.users.filter(
      (person) => person.refreshToken !== foundUser.refreshToken
    );
    const currentUser = { ...foundUser, refreshToken: "" };
    usersDB.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
      path.join(import.meta.dirname, "..", "database", "users.json"),
      JSON.stringify(usersDB.users)
    );
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.sendStatus(204);
};

export default handleLogout;

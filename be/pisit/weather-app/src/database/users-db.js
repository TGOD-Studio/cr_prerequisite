import { error } from "console";
import fs from "fs";
import path from "path";

let usersDB;

try {
  usersDB = {
    users: JSON.parse(fs.readFileSync(
      path.join(import.meta.dirname, "..", "database", "users.json"),
      "utf8",
      (err, data) => {
        if (err) throw new error("can't read file");
        return data;
      }
    )),
    setUsers: function (data) {
      this.users = data;
    },
  };
} catch (error) {
  if (error == "can't read file") {
    console.error("can't read file");
  } else {
    console.error("can't access database");
  }
}

export default usersDB;
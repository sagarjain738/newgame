import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const jsonDirectory = path.join(process.cwd(), "src/Game");
    const jsonData = await fs.readFile(jsonDirectory + "/users.json", "utf8");

    if (!jsonData) {
      const updatedData = JSON.stringify({
        users: [req.body.username],
      });
      await fs.writeFile(jsonDirectory + "/users.json", updatedData);
      res.status(200).send("Submitted");
    }
    const objectData = JSON.parse(jsonData);
    const result = objectData.users.includes(req.body.username);

    if (!result) {
      objectData.users.push(req.body.username);
      const updatedData = JSON.stringify(objectData);
      await fs.writeFile(jsonDirectory + "/users.json", updatedData);
      res.status(200).send("Submitted");
    } else if (result) {
      res.status(500).send("User Already exists");
    }
  }
}

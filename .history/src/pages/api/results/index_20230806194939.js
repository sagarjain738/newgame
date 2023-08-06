import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  // console.log(req.query?.name);
  //Find the absolute path of the json directory
  // console.log(req.query);
  const jsonDirectory = path.join(process.cwd(), "src/Game");
  //Read the json data file data.json
  const fileContents = await fs.readFile(
    jsonDirectory + "/result.json",
    "utf8"
  );
  const data = JSON.parse(fileContents);
  // console.log(data[req.query?.name]);
  //Return the content of the data file in json format

  // if (req.query?.name) {
  //   res.status(200).send(data[req.query?.name]);
  // } else {
  res.status(200).send(data);
  // }
}

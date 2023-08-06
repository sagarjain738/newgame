import path from "path";
import { promises as fs } from "fs";

export default async function handler(req, res) {
  if (req.method === "GET") {
    //Find the absolute path of the json directory
    const questionNumber = req?.query?.question;
    // console.log(req.query);
    const jsonDirectory = path.join(process.cwd(), "src/Game");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      jsonDirectory + "/questions.json",
      "utf8"
    );
    const data = JSON.parse(fileContents);
    const result = data.filter((item) => item.id === questionNumber);
    //Return the content of the data file in json format
    res.status(200).send(result);
  } else if (req.method === "POST") {
    const jsonDirectory = path.join(process.cwd(), "src/Game");
    const jsonData = await fs.readFile(jsonDirectory + "/result.json", "utf8");

    // console.log(aa);
    if (!jsonData[req.body?.name]) {
      // const updatedData = JSON.stringify({
      //   [req.body?.name]: [req.body],
      // });
      if (jsonData) {
        const aa = JSON.stringify({
          ...JSON.parse(jsonData),
          [req.body?.name]: [req.body],
        });
        await fs.writeFile(jsonDirectory + "/result.json", aa);
      } else {
        const aa = JSON.stringify({
          [req.body?.name]: [req.body],
        });
        await fs.writeFile(jsonDirectory + "/result.json", aa);
      }
      // await fs.writeFile(jsonDirectory + "/result.json", updatedData);
      res.status(200).send("Submitted");
    }
    const objectData = JSON.parse(jsonData || {});
    objectData[req.body?.name].push(req.body);
    const updatedData = JSON.stringify(objectData);
    await fs.writeFile(jsonDirectory + "/result.json", updatedData);
    res.status(200).send("Submitted");
  }
}

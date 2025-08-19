import http from "http";
import { createFileWithMessage, deleteFileByName } from "./utils.js";

const requestHandler = async (req, res) => {
  const regex = /^\/files\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+.txt$/;
  const { method, url } = req;
  if (url === "/files") {
    if (method === "POST") {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", async () => {
        await createFileWithMessage(JSON.parse(body).message);
        res.statusCode = 201;
        return res.end("File created");
      });
    }
    res.statusCode = 405;
    return res.end("Invalid Method");
  }
  if (regex.test(url)) {
    if (method === "DELETE") {
      const fileName = url.slice(7);
      await deleteFileByName(fileName);
      res.statusCode = 200;
      return res.end(`File Deleted`);
    }
    res.statusCode = 405;
    return res.end("Invalid Method");
  }

  res.statusCode = 404;
  return res.end("Not Found");
};

const server = http.createServer(requestHandler);

const port = 3000;
server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

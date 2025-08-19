import http from "http";

const users = [
  { id: crypto.randomUUID(), name: "John Doe" },
  { id: crypto.randomUUID(), name: "Jane Doe" },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);

  
  if (req.url === "/users") {
    if (req.method === "POST") {
      res.statusCode = 201;
      const newUser = { id: crypto.randomUUID(), name: "Mark Smith" };
      users.push(newUser);
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(newUser));
    } else if (req.method === "GET") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(users));
    } else {
      res.statusCode = 405;
      res.end("Method Not Allowed");
    }
  } else {
    res.statusCode = 200;
    res.end(`Hello World`);
  }
});

const port = 3000;

server.listen(port, () =>
  console.log(`Server running at http://localhost:${port}/`)
);

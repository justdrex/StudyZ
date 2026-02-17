const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  const url = req.url;

  // ROUTES
  if (url === "/" || url === "/home") {
    serveHTML("index.html", res);
  } else if (url === "/games") {
    serveHTML("games.html", res);
  } else if (url === "/account") {
    serveHTML("account.html", res);
  }
  // STATIC FILES
  else if (url.startsWith("/assets/") || url === "/script.js" || url === "/styles.css") {
    serveStatic(url, res);
  } 
  // 404
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 – Nenalezeno</h1>");
  }
});

function serveHTML(file, res) {
  fs.readFile(path.join(__dirname, file), (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Server error");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
}

function serveStatic(url, res) {
  const filePath = path.join(__dirname, url);
  const ext = path.extname(filePath);

  const mimeTypes = {
    ".js": "application/javascript",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".css": "text/css"
  };

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end();
      return;
    }
    res.writeHead(200, {
      "Content-Type": mimeTypes[ext] || "application/octet-stream"
    });
    res.end(data);
  });
}

server.listen(3000, () => {
  console.log("Server běží na http://localhost:3000");
});
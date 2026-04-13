const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Demo credentials for basic auth.
const USERNAME = process.env.BASIC_AUTH_USER || "admin";
const PASSWORD = process.env.BASIC_AUTH_PASS || "password123";

function basicAuthMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Basic ")) {
    res.set("WWW-Authenticate", 'Basic realm="Protected"');
    return res.status(401).json({ message: "Authentication required." });
  }

  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username, password] = decodedCredentials.split(":");

  if (username !== USERNAME || password !== PASSWORD) {
    res.set("WWW-Authenticate", 'Basic realm="Protected"');
    return res.status(401).json({ message: "Invalid credentials." });
  }

  return next();
}

app.get("/", (req, res) => {
  res.json({ message: "Basic Authentication API is running." });
});

app.get("/public", (req, res) => {
  res.json({ message: "This is a public endpoint." });
});

app.get("/private", basicAuthMiddleware, (req, res) => {
  res.json({ message: "You are authenticated and can access this private endpoint." });
});

app.get("/auth-check", basicAuthMiddleware, (req, res) => {
  const authHeader = req.headers.authorization;
  const base64Credentials = authHeader.split(" ")[1];
  const decodedCredentials = Buffer.from(base64Credentials, "base64").toString("utf-8");
  const [username] = decodedCredentials.split(":");

  res.json({ authenticated: true, user: username });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

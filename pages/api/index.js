const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/api/users/:id", (req, res) => {
  res.send("Hello from the root application URL");
});

app.post("/api/users/:id/update", (req, res) => {
  setTimeout(() => {
    res.send(req.body);
  }, [2000]);
});

app.listen(8800, () => {
  console.log("Backend server is running!");
});

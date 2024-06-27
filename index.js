const express = require("express");
const app = express();
const axios = require("axios");
app.use(express.json());
const client = require("./client");

app.get("/", async (req, res) => {
  const cachedValue = await client.get("todos");
  if (cachedValue) {
    const obj = JSON.parse(cachedValue);
    return res.json({
      message: "success chached value",
      data: obj,
    });
  }

  const { data } = await axios.get(
    "https://jsonplaceholder.typicode.com/todos"
  );

  await client.set("todos", JSON.stringify(data));
  await client.expire("todos", 25);
  return res.json({
    message: "success",
    data: data,
  });
});
app.listen(5000);

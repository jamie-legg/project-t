import express from "express";
import cors from "cors";
import sequelize from "../db/db";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: ["http://localhost:3000"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  // show all sqlize models
  res.json(Object.keys(sequelize.models));
});

// tabs come in as a POST request to /tab
app.post("/tab", async (req, res) => {
  const { id, text } = req.body;
  const tab = await sequelize.models.Tab.findByPk(id);
  if (tab) {
    await tab.update({ content: text });
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.listen(3300, () => {
  console.log("Server is running on http://localhost:3300");
});

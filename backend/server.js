import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API working");
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
       model: "google/gemma-3-4b-it:free",
        messages: [{ role: "user", content: prompt }]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const aiText = response.data.choices[0].message.content;

    res.json({ result: aiText });

  } catch (error) {
  console.log("FULL ERROR:", error.response?.data || error.message);
  res.status(500).json({ error: error.response?.data || "Error" });
}
});

const schema = new mongoose.Schema({
  prompt: String,
  response: String
});

const Data = mongoose.model("Data", schema);

app.post("/api/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const newData = new Data({ prompt, response });
    await newData.save();

    res.json({ message: "Saved successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
import express from "express";
import cors from "cors";
import pool from "./db.js";
import multer from "multer";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import axios from "axios";
import { ocrSpace } from "ocr-space-api-wrapper";
import { fileURLToPath } from "url";
import { dirname } from "path";
import OpenAI from "openai";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const UploadMiddleware = multer({ dest: "uploads/" });
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();

const app = express();

// Replace with your actual API key (get one from Google AI Studio)
const API_KEY = process.env.GEMINI;

// Specify the model name (e.g., "gemini-pro")
const MODEL_NAME = "gemini-pro";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());
app.get("/", async (req, res) => {
  try {
    const booksInfo = await pool.query("SELECT * FROM books WHERE id=$1", [1]);
    res.status(200).json({ data: booksInfo });
  } catch (error) {
    console.error(error.message);
  }
});

app.post("/upload", UploadMiddleware.single("pdfFile"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (req.file === undefined)
    res.status(200).json({ data: "No Data Found For Updation..." });
  else {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      const newPath = path + "." + extension;
      fs.renameSync(path, newPath);

      const imgPath = newPath;
      console.log("Hello", imgPath);

      try {
        const res2 = await ocrSpace(imgPath, {
          apiKey: process.env.OCR,
        });

        let Strings;

        res2.ParsedResults.map((t) => {
          Strings += t.ParsedText;
        });

        console.log(Strings);

        const prompt = `${JSON.stringify(
          Strings.substring(0, 1800)
        )} Convert OCR API text to JSON with questions and options, excluding the code Give in Array Of Objects .`;

        const generationConfig = {
          temperature: 0.9, // Controls randomness (higher = more creative, but less coherent)
          topK: 1, // Select top K most likely words at each step
          topP: 1, // Filter out low probability continuations
          maxOutputTokens: 2048, // Maximum number of tokens to generate
        };

        const genAI = new GoogleGenerativeAI(API_KEY);
        const model = genAI.getGenerativeModel({
          model: MODEL_NAME,
          generationConfig,
        });

        // Optional configuration for generation (adjust as needed)

        try {
          const result = await model.generateContent(prompt);
          const response = await result.response; // Access generated text from the response (structure might differ)
          console.log(response);
          console.log("Generated text:", response.text());
          res.status(200).json({
            data: response.text(),
            dataDup: Strings,
          }); // Try different properties based on documentation
        } catch (error) {
          console.error("Error:", error);
          res.status(400).json({ data: error });
        }
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      res.status(400).json({ data: error });
    }
  }
});

app.post("/upload1", UploadMiddleware.single("pdfFile1"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);
  if (req.file === undefined)
    res.status(200).json({ data: "No Data Found For Updation..." });
  else {
    try {
      const { originalname, path } = req.file;
      const parts = originalname.split(".");
      const extension = parts[parts.length - 1];
      const newPath = path + "." + extension;
      fs.renameSync(path, newPath);
      res.status(200).json({ data: newPath });
    } catch (error) {
      res.status(403).json({ data: error });
    }
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port 3000");
});

const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const keywordRoutes = require("./routes/keywordRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const businessRoutes = require("./routes/businessRoutes");

const app = express();

connectDB();

app.use(express.json());

// =========================
// ROUTES
// =========================

app.use("/api/keywords", keywordRoutes);
app.use("/webhook", webhookRoutes);
app.use("/api/businesses", businessRoutes);

// =========================
// ASOSIY SAHIFA
// =========================

app.get("/", (req, res) => {
  res.send("Instagram Chatbot API ishlayapti 🚀");
});

// =========================
// PRIVACY POLICY
// =========================

app.get("/privacy", (req, res) => {
  res.send(`
    <h1>Privacy Policy</h1>

    <p>
      MyAi uses Instagram data to provide Instagram automation features.
    </p>

    <p>
      We may process Instagram account information, messages and comments
      when required to provide the service.
    </p>

    <p>
      We do not sell users' personal information.
    </p>

    <p>
      Contact: eabdurashid72@gmail.com
    </p>
  `);
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishlayapti`);
});
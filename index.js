import "dotenv/config";
import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/auth.routes.js";
import propertyRoutes from "./src/routes/property.routes.js";
import adminRoutes from "./src/routes/admin.routes.js";
import applicationRoutes from "./src/routes/application.routes.js";
import roommateOpeningRoutes from "./src/routes/roommate_vacancies.routes.js";
import path from "path";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploads folder as static
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/", (req, res) => {
  res.send("NevaasHub API is working");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/roommate-openings", roommateOpeningRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`NevaasHub listening on port ${PORT}!`);
});
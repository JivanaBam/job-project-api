import express from "express";
import connectDB from "./connect.db.js";
import userRoutes from "./src/user/user.route.js";
import viewerRoutes from "./src/viewer/viewer.route.js";
import cors from "cors";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// connect database
connectDB();

// register routes
app.use(userRoutes);
app.use(viewerRoutes);

// network port and server

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

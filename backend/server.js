import path from "path"; // Corrected import statement
import express from "express"; // Corrected import statement
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
// import productRoutes from "./routes/productRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

const port = 5000;

connectDB(); // connect to mongoDB

const app = express(); // Corrected variable name

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookie parser middleware
app.use(cookieParser());

// app.get("/", async (req, res) => {
//   res.send("api is running...");
// });

app.use("/api/products", productRoutes); // Corrected route
app.use("/api/users", userRoutes); // Corrected route
app.use("/api/orders", orderRoutes); // Corrected route
app.use("/api/upload", uploadRoutes); // Corrected route
app.get("/api/config/paypal", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve(); // Corrected variable name
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api is running...");
  });
}

app.listen(port, () => console.log(`Server running on port ${port}`));

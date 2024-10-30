import express from "express";
import morgan from "morgan";

import ticketRoutes from "./routes/ticket.routes";

const app=express();

// Settings
app.set("port", 4000);

// Middleware
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/tickets", ticketRoutes);

export default app;
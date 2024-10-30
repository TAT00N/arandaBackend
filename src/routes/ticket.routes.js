import { Router } from "express";
import { methods as ticketController } from "./../controllers/ticket.controller";

const router = Router();

// Ruta para obtener todos los tickets
router.get("/", ticketController.getTickets);

// Ruta para crear un nuevo ticket
router.post("/", ticketController.createTicket);

// Otras rutas 
router.get("/:id", ticketController.getTicketById);
router.put("/:id", ticketController.updateTicket);
router.delete("/:id", ticketController.deleteTicket);

export default router;

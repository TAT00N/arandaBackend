import { getConnection } from "./../database/database";

const getTickets = async (req, res) => {
    try {
        const [result] = await getConnection().then(conn => conn.query("SELECT * FROM tickets"));
        res.json(result);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getTicketById = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getConnection().then(conn => conn.query("SELECT * FROM tickets WHERE id = ?", [id]));
        if (result.length === 0) {
            return res.status(404).json({ message: "Ticket no encontrado" });
        }
        res.json(result[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createTicket = async (req, res) => {
    try {
        const { subject, description, status, specialist_id, category_id, sla_id, project_id, urgency_id, user_id } = req.body;

        if (!subject || !description || !status) {
            return res.status(400).json({ message: "Bad Request. Por favor llene todos los campos." });
        }

        const ticket = { subject, description, status, specialist_id, category_id, sla_id, project_id, urgency_id, user_id, created_at: new Date(), updated_at: new Date() };
        const [result] = await getConnection().then(conn => conn.query("INSERT INTO tickets SET ?", ticket));
        res.json({ message: "Ticket añadido", id: result.insertId });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const { subject, description, status, specialist_id, category_id, sla_id, project_id, urgency_id, user_id } = req.body;

        const ticket = { subject, description, status, specialist_id, category_id, sla_id, project_id, urgency_id, user_id, updated_at: new Date() };
        const [result] = await getConnection().then(conn => conn.query("UPDATE tickets SET ? WHERE id = ?", [ticket, id]));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró este ticket" });
        }
        res.json({ message: "Ticket actualizado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await getConnection().then(conn => conn.query("DELETE FROM tickets WHERE id = ?", [id]));

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "No se encontró este ticket" });
        }
        res.json({ message: "Ticket eliminado" });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

export const methods = {
    getTickets,
    getTicketById,
    createTicket,
    updateTicket,
    deleteTicket
};

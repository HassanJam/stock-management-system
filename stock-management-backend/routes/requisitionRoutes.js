const express = require("express");
const router = express.Router();
const pool = require("../db"); // Import the database connection pool

// Create a new requisition
router.post("/", async (req, res) => {
  console.log("New requisition added", req.body);
  const {
    projectName,
    clientName,
    date,
    projectDescription,
    status = "pending",
  } = req.body;
  console.log("Status", status);
  console.log("Date", date);
  console.log("Description", projectDescription);
  console.log("Client Name", clientName);
  console.log("Project Name", projectName);
  let formattedDate;
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date");
    }
    formattedDate = parsedDate.toISOString().split("T")[0]; // Convert to YYYY-MM-DD format
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Invalid date format. Please provide a valid date." });
  }

  if (!projectName || !clientName || !date || !projectDescription) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const connection = await pool.getConnection();
  try {
    // Insert the requisition form into the database
    const [result] = await connection.query(
      `INSERT INTO requisitionForm (projectName, clientName, date, description, status) 
             VALUES (?, ?, ?, ?, ?)`,
      [projectName, clientName, formattedDate, projectDescription, status]
    );
    if (result.affectedRows === 0) {
      return res
        .status(500)
        .json({ message: "Failed to create requisition form" });
    }
    console.log("Requisition added in backend");

    // Send response
    res.status(201).json({
      id: result.insertId,
      message: "Requisition form created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

// Get all requisitions
router.get("/", async (req, res) => {
  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(`SELECT * FROM requisitionForm`);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

// Get a specific requisition by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();
  try {
    const [rows] = await connection.query(
      `SELECT id, projectName, clientName, DATE_FORMAT(date, '%Y-%m-%d') as date, description, status, createdAt, updatedAt 
     FROM requisitionForm WHERE id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Requisition form not found" });
    }
    console.log("in backend   ", rows);
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

// Update a requisition (including status)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { projectName, clientName, date, description, status } = req.body;

  if (!projectName || !clientName || !date || !description || !status) {
    return res
      .status(400)
      .json({ message: "All fields, including status, are required." });
  }

  const validStatuses = ["pending", "completed", "rejected"];
  if (!validStatuses.includes(status)) {
    return res
      .status(400)
      .json({
        message:
          'Invalid status value. Must be "pending", "completed", or "rejected".',
      });
  }

  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `UPDATE requisitionForm 
             SET projectName = ?, clientName = ?, date = ?, description = ?, status = ? 
             WHERE id = ?`,
      [projectName, clientName, date, description, status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Requisition form not found" });
    }

    res.status(200).json({ message: "Requisition form updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

// Delete a requisition
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();
  try {
    const [result] = await connection.query(
      `DELETE FROM requisitionForm WHERE id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Requisition form not found" });
    }

    res.status(200).json({ message: "Requisition form deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    connection.release();
  }
});

module.exports = router;

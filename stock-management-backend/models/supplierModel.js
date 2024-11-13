const pool = require('../db');

class supplier {
    static async create(name, contact, email) {
        const [result] = await pool.query(
            'INSERT INTO suppliers (name, contact, email) VALUES (?, ?, ?)',
            [name, contact, email]
        );
        return result.insertId;
    }

    static async findById(id) {
        const [rows] = await pool.query('SELECT * FROM suppliers WHERE id = ?', [id]);
        return rows[0];
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM suppliers');
        return rows;
    }
}

module.exports = supplier;

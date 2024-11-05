const pool = require('../db');

class Purchase {
    static async create(itemId, supplierId, quantity) {
        const [result] = await pool.query(
            'INSERT INTO purchases (item_id, supplier_id, quantity) VALUES (?, ?, ?)',
            [itemId, supplierId, quantity]
        );
        return result.insertId;
    }

    static async findByItemId(itemId) {
        const [rows] = await pool.query('SELECT * FROM purchases WHERE item_id = ?', [itemId]);
        return rows;
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM purchases');
        return rows;
    }
}

module.exports = Purchase;

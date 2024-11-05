const pool = require('../db');

class StockTransaction {
    static async create(itemId, transactionType, quantity) {
        const [result] = await pool.query(
            'INSERT INTO stock_transactions (item_id, transaction_type, quantity) VALUES (?, ?, ?)',
            [itemId, transactionType, quantity]
        );
        return result.insertId;
    }

    static async findByItemId(itemId) {
        const [rows] = await pool.query('SELECT * FROM stock_transactions WHERE item_id = ?', [itemId]);
        return rows;
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM stock_transactions');
        return rows;
    }
}

module.exports = StockTransaction;

const pool = require('../db');

class stockTransaction {
    static async create(itemId, transactionType, quantity) {
        const [result] = await pool.query(
            'INSERT INTO stockTransactions (itemId, transactionType, quantity) VALUES (?, ?, ?)',
            [itemId, transactionType, quantity]
        );
        return result.insertId;
    }

    static async findByItemId(itemId) {
        const [rows] = await pool.query('SELECT * FROM stockTransactions WHERE itemId = ?', [itemId]);
        return rows;
    }

    static async getAll() {
        const [rows] = await pool.query('SELECT * FROM stockTransactions');
        return rows;
    }
}

module.exports = stockTransaction;

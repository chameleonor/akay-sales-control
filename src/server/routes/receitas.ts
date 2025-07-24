import { Router } from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db_path = path.join(__dirname, '..', 'akay-sales.db');

const router = Router();
const db = new sqlite3.Database(db_path.toString());

db.run(`
    CREATE TABLE IF NOT EXISTS receitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        itens TEXT,
        data TEXT
    )
`);


// GET /api/receitas - lista todas as receitas
router.get('/receitas', (req, res) => {
    db.all('SELECT * FROM receitas', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// GET /api/receitas/:id - receita por id
router.get('/receitas/:id', (req, res) => {
    db.get('SELECT * FROM receitas WHERE id = ?', [req.params.id], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!row) return res.status(404).json({ error: 'Receita não encontrada' });
        res.json(row);
    });
});

// POST /api/receitas - cria nova receita
router.post('/receitas', (req, res) => {
    const { nome, itens, data } = req.body;
    db.run(
        'INSERT INTO receitas (nome, itens, data) VALUES (?, ?, ?)',
        [nome, JSON.stringify(itens || []), data],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, nome, itens, data });
        }
    );
});

// PUT /api/receitas/:id - atualiza receita
router.put('/receitas/:id', (req, res) => {
    const { nome, itens, data } = req.body;
    db.run(
        'UPDATE receitas SET nome = ?, itens = ?, data = ? WHERE id = ?',
        [nome, JSON.stringify(itens || []), data, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: req.params.id, nome, itens, data });
        }
    );
});

// DELETE /api/receitas/:id - remove receita
router.delete('/receitas/:id', (req, res) => {
    db.run('DELETE FROM receitas WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

export default router;

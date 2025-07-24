import { Router } from 'express';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const db_path = path.join(__dirname, '..', 'akay-sales.db');

console.log("db_path.toString():", db_path.toString());

const router = Router();
const db = new sqlite3.Database(db_path.toString());

db.run(`
  CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY,
    data TEXT,
    receitas TEXT
  )
`);

// Listar todos os pedidos
router.get('/pedidos', (req, res) => {
  db.all('SELECT * FROM pedidos', [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows.map(row => ({
      ...row,
      receitas: JSON.parse(row.receitas)
    })));
  });
});

// Buscar pedido por id
router.get('/pedidos/:id', (req, res) => {
  db.get('SELECT * FROM pedidos WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Pedido não encontrado' });
    res.json({
      ...row,
      receitas: JSON.parse(row.receitas)
    });
  });
});

// Criar novo pedido
router.post('/pedidos', (req, res) => {
  const { id, data, receitas } = req.body;
  db.run(
    'INSERT INTO pedidos (id, data, receitas) VALUES (?, ?, ?)',
    [id, data, JSON.stringify(receitas)],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, data, receitas });
    }
  );
});

// Atualizar pedido
router.put('/pedidos/:id', (req, res) => {
  const { data, receitas } = req.body;
  db.run(
    'UPDATE pedidos SET data = ?, receitas = ? WHERE id = ?',
    [data, JSON.stringify(receitas), req.params.id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: req.params.id, data, receitas });
    }
  );
});

// Deletar pedido
router.delete('/pedidos/:id', (req, res) => {
  db.run('DELETE FROM pedidos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

export default router;

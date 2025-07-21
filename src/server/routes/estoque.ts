import { Router } from 'express';
import sqlite3 from 'sqlite3';

const router = Router();
const db = new sqlite3.Database('akay-sales.db');

// Cria a tabela de estoque se não existir
// Estrutura baseada em ProdutoPrimario
// id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem

db.run(`
  CREATE TABLE IF NOT EXISTS estoque (
    id TEXT PRIMARY KEY,
    produto TEXT,
    peso REAL,
    medida TEXT,
    preco REAL,
    quantidade INTEGER,
    quantidadeAtual INTEGER,
    periodo TEXT,
    vencimento TEXT,
    imagem TEXT,
    tipo TEXT CHECK(tipo IN ('acabamentos','corantes','embalagens','essencias','primario','propriedades'))
  )
`);

// Listar todos os itens do estoque, com filtro opcional por tipo
router.get('/estoque', (req, res) => {
    const { tipo } = req.query;
    let sql = 'SELECT * FROM estoque';
    const params: any[] = [];
    if (tipo) {
        sql += ' WHERE tipo = ?';
        params.push(tipo);
    }
    db.all(sql, params, (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Criar novo item de estoque
router.post('/estoque', (req, res) => {
    const { id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo } = req.body;
    console.log("Dados recebidos para criar estoque:", req.body);
    // {"id": 147, "produto": "Válvula Gatilho Branca G28", "peso": 0, "medida": "28", "preco": 2.1, "quantidade": 2, "quantidadeAtual": 2, "periodo": "17/05/2025", "vencimento": "", "imagem": "", "tipo": "acabamentos"}
    db.run(
        'INSERT INTO estoque (id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo],
        function (err) {
            if (err) {
                console.error("Erro ao inserir no estoque:", err.message);
                return res.status(500).json({ error: err.message });
            }
            try {
                res.json({ id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo });
            } catch (error) {
                res.status(500).json({ error: 'Erro ao criar item de estoque' });
            }
        });
});

// Atualizar item de estoque
router.put('/estoque/:id', (req, res) => {
    const { produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo } = req.body;
    db.run(
        'UPDATE estoque SET produto = ?, peso = ?, medida = ?, preco = ?, quantidade = ?, quantidadeAtual = ?, periodo = ?, vencimento = ?, imagem = ?, tipo = ? WHERE id = ?',
        [produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ id: req.params.id, produto, peso, medida, preco, quantidade, quantidadeAtual, periodo, vencimento, imagem, tipo });
        }
    );
});


// Deletar item de estoque
router.delete('/estoque/:id', (req, res) => {
    db.run('DELETE FROM estoque WHERE id = ?', [req.params.id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
});

// Drop na tabela estoque
router.post('/estoque/drop', (req, res) => {
    db.run('DROP TABLE IF EXISTS estoque', function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true, message: 'Tabela estoque removida.' });
    });
});

export default router;

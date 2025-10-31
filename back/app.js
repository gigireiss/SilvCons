// app.js
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./sql')
app.use(cors());


app.get('/locals', (req, res) => {
    db.query('SELECT * FROM locais', (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.get('/locals/:estado', (req, res) => {
    const estado = req.params.estado;
    db.query('SELECT * FROM locais WHERE estado = ?', [estado], (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});


// GET geral: retorna todas as localidades
app.get('/localidades', (req, res) => {
    const sql = 'SELECT * FROM localidades';
    db.query(sql, (err, results) => {
      if (err) return res.status(500).json({ erro: err });
      res.status(200).json(results);
    });
  });
  
  // GET com filtro: retorna localidades por nome (ex: /localidades/amazonas)
  app.get('/localidades/:nome', (req, res) => {
    const nomeLocal = req.params.nome;
    const sql = 'SELECT * FROM localidades WHERE nome LIKE ?';
    db.query(sql, [`%${nomeLocal}%`], (err, results) => {
      if (err) return res.status(500).json({ erro: err });
      res.status(200).json(results);
    });
  });
  
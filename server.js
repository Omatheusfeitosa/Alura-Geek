const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json()); 
app.use(express.static('public')); 


app.get('./public/db/produtos', (req, res) => {
    fs.readFile('produtos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler arquivo de produtos' });
        }
        res.json(JSON.parse(data));
    });
});


app.post('./public/db/produtos', (req, res) => {
    const novoProduto = req.body; 

    fs.readFile('produtos.json', 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao ler arquivo de produtos' });
        }

        const produtos = JSON.parse(data);
        produtos.push(novoProduto); 
        
        fs.writeFile('produtos.json', JSON.stringify(produtos, null, 4), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao salvar produto' });
            }
            res.status(201).json({ message: 'Produto adicionado com sucesso!' });
        });
    });
});

app.delete('./public/db/produtos/:nome', (req, res) => {
    const nomeProduto = req.params.nome;

    fs.readFile('produtos.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Erro ao ler arquivo' });

        let produtos = JSON.parse(data);
        produtos = produtos.filter(produto => produto.nome !== nomeProduto); // Remover o produto do array

        fs.writeFile('produtos.json', JSON.stringify(produtos, null, 4), (err) => {
            if (err) return res.status(500).json({ error: 'Erro ao salvar arquivo' });
            res.status(200).json({ message: 'Produto removido com sucesso' });
        });
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`http://localhost:${PORT}`)
});

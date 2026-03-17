const express = require('express');
const path = require('path');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.static('public/ind.html'));

// In-memory data store (Resets when server restarts)
let inventory = [
    { id: 1, name: "Edge Router v3", qty: 2, category: "Networking" },
    { id: 2, name: "NVMe SSD 2TB", qty: 15, category: "Storage" },
    { id: 3, name: "Spare Load Balancer", qty: 1, category: "Networking" }
];

// API: GET all items
app.get('/api/inventory', (req, res) => res.json(inventory));

// API: POST create new item
app.post('/api/inventory', (req, res) => {
    const newItem = { id: Date.now(), ...req.body };
    inventory.push(newItem);
    res.status(201).json(newItem);
});

// API: PUT update existing item
app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    inventory = inventory.map(item => item.id == id ? { ...item, ...req.body } : item);
    res.json({ message: "Updated" });
});

// API: DELETE item
app.delete('/api/inventory/:id', (req, res) => {
    inventory = inventory.filter(item => item.id != req.params.id);
    res.json({ message: "Deleted" });
});

app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`Inventory System running at: http://localhost:${PORT}`);
    console.log(`=========================================`);
});

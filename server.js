const express = require('express')
//const http = require('http')

const Contenedor = require('./Contenedor')

const PORT = process.env.PORT || 3000
const app = express()

app.listen(PORT, ()=> {
    console.log(`Servidor escuchando el puerto ${PORT}`);
})

app.get('/productos', async (req, res) => {
    const db = new Contenedor("productos.txt");    
    
    const products = await db.getAll();

    res.send(products);
})

app.get('/productoRandom', async (req, res)=> {

    const db = new Contenedor("productos.txt");    
    
    const products = await db.getAll();

    const random = Math.floor(Math.random() * products.length);
    
    res.send(products[random]);
})
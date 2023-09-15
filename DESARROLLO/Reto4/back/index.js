const express = require("express");
const port = 3030;
const db = require('./src/db/database');
const usuarios = require('./src/routes/usuario');
const auth = require('./src/routes/auth');
const ppt = require('./src/routes/PPT');
const categoria = require('./src/routes/categoria');
const palabra = require('./src/routes/palabra');
const ahorcado = require('./src/routes/ahorcado');
const cors = require('cors');
const app = express();

app.use(cors());

(async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Conexion establecida correctamente');
    } catch (error) {
        throw new Error(error);
    }
})();

app.use(express.json());

app.use('/usuario', usuarios)
app.use('/auth', auth)
app.use('/ppt', ppt)
app.use('/categoria', categoria)
app.use('/palabra', palabra)
app.use('/ahorcado', ahorcado)


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
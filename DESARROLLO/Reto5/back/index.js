const express = require("express");
const port = 3030;
const db = require('./src/db/database');
const empleado = require('./src/routes/empleado');
const premio = require('./src/routes/premio');
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

app.use('/empleado', empleado)
app.use('/premio', premio)


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
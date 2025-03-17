const express = require("express");
const sql = require("mssql");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
    user: "root",
    password: "root",
    server: "172.30.30.35",
    database: "BLIBLIOTECA",
    options: {
        encrypt: true, 
        trustServerCertificate: true,
    },
};

// Ruta para obtener datos
app.get("/get-data", async (req, res) => {
    try {
        const pool = await sql.connect(dbConfig); 
        const result = await pool.request().query("SELECT * FROM LIBRO"); 
        res.json(result.recordSet);
    } catch (error) {
        console.error("Error al conectar a la base de datos: ", error);
        res.status(500).send("Error al conectar a la base de datos");
    }
});

// Ruta para agregar un libro
app.post("/ad-book", async (req, res) => {
    const { Titulo, Autor, Fecha, ISBN } = req.body;
    try {
        const pool = await sql.connect(dbConfig);
        await pool
            .request()
            .input("Titulo", sql.VarChar, Titulo) 
            .input("Autor", sql.VarChar, Autor)
            .input("Fecha", sql.VarChar, Fecha)
            .input("ISBN", sql.VarChar, ISBN) 
            .query(
                "INSERT INTO LIBRO (Titulo, Autor, Fecha, ISBN) VALUES (@Titulo, @Autor, @Fecha, @ISBN)"
            );
        res.send("Libro agregado correctamente");
    } catch (error) {
        console.error("Error al insertar en la base de datos: ", error);
        res.status(500).send("Error al insertar en la base de datos");
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`SERVIDOR CORRIENDO EN http://localhost:${port}`); 
});
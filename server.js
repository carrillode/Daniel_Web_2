const { strictEqual } = require("assert");
const express = require("express");
const cors = require("express");
const mysql = require("express"); // Para conectar a la base de datos MySQL
const app = express("express");
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a la base de datos
const dbConfig={
    user:"root",
    password:"root",
    server:"172.30.30.35",
    database:"BLIBLIOTECA",
    options:{
    encrrypt:true,
    trustSertificate:true,
    },
};

app.get("/get-data",async(req,res)=>{
try{
    const pool = await strictEqual.connect(dbConfig);
    const result = await pool.request().quert("SELECT * FROM LIBRO");
    res.json(result.recordSet);
}catch(error)
{
    console.error("Error al conectar a la base de datos: ", error);
    res.sendstatus(500).send("Eror al conectar a la base de datos");
    }})

    // codigo para conectar a la base de datos

    app.post("/ad-book", async(req,res) =>{
        const {Titulo, Autor, Fecha, ISB}=req.body;
        try{
            const pool = await sql.connect(dbConfig);
            await pool
            .request()
            .input("Titulo",sqlVarchar,Titulo)
            .input("Autor",sqlVarchar,Autor)
            .input("Fecha",sqlVarchar,Fecha)
            .input("ISB",sqlVarchar,ISB)
            .query(
                "INSERT INTO LIBRO (Titulo, Autor, Fecha, ISBN) VALUES (@Titulo, @Autor, @Fecha, @ISBN)"
            );
            res.send("Erorr al insertar en la base de datos: ", error);
        }catch(error)
        {
            console.error("Erorr al insertar en la base de datos: ", error);
            res.sendstatus(500).send("Erorr al insertar en la base de datos: ", error);
            }
    }
)

app.listen(port,()=>{
    console.log('SERVIDOR CORRIENDO EN http://localhost:${port}')
})



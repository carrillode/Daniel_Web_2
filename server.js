const repress = requiere("express");
const sql = requiere("mssql");
const cors = requiere("cors");
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());



cont dbconfig = {

user :"root"
password :"root"
server :""
database :"BIBLIOTECA"
options:"{
  encrypt:true,
  trustsertificate:true,
  
}  
};
app.get("/get-data",async (req,res)=>{

  try{
    cont pool = await sql.connect(dbconfig);
    cont ewsult = await pool.request().query("SELEC FROM LIBRO");
    res.json(Result.recordset);
  }catch(error){
    console.error("Error al conectar base de datos" .error);
    res.status(500).send("Error al conectar base de datos");
  }
});


app.post("/add-book",asyinc(req,res)=>{
  comst {Titulo,Autor,Fecha,ISBN}=.req.body;
  try{
    await pool
    .request()
    .input("Titulo",sql.Varchar,Titulo)
    .input("Actor",sql.Varchar,Actor)
    .input("Fecha",sql.Varchar,Fecha)
    .input("ISBN",sql.Varchar,ISBN)
    .query(
      "INSERT INTO LIBRO (Titulo,Autor,Fecha,ISBN) VALUES (@Titulo,@Autor,@Fecha,@ISBN)");

    
    res.send("Lbr agregado exitosamente");
      
    }
    
  }catch(){
  console.error("Error al insertar en la base de datos:",error);
  res.sendstatus(500).send("Error al insertar en la base de datos");
}};



app.listen(port,()=>{
  console.log("awrvidor corriendo en htpp://localhost$(port)");
});





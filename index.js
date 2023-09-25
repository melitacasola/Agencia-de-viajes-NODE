
import express from "express";
import db from "./config/db.js";
import router from "./routes/index.js";



const app = express();

//Conectar la DB
db.authenticate()
    .then(() => console.log('Base de Datos Conectada...'))
    .catch( error => console.log(eror))


//Definir puerto
const port = process.env.PORT || 4000;

//Habiltiar PUG/HBS/etc
app.set('view engine', 'pug');

//Midd obtener año actual
app.use((req, res, next) =>{
    const year = new Date()
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreAgencia = 'Agencia de Viajes'

    next();
});

//Agregar Body parser p/leer formularios
app.use(express.urlencoded({extended:true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar Rutas
app.use('/', router)


app.listen(port, () =>{
    console.log(`el servidor funcionando en el servidor ${port}`)
})
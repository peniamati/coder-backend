import routerProd from "./routes/products.routes.js";
import routerCart from "./routes/carts.routes.js";
import express from "express";
import path from "path";
import { __dirname } from "./path.js";

const PORT = 8080;
const app = express();

//Middleware

app.use(express.json()); //Permitir enviar y recibir archivos JSON
app.use(express.urlencoded({ extended: true })); //Permitir extensiones en la url

//ROUTES
app.use("/api/products", routerProd);
app.use("/api/carts", routerCart);
app.use("/static", express.static(path.join(__dirname, "/public")));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
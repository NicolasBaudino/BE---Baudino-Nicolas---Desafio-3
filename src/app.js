import express from "express";
import ProductManager from "./entregable2.js"

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const PM = new ProductManager("./src/products.json")

app.get("/products", (request, response) => {
    const { limit } = request.query;
    const products = PM.getProducts();
    if (limit) {
        const limitOptions = products.slice(0, limit);
        return response.json(limitOptions);
    }
    else {
        return response.json(products);
    }
});

app.get("/products/:id", (request, response) => {
    const { id } = request.params;
    try {
        const productFind = PM.getProductById(id);
        return response.json(productFind);
    }
    catch (error) {
        return response.json({error: error.message})
    }
});

app.listen(8080, () => {console.log("Server listening on port 8080")})

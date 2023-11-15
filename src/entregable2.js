import fs, { writeFile } from "fs";
export default class ProductManager {
    constructor(path){
        this.path = path;
        try {
            let products = fs.readFileSync(this.path, "utf-8");
            this.listOfProducts = JSON.parse(products);
        } catch {
            this.listOfProducts = [];
            fs.writeFile(this.path, JSON.stringify(this.listOfProducts, null, "\t"));
        }
    }
    
    async addProduct(product) {
        if(!product){
            return console.log("El producto esta vacío");
        }

        let idP = 0;
        if (this.listOfProducts.length == 0){
            idP = 1;
        }
        else {
            idP = this.listOfProducts[this.listOfProducts.length - 1].id + 1;
        }

        const existingId = this.listOfProducts.find((element) => element.code == product.code);
        if(existingId){
            console.log("El producto ya existe");
        } 
        else{
            this.listOfProducts.push({...product, id: idP});
            await fs.promises.writeFile(this.path, JSON.stringify(this.listOfProducts, null, "\t"));
        }
    }

    getProducts(){
        return this.listOfProducts;
    }

    getProductById(productId){
        const existingProduct = this.listOfProducts.find((element) => element.id == productId);
        if (existingProduct == undefined){
            throw new Error("Not found with id " + productId);
        }
        else{
            return existingProduct;
        }
    }

    async updateProduct(productId, newData){
        const index = this.listOfProducts.findIndex((element) => element.id == productId);
        if (index >= 0){
            this.listOfProducts[index] = { ...this.listOfProducts[index], ...newData }
            
            await fs.promises.writeFile(this.path, JSON.stringify(this.listOfProducts, null, "\t"));
        }
        else {
            console.log("Producto no encontrado con ese ID");
        }
    }

    async deteleProduct(productId){
        const existingProduct = this.listOfProducts.find((element) => element.id == productId);
        if (existingProduct){
            const newProducts = this.listOfProducts.filter((element) => element.id != productId);

            this.listOfProducts = newProducts;

            await fs.promises.writeFile(this.path, JSON.stringify(this.listOfProducts, null, "\t"));
        }
        else {
            console.log("El producto que desea eliminar no existe")
        }
    }
}

export class Product {
    constructor(title, description, price, thumbnail, code, stock){
        this.title = title,
        this.description = description,
        this.price = price,
        this.thumbnail = thumbnail,
        this.code = code,
        this.stock = stock
    }
}
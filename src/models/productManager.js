import {promises as fs} from 'fs';
import crypto from 'crypto';

//crypto.randomBytes(16).toString('hex'); // Id unico

export class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  async getProducts() {
    try {
      const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
      return products;
    } catch (error) {
      return [];
    }
  }

  async getProductById(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const product = products.find(product => product.id === id);
    return product || null;
  }

  async addProduct(product) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const exist = products.find(p => p.code === product.code);
    if (exist) {
      return false;
    }
    product.id = crypto.randomBytes(16).toString('hex');
    if (product.status == null){
      product.status = true;
    }
    products.push(product);
    await fs.writeFile(this.path, JSON.stringify(products));
    return true;
  }

  async updateProduct(id, product) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const prod = products.find(p => p.id === id);
    if (prod){
      prod.title = product.title;
      prod.description = product.description;
      prod.price = product.price;
      prod.stock = product.stock;
      prod.code = product.code;
      prod.status = product.status;
      prod.category = product.category;
      prod.thumbnail = product.thumbnail;
      await fs.writeFile(this.path, JSON.stringify(products));
      return true;
    }
    else{
      return false;
    }
  }

  async deleteProduct(id) {
    const products = JSON.parse(await fs.readFile(this.path, 'utf-8'));
    const product = products.find(p => p.id === id);
    if (product){
      await fs.writeFile(this.path, JSON.stringify(products.filter(p => p.id !== id)));
      return true;
    }
    else{
      return false;
    }
  }
}

export default ProductManager
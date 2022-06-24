import { Router } from "express";
import { getEditableProducts } from "../controllers/editable-products.controller";
import { getAddProduct, postAddProduct } from "../controllers/add-product.controller";
import { getEditProduct, postEditProduct } from "../controllers/edit-product.controller";
import { postDeleteProduct } from "../controllers/delete-product.controller";

const adminRoute = Router();

adminRoute.get('/editable-products', getEditableProducts);

adminRoute.get('/add-product', getAddProduct);
adminRoute.post('/add-product', postAddProduct);

adminRoute.get('/edit-product/:id', getEditProduct);
adminRoute.post('/edit-product/:id', postEditProduct);

adminRoute.post('/delete-product', postDeleteProduct);

export { adminRoute };
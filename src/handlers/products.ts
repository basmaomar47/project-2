import express, { Request, Response } from 'express';
import { product, productStore } from '../models/product';
import { Verify } from '../jwthelpers';

const store = new productStore();
const indexp = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};
const showp = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const id = Number(req.params.id);
    const product = await store.show(id);
    res.json(product);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const createp = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const product: product = {
      name: req.body.name,
      price: req.body.price,
    };
    const newproduct = await store.create(product);
    res.json(newproduct);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const deletep = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const id = req.body.id;
    const deleted = await store.delete(id);
    res.json(deleted);
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', indexp);
  app.get('/products/:id', showp);
  app.post('/products', createp);
  app.delete('/products', deletep);
};

export default productRoutes;

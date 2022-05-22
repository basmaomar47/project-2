import express, { Request, Response } from 'express';
import { order, orderStore } from '../models/order';
import { Verify } from '../jwthelpers';

const store = new orderStore();

const indexo = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const order = await store.index();
    res.send(order);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};

const showo = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as unknown as number;
    const order = await store.show(id);
    Verify(req, order.user_id);
    res.json(order);
  } catch (error) {
    res.status(401);
    res.json(error);
  }
};
const createo = async (req: Request, res: Response) => {
  try {
    const { user_id, status } = req.body;

    Verify(req, user_id);
    const order: order = { user_id, status };
    const neworder = await store.create(order);
    res.json(neworder);
  } catch (error) {
    res.status(401).json(error);
  }
};
const deleteo = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as unknown as number;
    const order = await store.show(id);
    Verify(req, order.user_id);
    const deletedorder = await store.delete(id);
    res.send(deletedorder);
  } catch (error) {
    res.status(401).json(error);
  }
};

const addProduct = async (_req: Request, res: Response) => {
  const orderId: number = Number(_req.params.id);
  const productId: number = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);

  try {
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.get('/orders/:id', showo);
  app.get('/orders', indexo);
  app.post('/orders', createo);
  app.post('/orders/:id/products', addProduct);
  app.delete('/orders', deleteo);
};

export default orderRoutes;

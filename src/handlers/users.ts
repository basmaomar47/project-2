import express, { Request, Response } from 'express';
import { user, userStore } from '../models/user';
import { Verify, Sign } from '../jwthelpers';

const store = new userStore();
const indexu = async (req: Request, res: Response) => {
  try {
    Verify(req);
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};
const showu = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    Verify(req, id);
    const user = await store.show(id);
    res.json(user);
  } catch (err) {
    res.status(401);
    res.json(err);
  }
};

const createu = async (req: Request, res: Response) => {
  try {
    const user: user = {
      lname: req.body.lname,
      fname: req.body.fname,
      password: req.body.password,
    };

    const newuser = await store.create(user);

    const token = Sign(Number(newuser.id));
    res.json(token);
  } catch (err) {
    res.status(401).json(err);
  }
};

const deleteu = async (req: Request, res: Response) => {
  try {
    const id = req.body.id as unknown as number;
    Verify(req, id);
    const deleted = await store.delete(id);
    res.json(deleted);
  } catch (err) {
    res.status(401).json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user: user = {
    fname: req.body.fname,
    lname: req.body.lname,
    password: req.body.password,
  };
  try {
    const u = await store.authenticate(user.fname, user.lname, user.password);
    if (u === null) {
      res.status(401);
      res.json('Incorrect user information');
    } else {
      const token = Sign(Number(user.id));
      res.json(token);
    }
  } catch (error) {
    res.status(400);
    res.json({ error });
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', indexu);
  app.get('/users/:id', showu);
  app.post('/users', createu);
  app.delete('/users', deleteu);
  app.post('/users/authenticate', authenticate);
};

export default userRoutes;

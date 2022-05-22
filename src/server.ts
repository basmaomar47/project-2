import express from 'express';
import bodyParser from 'body-parser';
import userroutes from './handlers/users';
import productroutes from './handlers/products';
import orderroutes from './handlers/orders';

const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

userroutes(app);
productroutes(app);
orderroutes(app);

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
export default app;

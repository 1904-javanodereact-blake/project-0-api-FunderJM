import express from 'express';
import bodyParser from 'body-parser';
import { userRouter } from './routers/user-router';
import { sessionMiddleware } from './middleware/session.middleware';
import { reimbursementRouter } from './routers/reimbursement-router';

const app = express();
export const port = process.env.PORT || 8080;

app.use((req, res, next) => {
  console.log(`request made with url: ${req.url} and method: ${req.method}`);
  const headers = req.rawHeaders;
  console.log(headers);
  next();
});

app.use(bodyParser.json());

app.use(sessionMiddleware);

/**
 * Register Routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port);
console.log('end of index');
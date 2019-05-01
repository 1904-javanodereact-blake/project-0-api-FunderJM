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

app.use((req, resp, next) => {
  console.log(req.get('host'));
  (process.env.SHIP_API_STAGE === 'prod')
    ? resp.header('Access-Control-Allow-Origin', process.env.SHIP_APP_URL)
    : resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
  resp.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  resp.header('Access-Control-Allow-Credentials', 'true');
  resp.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT, PATCH');
  next();
});

/**
 * Register Routers
 */
app.use('/users', userRouter);
app.use('/reimbursements', reimbursementRouter);

app.listen(port);
console.log('end of index');
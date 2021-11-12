import express, { json } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import * as swaggerDoc from './docs/swaggerdocs/swagger.json';

const app = express();

app.listen(3000);

app.use(cors());

app.use(json());

// Serve swagger document
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use('/', routes);

export default app;

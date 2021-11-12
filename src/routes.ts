import express from 'express';
import convertRoute from './routes/convert';

const routes = express.Router();

// Route to handle convert file operations
routes.use('/convert', convertRoute);

export default routes;

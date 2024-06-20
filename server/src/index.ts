import { Hono } from 'hono';
import { genApp } from './gen';
import { cors } from 'hono/cors';

const app = new Hono();
app.use("/*", cors());
app.route('/gen', genApp);

export default app;

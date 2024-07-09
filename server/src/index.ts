import { rateLimit, RateLimitBinding, RateLimitKeyFunc } from "@elithrar/workers-hono-rate-limit";
import { Hono, Context, Next } from "hono";
import { genApp } from './gen';
import { cors } from 'hono/cors';

type Bindings = {
	RATE_LIMITER: RateLimitBinding;
};

const app = new Hono<{ Bindings: Bindings }>();

const getKey: RateLimitKeyFunc = (c: Context): string => {
	return c.req.header("Authorization") || "";
};

const rateLimiter = async (c: Context, next: Next) => {
	return await rateLimit(c.env.RATE_LIMITER, getKey)(c, next);
};

app.use("*", rateLimiter);
app.use("/*", cors());
app.route('/gen', genApp);

export default app;

import { Context, Hono, Next } from "hono";

// List of NSFW keywords to filter out
const nsfwKeywords = [
  "nude",
  "sex",
  "porn",
  "violence",
  "gore",
  "blood",
  "drug",
  "explicit",
];

const VaporwaveVideoGamePrompt = "ui frame for a tarot-themed video game, windows vista, ui/gui, alchemical and astrological symbolism, medieval fantasy, pixel art, beautiful, in the style of vaporwave, dominant hot pink, beautiful, masterpiece, bespoke, 90s retro --ar 16:9 --style raw --v 6.0 --no blur, noise, background, sky, landscape, mountains, lake --sref"


const SurrealPrompt = "A scene from a polychromatic surrealistic masterpiece, high contrast surreal collage, optical art, neko, crisp, vaporwave, papercut --version 5.2 --ar 16:9, in the scene"

// Middleware to check for NSFW content
const checkNSFW = async (c: Context, next: Next) => {
  const { prompt } = await c.req.json();

  if (nsfwKeywords.some((keyword) => prompt.toLowerCase().includes(keyword))) {
    return c.text("NSFW content is not allowed", 400);
  }

  // Store the prompt in the context's custom data object
  c.set("customPrompt", prompt);
  await next();
};

// Create a new Hono app for the /gen endpoint
const genApp = new Hono<{
  Bindings: {
    AI: any;
  };
  Variables: {
    customPrompt: string;
  };
}>();

genApp.post("/", checkNSFW, async (c) => {
  const prompt = c.get("customPrompt");

  const inputs = {
    prompt,
  };

  const response = await c.env.AI.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  return c.newResponse(response, 200, {
    "content-type": "image/png",
  });
});

export { genApp };

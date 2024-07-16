import { z } from "zod";

const articleSchema = z.array(
  z.object({
    id: z.number(),
    quantity: z.number().default(1),
  }),
);

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  if (!id) {
    throw createError({
      status: 400,
      message: "No cart id provided!",
    });
  }

  const result = await readValidatedBody(event, (body) =>
    articleSchema.safeParse(body),
  );
  if (!result.success) {
    throw createError({
      status: 400,
      message: "Invalid articles body!",
    });
  }

  const articles = result.data;

  for (const article of articles) {
    await $fetch("https://pixelhobby-shop.de/cart/add.js", {
      method: "POST",
      headers: {
        Cookie: `cart=${id}`,
        "Content-Type": "application/json",
        Host: "pixelhobby-shop.de",
        "User-Agent": "Pixina",
      },
      body: JSON.stringify(article),
    });
  }
});

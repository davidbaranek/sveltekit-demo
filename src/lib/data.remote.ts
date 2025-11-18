import { query } from "$app/server";
import * as z from "zod";

//Mockup data

const mockPosts = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `Post ${i + 1}`,
  date: new Date(2024, 0, 1 + i).toISOString(),
}));

export const getPosts = query(
  z.object({
    page: z.number().min(1).default(1),
    limit: z.number().min(1).default(10),
  }),
  async ({ page, limit }) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const offset = (page - 1) * limit;
    const total = mockPosts.length;
    const data = mockPosts.slice(offset, offset + limit);

    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  },
);

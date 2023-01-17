import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const listTagRouter = router({
  getAllTagsByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.listTag.findMany({
        where: { listId: input.listId },
      });
    }),
  deleteAllTagsByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listTag.deleteMany({
        where: { listId: input.listId },
      });
    }),
  createManyTagsByListId: publicProcedure
    .input(z.object({ listId: z.string(), tags: z.array(z.string()) }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listTag.createMany({
        data: input.tags.map((tag) => ({
          listId: input.listId,
          tag,
        })),
      });
    }),
});

import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const listFollowerRouter = router({
  deleteAllFollowersByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listFollower.deleteMany({
        where: { listId: input.listId },
      });
    }),
});

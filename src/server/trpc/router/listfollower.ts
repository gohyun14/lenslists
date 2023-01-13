import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const listFollowerRouter = router({
  getFollowerCountByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.listFollower.count({
        where: { listId: input.listId },
      });
    }),
  deleteAllFollowersByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listFollower.deleteMany({
        where: { listId: input.listId },
      });
    }),
  followList: publicProcedure
    .input(z.object({ listId: z.string(), follower: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listFollower.create({
        data: {
          listId: input.listId,
          follower: input.follower,
        },
      });
    }),
  unfollowList: publicProcedure
    .input(z.object({ listId: z.string(), follower: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listFollower.delete({
        where: {
          listId_follower: {
            listId: input.listId,
            follower: input.follower,
          },
        },
      });
    }),
  doesUserFollowList: publicProcedure
    .input(z.object({ listId: z.string(), follower: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.listFollower.count({
        where: {
          listId: input.listId,
          follower: input.follower,
        },
      });
    }),
});

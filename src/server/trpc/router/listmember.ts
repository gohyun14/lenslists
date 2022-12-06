import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const listMemberRouter = router({
  getAllMembersByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.listMember.findMany({
        where: { listId: input.listId },
      });
    }),
  deleteAllMembersByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listMember.deleteMany({
        where: { listId: input.listId },
      });
    }),
  createManyMembersByListId: publicProcedure
    .input(
      z.object({
        listId: z.string(),
        members: z.array(
          z.object({
            memberId: z.string(),
            memberName: z.string(),
            memberHandle: z.string(),
            memberPicture: z.string(),
          })
        ),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.listMember.createMany({
        data: input.members.map((member) => ({
          listId: input.listId,
          memberId: member.memberId,
          memberName: member.memberName,
          memberHandle: member.memberHandle,
          memberPicture: member.memberPicture,
        })),
      });
    }),
});

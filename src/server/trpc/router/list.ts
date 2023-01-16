import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const listRouter = router({
  createList: publicProcedure
    .input(
      z.object({
        owner: z.string(),
        name: z.string(),
        description: z.string(),
        members: z.array(
          z.object({
            memberId: z.string(),
            memberName: z.string(),
            memberHandle: z.string(),
            memberPicture: z.string(),
          })
        ),
        tags: z.array(z.string()),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.list.create({
        data: {
          Owner: input.owner,
          Name: input.name,
          Description: input.description,
          ListMember: {
            createMany: {
              data: input.members.map((member) => ({
                memberId: member.memberId,
                memberName: member.memberName,
                memberHandle: member.memberHandle,
                memberPicture: member.memberPicture,
              })),
            },
          },
          ListTag: {
            createMany: {
              data: input.tags.map((tag) => ({
                tag,
              })),
            },
          },
        },
      });
    }),
  getAllListsByOwnerAddress: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.list.findMany({
        where: { Owner: input.address },
      });
    }),
  getListByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.list.findUnique({
        where: { id: input.listId },
      });
    }),
  updateListByListId: publicProcedure
    .input(
      z.object({
        listId: z.string(),
        name: z.string(),
        description: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.list.update({
        where: { id: input.listId },
        data: {
          Name: input.name,
          Description: input.description,
        },
      });
    }),
  deleteListByListId: publicProcedure
    .input(z.object({ listId: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.list.delete({
        where: { id: input.listId },
      });
    }),
  getManyListsByListIds: publicProcedure
    .input(z.object({ listIds: z.array(z.string()) }))
    .query(({ input, ctx }) => {
      return ctx.prisma.list.findMany({
        where: { id: { in: input.listIds } },
      });
    }),
});

import { router } from "../trpc";
import { exampleRouter } from "./example";
import { listRouter } from "./list";
import { listMemberRouter } from "./listmember";
import { listTagRouter } from "./listtag";

export const appRouter = router({
  example: exampleRouter,
  list: listRouter,
  listMember: listMemberRouter,
  listTag: listTagRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

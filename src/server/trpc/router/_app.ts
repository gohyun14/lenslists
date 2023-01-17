import { router } from "../trpc";
import { listRouter } from "./list";
import { listMemberRouter } from "./listmember";
import { listTagRouter } from "./listtag";
import { listFollowerRouter } from "./listfollower";

export const appRouter = router({
  list: listRouter,
  listMember: listMemberRouter,
  listTag: listTagRouter,
  listFollower: listFollowerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

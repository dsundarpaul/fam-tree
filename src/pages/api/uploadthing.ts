import { createNextPageApiHandler } from "uploadthing/next-legacy";
import { ourFileRouter } from "~/server/api/routers/uploadthing";

const handler = createNextPageApiHandler({
  router: ourFileRouter,
});

export default handler;

import { type WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { headers } from "next/headers";
import toast from "react-hot-toast";
import { Webhook } from "svix";
import { api } from "~/utils/api";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET missing");
  }

  // GET HEADERS
  const headerPayload = headers();
  const svixId = headerPayload.get("svix-id");
  const svixTimestamp = headerPayload.get("svix-timestamp");
  const svixSignature = headerPayload.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // GET BODY
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // create a new svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  console.log("Webhook body:", body);

  console.log({ eventType });
  if (eventType === "user.created") {
    const { id, first_name } = evt.data;

    const { mutate: createUser } = api.user.createUser.useMutation({
      onSuccess: () => {
        toast.success("Accout created sucessfully!");
      },
      onError: () => {
        toast.error("Something went wrong while creating Accout (webhook)");
      },
    });

    createUser({ id: id, displayName: first_name });
  }
  if (eventType === "user.deleted") {
  }
  if (eventType === "user.updated") {
    throw new Error("We are not handing User update yet");
  }

  return new Response("", { status: 200 });
}

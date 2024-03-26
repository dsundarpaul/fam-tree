import { type WebhookEvent } from "@clerk/nextjs/dist/types/server";
import { type NextApiRequest, type NextApiResponse } from "next";
import { headers } from "next/headers";
import toast from "react-hot-toast";
import { Webhook } from "svix";
import { api } from "~/utils/api";
import { buffer } from "micro";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405);
  }

  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("WEBHOOK_SECRET missing");
  }

  // GET HEADERS
  const headerPayload = headers();
  const svix_id = req.headers["svix-id"] as string;
  const svix_timestamp = req.headers["svix-timestamp"] as string;
  const svix_signature = req.headers["svix-signature"] as string;

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({ error: "Error occured -- no svix headers" });
  }

  console.log("headers", req.headers, svix_id, svix_signature, svix_timestamp);

  // GET BODY
  const body = (await buffer(req)).toString();

  // create a new svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).json({ Error: err });
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

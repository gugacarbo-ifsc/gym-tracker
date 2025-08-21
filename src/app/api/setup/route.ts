import { getCloudflareContext } from "@opennextjs/cloudflare";
import { up } from "./up";

export async function GET() {
  try {
    await up((await getCloudflareContext({ async: true })).env.DB);
  } catch (e: unknown) {
    if (e instanceof Error) {
      const causeMessage =
        e.cause instanceof Error ? e.cause.message : String(e.cause);
      console.log(causeMessage, e.message);
    }
  }
  return new Response("Migration completed");
}

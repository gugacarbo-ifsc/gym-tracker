import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/libsql";

export async function GET() {
  try {
    const db = drizzle(
      (await getCloudflareContext({ async: true })).env.DB as any
    );

    const result = await db.select().from(users).all();
    return Response.json(result);
  } catch (e: unknown) {
    if (e instanceof Error) {
      const causeMessage =
        e.cause instanceof Error ? e.cause.message : String(e.cause);
      console.log(causeMessage, e.message);
    }
  }

  return new Response("Migration completed");
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { updateRecord } from "@auth/d1-adapter";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { UpdateProfileButton } from "@/features/user/profile/update-profile-button";
import { auth } from "@/app/auth";

async function updateName(formData: FormData): Promise<void> {
  "use server";
  const session = await auth();
  if (!session?.user?.id) {
    return;
  }
  const name = formData.get("name") as string;
  if (!name) {
    return;
  }
  const query = `UPDATE users SET name = $1 WHERE id = $2`;
  await updateRecord(
    (
      await getCloudflareContext({ async: true })
    ).env.DB,
    query,
    [name, session.user.id]
  );
  redirect("/");
}

function UserProfile({ session }: { session: Session }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage
            src={session.user?.image || ""}
            alt={session.user?.name || ""}
          />
          <AvatarFallback>{session.user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium">{session.user?.name || "No name set"}</p>
          <p className="text-sm text-muted-foreground">{session.user?.email}</p>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">User ID: {session.user?.id}</p>
      </div>
      <form action={updateName} className="space-y-2">
        <Label htmlFor="name">Update Name</Label>
        <Input id="name" name="name" placeholder="Enter new name" />
        <UpdateProfileButton />
      </form>
    </div>
  );
}

export { UserProfile };

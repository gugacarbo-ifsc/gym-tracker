import { signOut } from "@/app/auth";
import { Button } from "@/components/ui/button";

function LogoutForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signOut();
        Response.redirect("/");
      }}
    >
      <Button type="submit" variant="outline" className="w-full">
        Sign out
      </Button>
    </form>
  );
}

export { LogoutForm };

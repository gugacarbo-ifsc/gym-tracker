import { signIn } from "@/app/auth";
import { Input } from "@/components/ui/input";
import { LoginButton } from "./login-button";

function LoginForm() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("resend", {
          email: formData.get("email") as string,
        });
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Input
          type="email"
          name="email"
          placeholder="Email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          required
        />
      </div>
      <LoginButton />
    </form>
  );
}

export { LoginForm };

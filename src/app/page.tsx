import { auth } from "./auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { ModeToggle } from "@/components/mode-toggle";
import { LoginForm } from "@/features/authentication/login/login-form";
import { UserProfile } from "@/features/user/profile/user-profile";
import { LogoutForm } from "@/features/authentication/logout/logout-form";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            {session ? "User Profile" : "Login"}
            <ModeToggle className=" ml-4" />
          </CardTitle>
          <CardDescription className="text-center">
            {session
              ? "Manage your account"
              : "Welcome to the auth-js-d1-example demo"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {session ? <UserProfile session={session} /> : <LoginForm />}
        </CardContent>
        {session && (
          <CardFooter>
            <LogoutForm />
          </CardFooter>
        )}
      </Card>
    </main>
  );
}

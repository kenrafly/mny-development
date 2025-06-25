import { SignIn } from "@clerk/nextjs";
import "@/app/globals.css";

export default function Page() {
  return (
    <div className="bg-black flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  );
}

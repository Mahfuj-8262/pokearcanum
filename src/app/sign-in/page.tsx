import { Suspense } from "react";
import SignInClient from "@/components/SignInClient";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400">
      <Suspense fallback={<div>Loading sign-in...</div>}>
        <SignInClient />
      </Suspense>
    </div>
  );
}
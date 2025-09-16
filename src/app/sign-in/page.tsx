"use client";

import AuthForm from "@/components/AuthForm";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400">
      {registered && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Registration successful! Please sign in.
        </div>
      )}
      <AuthForm type="login" />
    </div>
  );
}
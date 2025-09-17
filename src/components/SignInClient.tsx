"use client";

import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function SignInClient() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");

  return (
    <div className="w-full max-w-md">
      {registered && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Registration successful! Please sign in.
        </div>
      )}
      <AuthForm type="login" />
    </div>
  );
}
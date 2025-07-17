"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthFormProps {
  type: "login" | "signup";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Add extra fields for signup if needed (e.g., username)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Replace with real API call (login/signup logic)
    alert(`${type === "login" ? "Logging in" : "Signing up"} as ${email}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/95 p-8 rounded-lg shadow-xl w-full max-w-md border border-indigo-100 flex flex-col gap-5"
    >
      <h1 className="font-extrabold text-3xl mb-2 text-center text-blue-700">
        {type === "login" ? "Welcome back!" : "Create your account"}
      </h1>
      <input
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg"
        type="email"
        placeholder="Email address"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        className="rounded px-4 py-2 border border-indigo-200 focus:border-indigo-500 focus:outline-none text-lg"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {/* Add "confirm password" for signup if you want */}
      <Button type="submit" className="w-full text-lg">
        {type === "login" ? "Log In" : "Sign Up"}
      </Button>
      <div className="text-gray-500 text-sm text-center">
        {type === "login" ? (
          <>
            New?{" "}
            <Link href="/signup" className="underline text-indigo-600 font-medium">
              Create an account
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="underline text-indigo-600 font-medium">
              Log in
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
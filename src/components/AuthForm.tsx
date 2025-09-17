"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

import Image from "next/image";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Pokeball icon as SVG (as explained earlier)

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email({ message: "Please provide a valid email." }),
    password: z.string().min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email({ message: "Please provide a valid email." }),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

type SignupFormData = z.infer<typeof signupSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

type AuthFormProps = { type: "login" | "signup" };

export default function AuthForm({ type = "signup" }: AuthFormProps) {
  // Decide which schema/type to use
  const schema = type === "signup" ? signupSchema : loginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<any>({
    resolver: zodResolver(schema),
    mode: "onTouched",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { login, register: registerUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(data: any) {
    setError(null);
    try {
      if (type === "signup") {
        await registerUser(data.name, data.email, data.password);
        router.push("/sign-in?registered=1");
      } else {
        await login(data.email, data.password);
        router.push("/");
      }
    } catch (err: any) {
      console.error("Auth error: ", err);
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full 
        max-w-md
        mx-auto
        bg-white/90
        rounded-2xl
        shadow-xl
        px-6
        py-8 
        space-y-6
        sm:px-8
        sm:py-10
        mt-4
      "
    >
      <div className="flex flex-col items-center mb-2">
        <Image
          src= "https://mafustorage.blob.core.windows.net/pokearcanumblob/pokearcanum-logo/your-logo.png"
          alt="PokeArcanum Logo"
          width={90}
          height={90}
          className="mb-2 w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-lg"
          priority // optional: eager loads immediately
        />
        <h1 className="text-3xl font-extrabold tracking-wide text-zinc-800 drop-shadow mb-1 text-center">
          {type === "signup" ? "Create Your PokéArcanum Account" : "Sign In To PokéArcanum"}
        </h1>
        <p className="text-center text-zinc-600 text-base mb-1">
          {type === "signup"
            ? "Start your legendary adventure in the world of trading cards!"
            : "Start your legendary card collection journey!"}
        </p>
      </div>

      {type === "signup" && (
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 text-zinc-900 font-semibold">
            <FiUser className="text-xl text-blue-400" />
            Name
          </Label>
          <Input
            type="text"
            id="name"
            placeholder="Ash K."
            {...register("name")}
            className="
            mt-1
            bg-white/95
            border border-zinc-300
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-yellow-400
            px-4 py-2
            transition
            text-zinc-800
            placeholder-zinc-400
            shadow-sm
            w-full
          "
            disabled={isSubmitting}
            autoComplete="name"
          />
          {typeof errors.name?.message === 'string' && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
          
        </div>
      )}

      {/* Email */}
      <div>
        <Label htmlFor="email" className="flex items-center gap-2 text-zinc-900 font-semibold">
          <FiMail className="text-xl text-red-400" />
          Email Address
        </Label>
        <Input
          type="email"
          id="email"
          placeholder="ash@poke.com"
          {...register("email")}
          className="
            mt-1
            bg-white/95
            border border-zinc-300
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-yellow-400
            px-4 py-2
            transition
            text-zinc-800
            placeholder-zinc-400
            shadow-sm
            w-full
          "
          disabled={isSubmitting}
          autoComplete="email"
        />
        {typeof errors.email?.message === 'string' && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}

      </div>

      {/* Password */}
      <div>
        <Label htmlFor="password" className="flex items-center gap-2 text-zinc-900 font-semibold">
          <FiLock className="text-xl text-yellow-400" />
          Password
        </Label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Choose a secret move"
            {...register("password")}
            className="
              mt-1
              bg-white/95
              border border-zinc-300
              rounded-lg
              focus:outline-none focus:ring-2 focus:ring-yellow-400
              px-4 py-2
              transition
              text-zinc-800
              placeholder-zinc-400
              shadow-sm
              w-full
            "
            disabled={isSubmitting}
            autoComplete={type === "login" ? "current-password" : "new-password"}
          />
          <button
            type="button"
            className="
              absolute right-3 top-3 text-xl text-zinc-400 hover:text-zinc-600
              focus:outline-none
            "
            onClick={() => setShowPassword(v => !v)}
            tabIndex={-1}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        {typeof errors.password?.message === 'string' && (
          <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password (signup only) */}
      {type === "signup" && (
        <div>
          <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-zinc-900 font-semibold">
            <FiLock className="text-xl text-yellow-300" />
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Repeat your secret move"
              {...register("confirmPassword")}
              className="
                mt-1
                bg-white/95
                border border-zinc-300
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-yellow-400
                px-4 py-2
                transition
                text-zinc-800
                placeholder-zinc-400
                shadow-sm
                w-full
              "
              disabled={isSubmitting}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="
                absolute right-3 top-3 text-xl text-zinc-400 hover:text-zinc-600
                focus:outline-none
              "
              onClick={() => setShowConfirmPassword(v => !v)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          </div>
          {typeof errors.confirmPassword?.message === 'string' && (
            <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>
      )}

      {/* Forgot password link (optional for signup, remove if you only want on login) */}
      {type === "login" && (
        <div className="flex justify-end mt-2">
          <Link
            href="/forgot-password"
            className="text-xs text-blue-600 hover:underline font-semibold"
          >
            Forgot password?
          </Link>
        </div>
      )}


      {error && <p className="text-sm text-red-600 mt-1 text-center">{error}</p>}
      <Button
        type="submit"
        variant="default"
        disabled={isSubmitting}
        className="
          w-full font-bold text-lg py-2 tracking-wide
          bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500
          text-white rounded-lg
          hover:scale-105 hover:brightness-110 transition-all
          shadow-lg
        "
      >
        {isSubmitting
          ? (type === "signup" ? "Creating account..." : "Signing in...")
          : (type === "signup" ? "Create Account" : "Sign In")}
      </Button>

      {/* Link to switch between login and sign up */}
      <div className="text-center pt-3 text-zinc-600 text-sm">
        {type === "signup" ? (
          <>
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-blue-700 font-bold hover:text-pink-600 hover:underline transition"
            >
              Sign in!
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-blue-700 font-bold hover:text-pink-600 hover:underline transition"
            >
              Create one!
            </Link>
          </>
        )}
      </div>
    </form>
  );
}
import AuthForm from "@/components/AuthForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8">
      <AuthForm type="signup" />
    </main>
  );
}
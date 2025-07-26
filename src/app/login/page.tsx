import AuthForm from "@/components/AuthForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-8">
      <AuthForm type="login" />
    </main>
  );
}
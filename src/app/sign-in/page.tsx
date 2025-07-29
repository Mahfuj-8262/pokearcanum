// import AuthForm from "@/components/AuthForm";

// export default function LoginPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center py-8">
//       <AuthForm type="login" />
//     </main>
//   );
// }

import AuthForm from "@/components/AuthForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400">
      <AuthForm type="login" />
    </div>
  );
}
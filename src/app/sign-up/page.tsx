// import AuthForm from "@/components/AuthForm";

// export default function SignupPage() {
//   return (
//     <main className="min-h-screen flex flex-col items-center justify-center py-8">
//       <AuthForm type="signup" />
//     </main>
//   );
// }

import AuthForm from "@/components/AuthForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-200 via-red-300 to-pink-400">
      <AuthForm type="signup" />
    </div>
  );
}
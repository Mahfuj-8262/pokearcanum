// app/trades/page.tsx
"use client";

import { Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import TradesClient from "@/components/TradesClient";

export default function TradesPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen py-12">
        <Suspense fallback={<div className="p-8 text-center">Loading trades...</div>}>
          <TradesClient />
        </Suspense>
      </main>
    </ProtectedRoute>
  );
}
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";

const USER_COUNT = 2389;
const tradeData = Array.from({ length: 30 }).map((_, i) => ({
  day: `${i + 1}`,
  trades: Math.floor(Math.random() * 80 + 20)
}));
const lastTransactions = [
  { user: "Ash", card: "Pikachu" },
  { user: "Misty", card: "Staryu" },
  { user: "Brock", card: "Onix" },
  { user: "Tracey", card: "Scyther" },
  { user: "Gary", card: "Eevee" }
];

export default function DashboardStats() {
  return (
    <section className="w-full flex flex-col md:flex-row gap-8 mt-10" >
      {/* Users */}
      <Card className="flex-1 shadow bg-amber-300">
        <CardHeader>
          <CardTitle>Total Users</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center py-8">
          <span className="text-5xl font-extrabold text-stone-600">{USER_COUNT}</span>
          <span className="text-gray-500 mt-2">and growing!</span>
        </CardContent>
      </Card>
      {/* Graph */}
      <Card className="flex-1 shadow bg-amber-300">
        <CardHeader>
          <CardTitle>Trades - Last 30 Days</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={tradeData}>
              <XAxis dataKey="day" hide />
              <YAxis domain={[0, 'dataMax + 20']} hide />
              <Line type="monotone" dataKey="trades" stroke="#1014eeff" dot={false} strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* Last 5 Transactions */}
      <Card className="flex-1 shadow bg-amber-300">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {lastTransactions.map((t, i) => (
              <li key={i} className="mb-2 flex justify-between">
                <span className="font-semibold text-blue-900">{t.user}</span>
                <span className="text-gray-700">{t.card}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
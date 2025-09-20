"use client";

import { useState } from "react";
import { FaIdCard, FaIdBadge, FaExchangeAlt } from "react-icons/fa";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { refreshAccessToken, updateProfile } from "@/lib/api";
// import { updateProfile } from "@/lib/api"; // we'll define this endpoint call

export default function ProfilePage() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    userName: user?.userName || "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSave = async () => {
    if (form.newPassword !== form.confirmNewPassword) {
      setMsg("Oops! New password and confirm password do not match!");
      return;
    }
    try {
      setLoading(true);
      await updateProfile({
        userName: form.userName,
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      const refreshed = await refreshAccessToken();
      if (refreshed?.accessToken) {
        window.location.reload();
      }

      setMsg("Profile updated successfully!");
      setEditing(false);
    } catch (err: any) {
      setMsg(`Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-50 to-fuchsia-100 flex items-center justify-center py-12 px-3">
        <div className="w-full max-w-2xl bg-gradient-to-br from-white via-yellow-50 to-rose-50 border-4 border-yellow-300 rounded-[2.5rem] shadow-2xl flex flex-col items-center py-10 px-4 md:px-8 relative">
          
          {/* HEADER */}
          <div className="flex flex-col items-center w-full mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold mt-1 tracking-wide text-center text-zinc-800 drop-shadow">
              {user?.userName}
            </h1>
            <span className="text-md font-mono text-zinc-600">{user?.email}</span>
            <button
              onClick={() => setEditing(!editing)}
              className="mt-3 px-4 py-1 text-sm rounded bg-yellow-400 text-white font-bold hover:bg-yellow-500 transition"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          <div className="flex flex-row gap-4 md:gap-12 mt-7 mb-3 justify-center w-full">
            <div className="flex flex-col items-center bg-yellow-100 border border-yellow-200 rounded-xl px-6 py-2 shadow">
              <FaIdCard className="text-yellow-400 text-xl mb-1" />
              <span className="text-yellow-700 font-bold text-xl">--</span>
              <div className="text-gray-500 tracking-wide text-xs font-medium">Cards</div>
            </div>
            <div className="flex flex-col items-center bg-indigo-100 border border-indigo-200 rounded-xl px-6 py-2 shadow">
              <FaExchangeAlt className="text-indigo-400 text-xl mb-1" />
              <span className="text-indigo-700 font-bold text-xl">--</span>
              <div className="text-gray-500 tracking-wide text-xs font-medium">Trades</div>
            </div>
            <div className="flex flex-col items-center bg-amber-100 border border-amber-200 rounded-xl px-6 py-2 shadow">
              <FaIdBadge className="text-amber-400 text-xl mb-1" />
              <span className="text-amber-700 font-bold text-xl">--</span>
              <div className="text-gray-500 tracking-wide text-xs font-medium">Avg. Rating</div>
            </div>
          </div>

          {/* EDIT FORM */}
          {editing && (
            <div className="w-full mt-6 bg-white/90 rounded-xl border border-yellow-200 shadow p-6 flex flex-col gap-4">
                            <input
                type="text"
                name="userName"
                placeholder="Username"
                value={form.userName}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded bg-yellow-50"
              />
              <input
                type="password"
                name="currentPassword"
                placeholder="Current Password"
                value={form.currentPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New Password"
                value={form.newPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <input
                type="password"
                name="confirmNewPassword"
                placeholder="Confirm New Password"
                value={form.confirmNewPassword}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
              <button
                type="button"
                onClick={handleSave}
                disabled={loading}
                className="bg-yellow-400 text-white px-5 py-2 rounded font-bold hover:bg-yellow-500 transition"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              {msg && (
                <div className="text-center text-sm mt-2">
                  {msg.startsWith("✅") ? (
                    <span className="text-green-600 font-semibold">{msg}</span>
                  ) : (
                    <span className="text-red-600 font-semibold">{msg}</span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </ProtectedRoute>
  );
}
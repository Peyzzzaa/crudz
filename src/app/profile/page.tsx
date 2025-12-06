"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken, logoutUser } from "@/lib/auth";
import { API_BASE } from "@/lib/config";
import { SunMoon } from "lucide-react";

type UserProfile = {
  username: string;
  email?: string;
  fullName?: string;
  position?: string;
  createdAt?: string;
};

type Position = {
  position_id?: number;
  position_code: string;
  position_name: string;
  created_at?: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [clearMode, setClearMode] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch profile
    fetch(`${API_BASE}/profile`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (res.status === 401) {
          logoutUser();
          router.push("/login");
        }
        return res.json();
      })
      .then((data) => setProfile(data))
      .catch((err) => setError(err.message));

    // Fetch positions
    fetch(`${API_BASE}/positions`, {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setPositions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-200">
        Loading profile…
      </div>
    );
  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-200">
        Error: {error}
      </div>
    );

  return (
    <div
      className={`min-h-screen flex flex-col p-6 relative ${
        clearMode ? "bg-gray-50 text-black" : "text-red-200"
      }`}
      style={{ backgroundImage: clearMode ? "none" : "url('/red.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => router.push("/dashboard")}
        className={`absolute top-6 left-6 px-4 py-2 rounded-lg font-bold transition ${
          clearMode ? "bg-gray-200 text-black hover:bg-gray-300" : "bg-black/50 hover:bg-red-600"
        }`}
      >
        BACK
      </button>

      {/* CLEAR MODE ICON */}
      <button
        onClick={() => setClearMode(!clearMode)}
        className={`absolute top-6 right-6 p-2 rounded-lg transition ${
          clearMode ? "bg-gray-200 hover:bg-gray-300" : "bg-black/50 hover:bg-red-600"
        }`}
        title="Toggle Clear Mode"
      >
        <SunMoon size={24} />
      </button>

      <div className="flex flex-col md:flex-row gap-10 mt-16">
        {/* PROFILE INFO */}
        <div
          className={`md:w-1/3 rounded-2xl p-8 shadow-xl flex flex-col items-center ${
            clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/40 border border-red-600"
          }`}
        >
          <img
            src="/profile.png"
            alt="Profile"
            className={`w-32 h-32 rounded-full mb-4 object-cover border-4 ${
              clearMode ? "border-gray-400" : "border-red-600"
            }`}
          />
          <h1 className={`text-4xl font-bold mb-6 text-center ${clearMode ? "text-black" : "text-red-200"}`}>
            {profile?.username}
          </h1>
          <p className={clearMode ? "text-black mb-2" : "mb-2"}><strong>Full Name:</strong> KARRYL FAYE C. ARANEZ </p>
          <p className={clearMode ? "text-black mb-2" : "mb-2"}><strong>Birthdate:</strong> February 18, 2006</p>
          <p className={clearMode ? "text-black mb-2" : "mb-2"}><strong>Civil Status:</strong> Single </p>
          <p className={clearMode ? "text-black mb-2" : "mb-2"}><strong>Position:</strong> President </p>
        </div>

        {/* POSITION HISTORY */}
        <div
          className={`md:w-2/3 rounded-2xl p-6 shadow-xl overflow-x-auto ${
            clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/40 border border-red-600"
          }`}
        >
          <h2 className={`text-2xl font-bold mb-4 ${clearMode ? "text-black" : "text-red-100"}`}>Position History</h2>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`${clearMode ? "bg-gray-200 text-black border-gray-400" : "bg-black/50 text-red-300 border-red-700"}`}>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Code</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => (
                <tr key={p.position_id} className={`hover:bg-red-700/20 transition ${clearMode ? "bg-gray-200" : ""}`}>
                  <td className="px-4 py-2">{p.position_id}</td>
                  <td className="px-4 py-2">{p.position_code}</td>
                  <td className="px-4 py-2">{p.position_name}</td>
                  <td className="px-4 py-2">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })
                      : "—"}
                  </td>
                </tr>
              ))}
              {positions.length === 0 && (
                <tr>
                  <td colSpan={4} className={`text-center py-4 ${clearMode ? "text-black/70" : "text-red-300"}`}>
                    No positions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

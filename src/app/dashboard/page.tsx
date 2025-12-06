"use client";

import React, { useEffect, useState } from "react";
import { getToken, logoutUser } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { API_BASE } from "@/lib/config";

import {
  LogOut,
  RotateCcw,
  UserCircle,
  Settings,
  SunMoon,
  User,
  Pencil,
  Trash2,
} from "lucide-react";

interface Position {
  position_id?: number;
  position_code: string;
  position_name: string;
  created_at?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false); // Client-only flag

  const [positions, setPositions] = useState<Position[]>([]);
  const [globalLoading, setGlobalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slowInternet, setSlowInternet] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clearMode, setClearMode] = useState(false);

  const [positionCode, setPositionCode] = useState("");
  const [positionName, setPositionName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [shake, setShake] = useState(false);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    open: boolean;
    id: number | null;
  }>({ open: false, id: null });

  const username = "fritz";

  useEffect(() => {
    setIsClient(true); // mark component as mounted on client

    if (!getToken()) {
      logoutUser();
      router.push("/login");
    } else {
      fetchPositions();
    }
  }, []);

  function authHeaders() {
    const token = getToken();
    return {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
    };
  }

  function startLoader() {
    setGlobalLoading(true);
    setSlowInternet(false);
    return setTimeout(() => setSlowInternet(true), 2500);
  }

  function stopLoader(timer: NodeJS.Timeout) {
    clearTimeout(timer);
    setGlobalLoading(false);
    setSlowInternet(false);
  }

  async function fetchPositions() {
    const timer = startLoader();

    try {
      const res = await fetch(`${API_BASE}/positions`, { headers: authHeaders() });

      if (res.status === 401) {
        logoutUser();
        router.push("/login");
        return;
      }

      if (!res.ok) throw new Error("Failed to load data.");

      const data = await res.json();
      setPositions(data);
    } catch (err: any) {
      setError(err.message);
      triggerShake();
    } finally {
      stopLoader(timer);
    }
  }

  function triggerShake() {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }

  async function handleCreateOrUpdate(e: React.FormEvent) {
    e.preventDefault();

    const payload = { position_code: positionCode, position_name: positionName };
    const timer = startLoader();

    try {
      let res: Response;

      if (editingId) {
        res = await fetch(`${API_BASE}/positions/${editingId}`, {
          method: "PUT",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${API_BASE}/positions`, {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) throw new Error("Save failed.");

      setPositionCode("");
      setPositionName("");
      setEditingId(null);

      await fetchPositions();
    } catch (err: any) {
      triggerShake();
      setError(err.message);
    } finally {
      stopLoader(timer);
    }
  }

  async function confirmDelete() {
    if (!deleteConfirm.id) return;
    const id = deleteConfirm.id;
    const timer = startLoader();

    try {
      const res = await fetch(`${API_BASE}/positions/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      });

      if (!res.ok) throw new Error("Delete failed.");

      setDeleteConfirm({ open: false, id: null });
      await fetchPositions();
    } catch (err: any) {
      triggerShake();
      setError(err.message);
    } finally {
      stopLoader(timer);
    }
  }

  function handleLogout() {
    logoutUser();
    router.push("/login");
  }

  if (!isClient) return null; // prevent SSR/hydration mismatch

  return (
    <div
      className={`min-h-screen w-full p-10 font-sans relative ${
        clearMode ? "bg-gray-50 text-black" : "text-white bg-cover bg-center"
      }`}
      style={{ backgroundImage: clearMode ? "none" : "url('/red.jpg')" }}
    >
      {/* GLOBAL LOADER */}
      {globalLoading && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-xl flex flex-col items-center justify-center z-50">
          <div className="w-20 h-20 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-6 text-red-300 text-xl font-bold animate-pulse">
            {slowInternet ? "Slow Internet Detected…" : "Loading…"}
          </p>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm.open && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg flex items-center justify-center animate-fadeIn">
          <div
            className={`p-8 w-[350px] shadow-2xl rounded-2xl ${
              clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/80 border border-red-600"
            } animate-scaleIn`}
          >
            <h2 className={`text-xl font-bold mb-4 ${clearMode ? "text-black" : "text-red-200"}`}>
              Delete Position?
            </h2>
            <p className={clearMode ? "text-black/70 mb-6" : "text-red-300 mb-6"}>
              Are you sure you want to delete this position? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteConfirm({ open: false, id: null })}
                className={`px-4 py-2 rounded-lg border ${
                  clearMode ? "border-gray-400 text-black hover:bg-gray-200" : "border-red-400 text-red-300 hover:bg-red-700/40"
                } transition`}
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className={`px-4 py-2 rounded-lg font-bold ${
                  clearMode ? "bg-red-500 text-white hover:bg-red-400" : "bg-red-600 hover:bg-red-500"
                } transition`}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <header className="flex justify-between items-center mb-10 z-20 relative">
        <h1 className={`text-2xl font-extrabold drop-shadow-lg ${clearMode ? "text-black" : "text-red-200"}`}>
          Welcome, {username}!
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={fetchPositions}
            className={`px-4 py-2 rounded-xl border flex items-center gap-2 shadow-lg transition ${
              clearMode ? "bg-gray-200 border-gray-400 text-black hover:bg-gray-300" : "bg-black/40 border-red-600 text-white hover:bg-red-600"
            }`}
          >
            <RotateCcw size={18} /> Refresh
          </button>

          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition ${
                clearMode ? "bg-gray-200 border border-gray-400 text-black hover:bg-gray-300" : "bg-black/60 border border-red-600 text-white hover:bg-red-600"
              }`}
            >
              <UserCircle size={28} />
            </button>

            {dropdownOpen && (
              <div
                className={`absolute right-0 mt-3 w-48 rounded-xl shadow-xl p-3 backdrop-blur-lg animate-fadeIn ${
                  clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/70 border border-red-600"
                }`}
              >
                <button
                  onClick={() => router.push("/profile")}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-700/40 transition ${
                    clearMode ? "text-black hover:bg-gray-200" : "text-white"
                  }`}
                >
                  <User size={16} /> Profile
                </button>

                <button
                  onClick={() => alert("NEXT TIME ;>")}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-700/40 transition ${
                    clearMode ? "text-black hover:bg-gray-200" : "text-white"
                  }`}
                >
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={() => setClearMode(!clearMode)}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-700/40 transition ${
                    clearMode ? "text-black hover:bg-gray-200" : "text-white"
                  }`}
                >
                  <SunMoon size={16} /> Clear Mode
                </button>

                <button
                  onClick={handleLogout}
                  className={`flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-red-700/40 transition ${
                    clearMode ? "text-black hover:bg-gray-200" : "text-white"
                  }`}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TITLE */}
      <h1 className={`text-5xl font-extrabold text-center mb-12 drop-shadow-2xl animate-bounce ${
        clearMode ? "text-black" : "text-red-100"
      }`}>
        POSITIONS DASHBOARD
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* CREATE FORM */}
        <section className={`md:col-span-1 rounded-2xl p-6 shadow-2xl ${shake ? "animate-shake" : ""} ${clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/40 border border-red-600"}`}>
          <h2 className={`text-2xl font-bold mb-4 ${clearMode ? "text-black" : "text-red-200"}`}>
            {editingId ? "Edit Position" : "Create Position"}
          </h2>

          <form onSubmit={handleCreateOrUpdate} className="grid gap-6">
            <input
              className={`rounded-lg px-4 py-3 outline-none focus:ring-2 ${clearMode ? "bg-gray-200 text-black focus:ring-red-500" : "bg-black/30 text-white focus:ring-red-500"}`}
              placeholder="Position Code"
              value={positionCode}
              onChange={(e) => setPositionCode(e.target.value)}
              required
            />
            <input
              className={`rounded-lg px-4 py-3 outline-none focus:ring-2 ${clearMode ? "bg-gray-200 text-black focus:ring-red-500" : "bg-black/30 text-white focus:ring-red-500"}`}
              placeholder="Position Name"
              value={positionName}
              onChange={(e) => setPositionName(e.target.value)}
              required
            />

            <div className="flex gap-4">
              <button
                type="submit"
                className={`flex-1 py-3 rounded-lg font-bold transition ${clearMode ? "bg-red-500 text-white hover:bg-red-400" : "bg-red-600 hover:bg-red-500"}`}
              >
                {editingId ? "Update" : "Create"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className={`px-6 py-3 rounded-lg border-2 font-bold transition ${clearMode ? "border-gray-400 text-black hover:bg-gray-200 hover:text-black" : "border-red-400 text-red-300 hover:bg-red-500 hover:text-white"}`}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {error && <p className={clearMode ? "text-black/70 mt-4" : "text-red-300 mt-4"}>{error}</p>}
        </section>

        {/* TABLE */}
        <section className="md:col-span-2">
          <h2 className={`text-3xl font-extrabold mb-6 ${clearMode ? "text-black" : "text-red-100"}`}>Positions List</h2>

          <div className={`overflow-x-auto rounded-2xl shadow-2xl ${clearMode ? "bg-gray-100 border border-gray-400" : "bg-black/40 border border-red-600"}`}>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`${clearMode ? "bg-gray-200 text-black border-gray-400" : "bg-black/50 text-red-300 border-red-700"}`}>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Code</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Created At</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {positions.map((p, i) => (
                  <tr
                    key={p.position_id}
                    className={`hover:bg-red-700/20 transition ${clearMode ? (i % 2 === 0 ? "bg-gray-200" : "bg-gray-100") : i % 2 === 0 ? "bg-black/20" : "bg-black/30"}`}
                  >
                    <td className="px-6 py-4">{p.position_id}</td>
                    <td className="px-6 py-4">{p.position_code}</td>
                    <td className="px-6 py-4">{p.position_name}</td>
                    <td className="px-6 py-4 text-sm">
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
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => {
                            setEditingId(p.position_id ?? null);
                            setPositionCode(p.position_code);
                            setPositionName(p.position_name);
                          }}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${clearMode ? "bg-red-300/30 border border-red-400 hover:bg-red-300/50" : "bg-red-500/20 border border-red-400 hover:bg-red-500"}`}
                        >
                          <Pencil size={16} /> Edit
                        </button>

                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              open: true,
                              id: p.position_id ?? null,
                            })
                          }
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg transition ${clearMode ? "bg-red-500/20 border border-red-400 hover:bg-red-500/40" : "bg-red-900/20 border border-red-600 hover:bg-red-700"}`}
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {positions.length === 0 && (
                  <tr>
                    <td colSpan={5} className={`text-center py-12 ${clearMode ? "text-black/70" : "text-red-300"} text-lg`}>
                      No positions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes shake { 0% { transform: translateX(0px); } 25% { transform: translateX(-8px); } 50% { transform: translateX(8px); } 75% { transform: translateX(-8px); } 100% { transform: translateX(0px); } }
        .animate-shake { animation: shake 0.45s ease; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.35s ease-out; }
        @keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-scaleIn { animation: scaleIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}

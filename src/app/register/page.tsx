"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { API_BASE } from "@/lib/config";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, User, Lock, Calendar, Heart } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [civilStatus, setCivilStatus] = useState("");

  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!API_BASE) {
      setError("API Base URL is not set. Contact admin.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          birthdate,
          civil_status: civilStatus,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Account created successfully!");
      setTimeout(() => router.push("/login"), 1500);

    } catch {
      setError("Network slow or server unreachable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-black"
      style={{ backgroundImage: "url('/deed.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute top-4 right-4 text-right z-20">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-red-500 drop-shadow-lg">
          FIZZYYY
        </h1>
      </div>

      <div className="absolute top-19 left-20 w-[380px] md:w-[430px] xl:w-[450px] z-20">
        <div className="bg-black/85 backdrop-blur-md rounded-2xl shadow-2xl border border-red-700/60
                        p-8 md:p-10 animate-glow-red">
          <h2 className="text-center text-3xl font-bold text-red-500 drop-shadow">
            REGISTER
          </h2>
          <p className="text-center text-gray-300 text-md mb-6">
            Create your account
          </p>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-black/40 text-white rounded-xl border border-red-700/40 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <User className="absolute left-3 top-3 text-red-500" size={18} />
            </div>

            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 pl-11 pr-10 bg-black/40 text-white rounded-xl border border-red-700/40 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <Lock className="absolute left-3 top-3 text-red-500" size={18} />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-3 text-red-400"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative">
              <input
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-black/40 text-white rounded-xl border border-red-700/40 focus:ring-2 focus:ring-red-500 outline-none"
                required
              />
              <Calendar className="absolute left-3 top-3 text-red-500" size={18} />
            </div>

            <div className="relative">
              <select
                value={civilStatus}
                onChange={(e) => setCivilStatus(e.target.value)}
                className="w-full px-4 py-3 pl-11 bg-black/40 text-white rounded-xl border border-red-700/40 focus:ring-2 focus:ring-red-500 outline-none"
                required
              >
                <option value="">Select civil status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
                <option value="widowed">Widowed</option>
              </select>
              <Heart className="absolute left-3 top-3 text-red-500" size={18} />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            {success && <p className="text-green-400 text-sm text-center">{success}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-red-700 text-white hover:bg-red-800 py-6 rounded-xl text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Register"}
            </Button>
          </form>

          <div className="mt-4 text-center">
            <button
              className="text-gray-300 hover:text-red-400 underline"
              onClick={() => router.push("/login")}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="loader"></div>
        </div>
      )}

      <style>
        {`
        @keyframes glowRed {
          0% { box-shadow: 0 0 8px rgba(255,0,0,0.4); }
          50% { box-shadow: 0 0 18px rgba(255,0,0,0.9); }
          100% { box-shadow: 0 0 8px rgba(255,0,0,0.4); }
        }

        .animate-glow-red {
          animation: glowRed 2s infinite ease-in-out;
        }

        .loader {
          width: 60px;
          height: 60px;
          border: 6px solid rgba(255, 0, 0, 0.3);
          border-top-color: red;
          border-radius: 50%;
          animation: spin 0.9s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        `}
      </style>
    </div>
  );
}

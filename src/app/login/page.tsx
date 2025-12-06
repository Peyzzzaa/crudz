"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { saveToken } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { API_BASE } from "@/lib/config";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import Link from "next/link";

type LoginResponse = {
  accessToken?: string;
  message?: string;
};

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [slow, setSlow] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSlow(false);

    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password.");
      return;
    }

    if (!API_BASE) {
      setError("API Base URL is not set. Contact admin.");
      return;
    }

    setLoading(true);
    const slowTimer = setTimeout(() => setSlow(true), 3500);

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      clearTimeout(slowTimer);

      const data: LoginResponse = await res.json();

      if (!res.ok || !data.accessToken) {
        setError(data.message || "Invalid username or password.");
        setLoading(false);
        return;
      }

      saveToken(data.accessToken);
      router.push("/dashboard");
    } catch {
      clearTimeout(slowTimer);
      setError("Server unreachable. Try again later.");
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center bg-black pointer-events-none"
      style={{ backgroundImage: "url('/deed.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>

      <div className="absolute top-4 right-4 text-right z-20 pointer-events-auto">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-red-500 drop-shadow-lg">
          FIZZYYY
        </h1>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 left-20 w-[380px] md:w-[420px] xl:w-[450px] z-20 pointer-events-auto">
        <div className="bg-black/85 backdrop-blur-md rounded-2xl shadow-2xl border border-red-600/60 p-8 md:p-10 animate-glow-red">
          {!loading ? (
            <>
              <h2 className="text-center text-4xl font-bold text-red-500 drop-shadow">
                Welcome Soldier!
              </h2>
              <p className="text-center text-gray-300 text-md mb-6">
                Login to continue
              </p>

              <form onSubmit={handleLogin} className="space-y-5 pointer-events-auto">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 pl-11 bg-black/40 border border-red-600/40 rounded-xl text-white focus:ring-2 focus:ring-red-600 outline-none"
                  />
                  <User className="absolute left-3 top-3 text-red-500" size={18} />
                </div>

                <div className="relative">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pl-11 pr-10 bg-black/40 border border-red-600/40 rounded-xl text-white focus:ring-2 focus:ring-red-600 outline-none"
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

                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <Button
                  className="w-full bg-red-600 hover:bg-red-700 py-4 rounded-xl text-lg font-semibold text-white"
                  type="submit"
                >
                  Sign In
                </Button>
              </form>

              <div className="mt-4 text-center pointer-events-auto">
                <Link
                  href="/register"
                  className="text-red-400 hover:text-red-300 underline"
                >
                  Create an account
                </Link>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 animate-fade-in pointer-events-auto">
          <div className="loader"></div>
          <p className="text-gray-300 mt-5 text-xl tracking-wide">
            Logging in...
          </p>
          {slow && (
            <p className="text-yellow-400 mt-3 text-sm">
              ⚠ Slow Internet Detected or Server Waking Up...
            </p>
          )}
        </div>
      )}

      <style>
        {`
          @keyframes glowRed {
            0% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
            50% { box-shadow: 0 0 20px rgba(255,0,0,1); }
            100% { box-shadow: 0 0 10px rgba(255,0,0,0.4); }
          }
          .animate-glow-red { animation: glowRed 2s infinite; }

          @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }

          .loader {
            width: 65px;
            height: 65px;
            border: 6px solid rgba(255,0,0,0.3);
            border-top-color: red;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          @keyframes spin { to { transform: rotate(360deg); } }
        `}
      </style>
    </div>
  );
}

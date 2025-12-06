"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  // Prevent hydration errors
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check slow internet AFTER hydration
  useEffect(() => {
    if (!mounted) return;

    const connection = (navigator as any).connection;

    const checkSpeed = () => {
      if (connection) {
        const slow =
          connection.downlink < 1 ||
          connection.effectiveType === "2g" ||
          connection.effectiveType === "slow-2g";

        setShowLoader(slow);
      }
    };

    checkSpeed();
    connection?.addEventListener("change", checkSpeed);

    return () => connection?.removeEventListener("change", checkSpeed);
  }, [mounted]);

  // prevent SSR mismatch by not rendering until mounted
  if (!mounted) return null;

  return (
    <>
      {/* FULL SCREEN LOADER */}
      {showLoader && (
        <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[999] text-white animate-fadeIn">
          <div className="w-28 h-28 rounded-full border-4 border-red-600 animate-ping mb-6"></div>

          <h1 className="text-2xl font-bold text-red-400 tracking-wide animate-pulse">
            Loading…
          </h1>
          <p className="text-red-300 mt-2 text-sm opacity-80">
            Slow Internet Detected
          </p>
        </div>
      )}

      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex items-center justify-start text-white overflow-hidden flex-col pt-20"
        style={{
          backgroundImage: "url('/red.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[rgba(150,0,0,0.65)] backdrop-blur-sm"></div>

        {/* FLOAT ANIMATION */}
        <style>{`
          @keyframes floatFade {
            0% { opacity: 0.35; transform: translateY(0px); }
            50% { opacity: 0.75; transform: translateY(-10px); }
            100% { opacity: 0.35; transform: translateY(0px); }
          }
        `}</style>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center">
          <h1
            className="text-red-500 text-[70px] md:text-[150px] font-extrabold tracking-tight select-none"
            style={{ animation: "floatFade 2s ease-in-out infinite" }}
          >
            KARRYL FAYE
          </h1>

          <h1
            className="text-[60px] md:text-[130px] font-extrabold tracking-tight select-none text-red-200 -mt-4"
            style={{ animation: "floatFade 3s ease-in-out infinite" }}
          >
            ARANEZ
          </h1>

          {/* BUTTONS */}
          <div className="flex gap-3 mt-1">
            <Link
              href="/login"
              className="px-10 py-4 rounded-xl text-lg font-semibold bg-red-600 text-white
                shadow-[0_0_25px_rgba(255,0,0,0.5)]
                hover:shadow-[0_0_35px_rgba(255,0,0,0.8)]
                hover:scale-105 transition-all duration-300"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-10 py-4 rounded-xl text-lg font-semibold bg-red-600 text-white
                shadow-[0_0_25px_rgba(255,0,0,0.5)]
                hover:shadow-[0_0_35px_rgba(255,0,0,0.8)]
                hover:scale-105 transition-all duration-300"
            >
              Register
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

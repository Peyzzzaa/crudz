"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          backgroundImage: "url('/bg2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/50" />

        {/* SPARK PARTICLES */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <span
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full opacity-70 animate-spark"
              style={{
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                animationDelay: Math.random() * 3 + "s",
                animationDuration: 2 + Math.random() * 3 + "s",
              }}
            />
          ))}
        </div>

        {/* CUSTOM ANIMATIONS */}
        <style>
          {`
            /* Fade & slide animations */
            @keyframes fadeSlideDown {
              0% { opacity: 0; transform: translateY(-20px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            @keyframes fadeSlideUp {
              0% { opacity: 0; transform: translateY(20px); }
              100% { opacity: 1; transform: translateY(0); }
            }

            /* Glow animation */
            @keyframes glowPulse {
              0% { text-shadow: 0 0 25px rgba(255,80,80,0.5); }
              50% { text-shadow: 0 0 50px rgba(255,0,0,1); }
              100% { text-shadow: 0 0 25px rgba(255,80,80,0.5); }
            }

            /* Floating bounce (like your portfolio) */
            @keyframes floatUpDown {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-20px); }
            }

            /* Spark particles floating upward */
            @keyframes spark {
              0% { transform: translateY(0) scale(1); opacity: 0.8; }
              100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
            }
            .animate-spark {
              animation: spark linear infinite;
            }
          `}
        </style>



        {/* CENTER CONTENT */}
        <div className="relative z-20 flex flex-col items-center text-center px-4">

          {/* SUBTITLE */}
          <p
            className="text-lg md:text-xl opacity-90 mb-3 tracking-wide"
            style={{ animation: "fadeSlideDown 1s ease forwards" }}
          >
            Karryl Faye C. Aranez Topup Store
          </p>

          {/* MAIN TITLE — FLOATING UP/DOWN */}
          <h1
            className="text-5xl md:text-7xl font-extrabold tracking-tight"
            style={{
              animation: `
                fadeSlideDown 1.4s ease forwards,
                floatUpDown 4s ease-in-out infinite,
                glowPulse 3s ease-in-out infinite
              `,
            }}
          >
            CALL OF DUTY STORE
          </h1>

          {/* DESCRIPTION */}
          <p
            className="mt-4 max-w-xl text-base md:text-lg opacity-80"
            style={{ animation: "fadeSlideUp 1.7s ease forwards" }}
          >
            Top-tier skins, characters, and weapon bundles available for purchase.
            Designed for smooth UI and fast access.
          </p>

          {/* START BUTTON */}
          <Link href="/login">
            <button
              className="mt-8 px-8 py-4 text-lg font-semibold rounded-lg bg-red-600 hover:bg-red-700 transition-all shadow-[0_0_25px_rgba(255,0,0,0.7)] hover:shadow-[0_0_40px_rgba(255,0,0,1)]"
              style={{ animation: "fadeSlideUp 2s ease forwards" }}
            >
              START
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

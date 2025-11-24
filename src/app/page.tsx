import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* --- NAVIGATION BAR --- */}
      <nav className="w-full fixed top-0 left-0 z-50 flex justify-center py-6">
        <ul className="flex gap-6 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10">

          <li>
            <Link
              href="/"
              className="px-5 py-2 rounded-full bg-pink-400 text-black font-semibold shadow-md hover:bg-pink-300 transition"
            >
              HOME
            </Link>
          </li>

          <li>
            <Link
              href="/about"
              className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition"
            >
              ABOUT
            </Link>
          </li>

          <li>
            <Link
              href="/education"
              className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition"
            >
              EDUCATION
            </Link>
          </li>

          <li>
            <Link
              href="/hobbies"
              className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition"
            >
              HOBBIES
            </Link>
          </li>

          <li>
            <Link
              href="/contact"
              className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition"
            >
              CONTACT
            </Link>
          </li>

        </ul>
      </nav>

      {/* --- HERO SECTION --- */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(255,43,117,0.8) 0%, rgba(10,10,10,0.8) 70%), url(/bg1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* ANIMATION */}
        <style>
          {`
            @keyframes floatFade {
              0% { opacity: 0.2; transform: translateY(0px); }
              50% { opacity: 0.5; transform: translateY(-12px); }
              100% { opacity: 0.2; transform: translateY(0px); }
            }
          `}
        </style>

        {/* KARRYL FAYE — ALL PINK */}
        <h1
          className="absolute top-20 text-pink-500 text-[90px] md:text-[160px] font-extrabold tracking-tight select-none opacity-70"
          style={{ animation: "floatFade 2s ease-in-out infinite" }}
        >
          KARRYL FAYE
        </h1>

        {/* ARAÑEZ — PINK */}
        <h1
          className="absolute top-[33%] text-[80px] md:text-[150px] font-extrabold tracking-tight select-none text-white-500 opacity-70"
          style={{ animation: "floatFade 3s ease-in-out infinite" }}
        >
          ARANEZ
        </h1>

        {/* IMAGE */}
        <div className="absolute bottom-0 z-20">
          <img
            src="/picko.png"
            alt="Karryl Faye"
            className="w-[300px] md:w-[510px] drop-shadow-[0_0_40px_rgba(255,0,150,0.5)]"
          />
        </div>
      </section>
    </>
  );
}

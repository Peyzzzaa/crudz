"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hobbies() {
  const hobbies = [
    { id: 1, title: "BADMINTON", img: "/hobby2.jfif" },
    { id: 2, title: "GAMING", img: "/gaming.jfif" },
    { id: 3, title: "ATHLETICS", img: "/hobby5.jfif" },
    { id: 4, title: "EATING", img: "/hobby1.jfif" },
    { id: 5, title: "TRAVELING", img: "/travel.jfif" },
    { id: 6, title: "COLLECTING", img: "/hot.jpg" },
    { id: 7, title: "ROADTRIP", img: "/road.jfif" },
    { id: 8, title: "NATURETRIP", img: "/nature.jfif" },
    { id: 9, title: "GYM", img: "/gym.jfif" },
  ];

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className="w-full fixed top-0 left-0 z-50 flex justify-center py-6">
        <ul className="flex gap-6 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10">
          <li><Link href="/" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOME</Link></li>
          <li><Link href="/about" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">ABOUT</Link></li>
          <li><Link href="/education" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">EDUCATION</Link></li>
          <li><Link href="/hobbies" className="px-5 py-2 rounded-full bg-pink-400 text-black font-semibold shadow-md hover:bg-pink-300 transition">HOBBIES</Link></li>
          <li><Link href="/contact" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">CONTACT</Link></li>
        </ul>
      </nav>

      {/* PAGE CONTENT */}
      <section
        className="min-h-screen w-full pt-32 pb-24 px-6 md:px-24 text-white"
        style={{
          background: "linear-gradient(160deg, rgba(255,43,117,0.85) 0%, rgba(10,10,10,0.95) 75%)",
        }}
      >
        {/* ANIMATED TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center text-[45px] md:text-[55px] font-extrabold tracking-wide mb-12"
        >
          MY HOBBIES
        </motion.h1>

        {/* HOBBY CARDS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {hobbies.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl 
              hover:scale-105 transition transform duration-300 hover:bg-white/10"
            >
              <div className="w-full h-72 relative overflow-hidden rounded-xl">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-110 transition duration-500"
                />
              </div>

              <p className="text-center mt-4 text-xl font-bold tracking-wide">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Education() {
  const [flipped, setFlipped] = useState<number | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  const cards = [
    {
      id: 2,
      title: "JUNIOR HIGH SCHOOL",
      img: "/jhs.jfif",
      award: "With Honors",
      school: "Magarao National High School – 2018-2024",
      achievements: [
        "With Honors (Consistent)",
        "SSG Officer",
        "School Journalism Contestant",
        "Perfect Attendance Award",
      ],
    },
    {
      id: 3,
      title: "SENIOR HIGH SCHOOL",
      img: "/shs.jfif",
      course: "Computer System Servicing",
      award: "With High Honors",
      school: "AMA Computer Learning Center – 2022–2024",
      achievements: ["With High Honors", "Best in CSS", "Member CTC", "Best in Gown"],
    },
    {
      id: 4,
      title: "COLLEGE",
      img: "/college.jfif",
      course: "BS Information Technology",
      award: "With Honor (GWA: 1.46)",
      school: "Naga College Foundation – 2024–Present",
      achievements: ["GWA: 1.46", "MAY DOS"],
    },
  ];

  return (
    <>
      {/* NAV */}
      <nav className="w-full fixed top-0 left-0 z-50 flex justify-center py-6">
        <ul className="flex gap-6 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/10 shadow-md">
          <li><Link href="/" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOME</Link></li>
          <li><Link href="/about" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">ABOUT</Link></li>
          <li><Link href="/education" className="px-5 py-2 rounded-full bg-pink-400 text-black font-semibold shadow-md">EDUCATION</Link></li>
          <li><Link href="/hobbies" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOBBIES</Link></li>
          <li><Link href="/contact" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">CONTACT</Link></li>
        </ul>
      </nav>

      {/* PAGE */}
      <section
        className="min-h-screen w-full text-white px-6 md:px-16 pt-40 pb-20"
        style={{
          background: "linear-gradient(160deg, rgba(255,43,117,0.80) 0%, rgba(8,10,20,0.95) 70%)",
        }}
      >
        <h1
          className={`text-5xl font-extrabold text-center mb-14 transition-all duration-1000
            ${show ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
        >
          MY EDUCATION
        </h1>

        {/* CARDS */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((c, index) => (
            <div
              key={c.id}
              className={`relative w-full h-[520px] transition-all duration-700
                ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
              style={{ transitionDelay: `${index * 200}ms`, perspective: "1000px" }}
              onMouseEnter={() => setFlipped(c.id)}
              onMouseLeave={() => setFlipped(null)}
              onClick={() => setFlipped(flipped === c.id ? null : c.id)}
            >
              {/* FLIP CONTAINER */}
              <div
                className={`relative w-full h-full transition-transform duration-[900ms]`}
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped === c.id ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden bg-[#081018] border border-pink-500/30 shadow-2xl p-0"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="h-[360px] w-full overflow-hidden">
                    <img
                      src={c.img}
                      alt={c.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h2 className="text-xl font-bold">{c.title}</h2>
                    <p className="text-pink-300 font-medium text-sm mt-2">{c.course}</p>
                    <p className="text-white/80 text-sm">{c.award}</p>
                    <p className="text-white/60 text-xs mt-1">{c.school}</p>
                  </div>

                  <div className="absolute -bottom-1 left-4 right-4 h-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-80 rounded" />
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 rounded-xl bg-[#0b1220] border border-pink-400/30 shadow-2xl p-6"
                  style={{
                    transform: "rotateY(180deg)",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <h3 className="text-pink-300 text-lg font-semibold mb-3">
                    Achievements & Awards
                  </h3>

                  <ul className="list-disc pl-5 text-white/90 space-y-2">
                    {c.achievements.map((a, i) => (
                      <li key={i}>{a}</li>
                    ))}
                  </ul>

                  <div className="mt-6">
                    <p className="text-white/80 text-sm">School</p>
                    <p className="text-white/60 text-xs">{c.school}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

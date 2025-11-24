"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Contact() {
  const contacts = [
    {
      id: 1,
      title: "Karryl Faye",
      img: "/facebook.jfif",
      link: "https://www.facebook.com/share/1DNfaBhtR3/",
      body: "Connect with me through Facebook for updates, chats, and collaborations.",
    },
    {
      id: 2,
      title: "kfaranez@gbox.ncf.edu.ph",
      img: "/gmail.jfif",
      link: "mailto:kfaranez@gbox.ncf.edu.ph",
      body: "Send me an email for formal messages, school works, or project inquiries.",
    },
    {
      id: 3,
      title: "Peyzzzaa",
      img: "/github.jfif",
      link: "https://github.com",
      body: "Visit my GitHub to explore projects, code, and development progress.",
    },
  ];

  return (
    <>
      {/* NAVIGATION BAR */}
      <nav className="w-full fixed top-0 left-0 z-50 flex justify-center py-6">
        <ul className="flex gap-6 bg-white/10 backdrop-blur-xl px-10 py-3 rounded-full border border-white/20 shadow-lg shadow-black/30">
          <li><Link href="/" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOME</Link></li>
          <li><Link href="/about" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">ABOUT</Link></li>
          <li><Link href="/education" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">EDUCATION</Link></li>
          <li><Link href="/hobbies" className="px-5 py-2 rounded-full text-white hover:bg-white/20 transition">HOBBIES</Link></li>
          <li><Link href="/contact" className="px-5 py-2 rounded-full bg-pink-400 text-black font-semibold shadow-md hover:bg-pink-300 transition">CONTACT</Link></li>
        </ul>
      </nav>

      {/* CONTACT SECTION */}
      <section
        className="w-full min-h-screen text-white px-6 md:px-24 pt-40 pb-24"
        style={{
          background:
            "linear-gradient(140deg, rgba(255,43,117,0.9) 0%, rgba(8,10,20,0.95) 65%)",
        }}
      >
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-[40px] md:text-[60px] font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-white drop-shadow-xl"
        >
          Let’s Connect ✨
        </motion.h1>

        {/* PARAGRAPH */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-center max-w-2xl mx-auto text-white/80 mt-4 text-lg leading-relaxed"
        >
          Whether it’s for collaboration, projects, or just a friendly chat—  
          I’d love to hear from you.
        </motion.p>

        {/* CONTACT CARDS */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.25 } },
          }}
        >
          {contacts.map((c) => (
            <motion.a
              key={c.id}
              href={c.link}
              target="_blank"
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative bg-white/10 border border-white/20 shadow-xl rounded-3xl p-7 backdrop-blur-xl 
              hover:scale-[1.05] hover:bg-white/20 transition transform duration-500 overflow-hidden"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/20 to-purple-500/10 opacity-0 hover:opacity-30 transition duration-700 rounded-3xl" />

              {/* TITLE + ICON */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <h3 className="text-xl font-extrabold text-pink-200 tracking-wide">
                  {c.title}
                </h3>
                <img
                  src={c.img}
                  className="w-12 h-12 rounded-full object-cover shadow-md ring-2 ring-white/40"
                  alt={c.title}
                />
              </div>

              {/* DESCRIPTION */}
              <p className="text-white/80 text-sm leading-relaxed relative z-10">
                {c.body}
              </p>

              {/* LINK ARROW */}
              <div className="mt-6 text-pink-200 font-semibold tracking-wide relative z-10">
                Open Contact →
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>
    </>
  );
}

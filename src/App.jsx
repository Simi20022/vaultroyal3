import React from "react";
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [entries, setEntries] = useState(0);
  const [freeTickets, setFreeTickets] = useState(0);
  const [memberLevel, setMemberLevel] = useState("None");
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizOpenFor, setQuizOpenFor] = useState(null);
  const [answer, setAnswer] = useState("");
  const [countdown, setCountdown] = useState("2d 14h 12m");

  const correctAnswer = "paris";

  const events = [
    { id: 0, title: "🏎️ Mercedes CLS 400d", ticketsSold: 789, maxTickets: 35000, price: 2.5 },
    { id: 1, title: "📱 iPhone 16 Pro Max", ticketsSold: 615, maxTickets: 6000, price: 2 },
    { id: 2, title: "🚘 BMW M5 Competition", ticketsSold: 972, maxTickets: 100000, price: 4 },
    { id: 3, title: "💶 Instant Cash 5000€", ticketsSold: 2110, maxTickets: 11000, price: 1.5 },
    { id: 4, title: "💶 Instant Cash 2000€", ticketsSold: 1125, maxTickets: 7000, price: 1.2 },
    { id: 5, title: "💶 Instant Cash 1000€", ticketsSold: 730, maxTickets: 5000, price: 1 }
  ];

  useEffect(() => {
    let level = "None";
    let bonus = 0;
    if (entries >= 100) { level = "Diamond"; bonus = 14; }
    else if (entries >= 50) { level = "Gold"; bonus = 7; }
    else if (entries >= 20) { level = "Silver"; bonus = 3; }
    setMemberLevel(level);
    setFreeTickets(bonus);
  }, [entries]);

  const handleParticipate = (id) => {
    if (!quizPassed) { setQuizOpenFor(id); return; }
    setEntries(prev => prev + 1);
    const title = typeof events[id].title === "string" ? events[id].title : "[Invalid prize]";
    alert(`✅ Ai participat la tombola ${title}`);
  };

  const handleQuizSubmit = () => {
    if (answer.trim().toLowerCase() === correctAnswer) {
      setQuizPassed(true);
      setQuizOpenFor(null);
      alert("✅ Răspuns corect! Acum poți participa.");
    } else alert("❌ Răspuns greșit. Încearcă din nou.");
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-black via-zinc-900 to-yellow-900 p-6 relative">
      {quizOpenFor !== null && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">🎓 Întrebare de cultură generală</h2>
          <p className="mb-2">Care este capitala Franței?</p>
          <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="px-4 py-2 text-black rounded mb-3" placeholder="Scrie răspunsul aici..." />
          <button onClick={handleQuizSubmit} className="bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 font-bold rounded">Trimite răspunsul</button>
        </div>
      )}

      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2 }} className="text-center mb-8">
        <motion.h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-orange-600 to-sky-400 drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">
          🎰 RoyalVault GiveWays
        </motion.h1>
        <p className="text-yellow-200 mt-2 font-medium">🎯 Extragere în: {countdown}</p>
      </motion.div>

      <div className="mb-6 text-center bg-black/40 p-4 rounded-xl border border-yellow-600 shadow-lg">
        <h3 className="text-yellow-400 text-xl font-bold">👤 Contul tău</h3>
        <p className="text-sm text-cyan-200">🎫 Tombole jucate: {entries}</p>
        <p className="text-sm text-lime-300">⭐ Nivel: {memberLevel} • 🎁 Bilete gratuite/săptămână: {freeTickets}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(events) && events.every(e => typeof e.title === 'string') && events.map((event) => (
          <motion.div key={event.id} whileHover={{ scale: 1.05 }} className="bg-zinc-800 p-4 rounded-lg border border-yellow-500 shadow-xl">
            <h2 className="text-xl font-bold text-yellow-300 mb-1">{event.title}</h2>
            <p className="text-sm text-cyan-400 mb-1">🎫 {event.ticketsSold.toLocaleString()} sold from {event.maxTickets.toLocaleString()}</p>
            <div className="w-full bg-zinc-700 h-2 rounded">
              <div className="bg-yellow-400 h-full rounded" style={{ width: `${(event.ticketsSold / event.maxTickets) * 100}%` }}></div>
            </div>
            <p className="mt-2 text-lime-300 font-semibold">💷 £{event.price.toFixed(2)} / ticket</p>
            <button className="mt-4 w-full bg-yellow-500 text-black font-bold py-2 px-4 rounded hover:bg-yellow-400" onClick={() => handleParticipate(event.id)}>
              🎟️ Participă la tombolă
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

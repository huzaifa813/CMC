"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Main() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6">
      <motion.h1
        className="text-5xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        🚀 Crypto DEX API Testing
      </motion.h1>
      <motion.p
        className="text-lg text-gray-400 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      >
        Explore decentralized exchange data in real time. Test liquidity,
        trading pairs, market shares, and more with the latest APIs.
      </motion.p>
    </div>
  );
}

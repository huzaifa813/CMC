import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          DEX API HUB
        </Link>
        <div className="flex space-x-4">
          <Link href="/cmc" className="hover:text-gray-400 transition">
            CoinMarketCap
          </Link>
          <Link href="/trading-view" className="hover:text-gray-400 transition">
            TradingView
          </Link>
          <Link href="/trading-forex" className="hover:text-gray-400 transition">
            ForexView
          </Link>
        </div>
      </div>
    </nav>
  );
}

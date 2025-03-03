"use client";

import { useEffect, useState } from "react";

export default function DexListings() {
  interface Dex {
    id: string;
    name: string;
    num_market_pairs: number;
    market_share: number;
    quote: {
      volume_24h: number;
      num_transactions_24h?: number;
    }[];
  }

  const [dexes, setDexes] = useState<Dex[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDexes() {
      try {
        const res = await fetch("/api/dex-listings");
        const data = await res.json();
        setDexes(data.data || []);
      } catch (err: unknown) {
        setError("Failed to fetch DEX listings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDexes();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        DEX Listings from CoinMarketCap
      </h1>
      <table className="w-full border-collapse border border-gray-800">
        <thead>
          <tr className="bg-gray-700">
            <th className="border p-2">Name</th>
            <th className="border p-2">Market Pairs</th>
            <th className="border p-2">Market Share</th>
            <th className="border p-2">24h Volume</th>
            <th className="border p-2">Transactions</th>
          </tr>
        </thead>
        <tbody>
          {dexes.map((dex) => (
            <tr key={dex.id} className="border">
              <td className="border p-2">{dex.name}</td>
              <td className="border p-2">{dex.num_market_pairs}</td>
              <td className="border p-2">
                {(dex.market_share * 100).toFixed(2)}%
              </td>
              <td className="border p-2">
                ${dex.quote[0]?.volume_24h.toLocaleString()}
              </td>
              <td className="border p-2">
                {dex.quote[0]?.num_transactions_24h?.toLocaleString() || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

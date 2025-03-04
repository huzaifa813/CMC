"use client";

import { useEffect, useState } from "react";

interface TokenLink {
  type: string;
  label?: string;
  url: string;
}

interface TokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  description: string;
  openGraph?: string;
  links: TokenLink[];
}

interface TokenBoost extends TokenProfile {
  amount: number;
  totalAmount: number;
}

export default function DexScreenerTokenData() {
  const [tokens, setTokens] = useState<TokenProfile[]>([]);
  const [boosts, setBoosts] = useState<TokenBoost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both token profiles and token boosts
        const [profilesRes, boostsRes] = await Promise.all([
          fetch("https://api.dexscreener.com/token-profiles/latest/v1"),
          fetch("https://api.dexscreener.com/token-boosts/latest/v1"),
        ]);

        if (!profilesRes.ok || !boostsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const [profilesData, boostsData] = await Promise.all([
          profilesRes.json(),
          boostsRes.json(),
        ]);

        // Ensure data is an array
        setTokens(Array.isArray(profilesData) ? profilesData : []);
        setBoosts(Array.isArray(boostsData) ? boostsData : []);

        
    } catch (err) {
        console.log(err)
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <p className="text-white text-center text-lg mt-6">Loading...</p>;
  if (error)
    return <p className="text-red-500 text-center text-lg mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">
        DexScreener Token Data
      </h1>

      {/* Token Profiles Section */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Token Profiles
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {tokens.length === 0 ? (
          <p className="text-gray-400 text-center w-full">
            No token profiles available.
          </p>
        ) : (
          tokens.map((token, index) => (
            <TokenCard key={`${token.tokenAddress}-${index}`} token={token} />
          ))
        )}
      </div>

      {/* Token Boosts Section */}
      <h2 className="text-2xl font-semibold mt-12 mb-4 text-center">
        Token Boosts
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {boosts.length === 0 ? (
          <p className="text-gray-400 text-center w-full">
            No token boosts available.
          </p>
        ) : (
          boosts.map((boost, index) => (
            <TokenCard
              key={`${boost.tokenAddress}-${index}`}
              token={boost}
              isBoost
            />
          ))
        )}
      </div>
    </div>
  );
}

// Token Card Component
function TokenCard({
  token,
  isBoost = false,
}: {
  token: TokenProfile | TokenBoost;
  isBoost?: boolean;
}) {
  return (
    <div className="bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
      <img
        src={token.header || "/placeholder.png"}
        alt={token.description}
        className="w-full h-36 object-cover rounded-lg mb-4"
      />
      <div className="flex items-center space-x-4">
        <img
          src={token.icon || "/placeholder-icon.png"}
          alt="Token Icon"
          className="w-14 h-14 rounded-full border-2 border-gray-600"
        />
        <div>
          <h2 className="text-xl font-semibold overflow-hidden text-ellipsis break-words line-clamp-4">
            {token.description}
          </h2>
          <p className="text-sm text-gray-400">Chain: {token.chainId}</p>
          <p className="text-sm text-gray-400 truncate max-w-[250px]">
            Address: {token.tokenAddress}
          </p>
        </div>
      </div>

      {isBoost && "amount" in token && (
        <p className="mt-3 text-green-400 font-semibold">
          Boost Amount: {token.amount} / {token.totalAmount}
        </p>
      )}

      <a
        href={token.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-blue-400 mt-4 font-semibold hover:text-blue-300"
      >
        View on DexScreener →
      </a>

      {token.links && token.links.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-300">Links:</p>
          {token.links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 block hover:text-blue-200 transition"
            >
              {link.label || link.type}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

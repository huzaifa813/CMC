import { TokenBoost, TokenProfile } from "@/app/types";

export function TokenCard({
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
export function TokenList({
  tokens,
  isBoost = false,
}: {
  tokens: (TokenProfile | TokenBoost)[];
  isBoost?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tokens.length === 0 ? (
        <p className="text-gray-400 text-center w-full">No data available.</p>
      ) : (
        tokens.map((token, index) => (
          <TokenCard
            key={`${token.tokenAddress}-${index}`}
            token={token}
            isBoost={isBoost}
          />
        ))
      )}
    </div>
  );
}

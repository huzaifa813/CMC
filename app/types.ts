export interface TokenLink {
  type: string;
  label?: string;
  url: string;
}

export interface TokenProfile {
  url: string;
  chainId: string;
  tokenAddress: string;
  icon: string;
  header: string;
  description: string;
  openGraph?: string;
  links: TokenLink[];
}

export interface TokenBoost extends TokenProfile {
  amount: number;
  totalAmount: number;
}
export interface Order {
  paymentTimestamp: number;
  type: string;
  status: string;
}
export interface Token {
  address: string;
  name: string;
  symbol: string;
}

export interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

export interface PairData {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  priceNative: string;
  priceUsd: string;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  baseToken: Token;
  quoteToken: Token;
  liquidity: Liquidity;
}


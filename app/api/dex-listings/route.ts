import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://pro-api.coinmarketcap.com/v4/dex/listings/quotes",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.API_KEY!,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch data" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

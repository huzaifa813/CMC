import Link from "next/link";

const categories = [
  "cryptocurrency",
  "exchange",
  "global-metrics",
  "tools",
  "blockchain",
  "fiat",
  "partners",
  "key",
  "content",
  "dex",
];

export default function Navbar() {
  return (
    <nav>
      {categories.map((category) => (
        <Link key={category} href={`/${category}`} className="pl-5">
          {category.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

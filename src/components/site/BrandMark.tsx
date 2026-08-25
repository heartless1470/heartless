import Link from "next/link";

export default function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand-mark" href={href} aria-label="AstroCodes home">
      <span className="brand-orbit" aria-hidden="true"><span /></span>
      <span>Astro<span>Codes</span></span>
    </Link>
  );
}

import Link from "next/link";

export default function BrandMark({ href = "/" }: { href?: string }) {
  return (
    <Link className="brand-mark" href={href} aria-label="AstroCodes home">
      <span>astrocodestudio<span>.</span></span>
    </Link>
  );
}

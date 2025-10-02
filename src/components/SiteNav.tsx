"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/medicos", label: "Médicos" },
  { href: "/estudos_Caso", label: "Estudos de Caso" },
  { href: "/artigos", label: "Artigos" },
  { href: "/indicar-medico", label: "Indicar médico" },
  { href: "/tecnico", label: "Técnico" },
];

export default function SiteNav(){
  const pathname = (usePathname() || "/").replace(/\/+$/,'') || "/";
  return (
    <nav className="site-nav sticky-top" aria-label="Primary">
      <div className="container inner">
        <Link className="site-brand" href="/">NF1 Study Hub</Link>
        <ul className="site-links" role="list">
          {LINKS.map(({href,label})=>{
            const clean = href.replace(/\/+$/,'');
            const active = pathname === clean || (clean !== "/" && pathname.startsWith(clean));
            return (
              <li key={href}>
                <Link href={href} className={active ? "active" : undefined}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

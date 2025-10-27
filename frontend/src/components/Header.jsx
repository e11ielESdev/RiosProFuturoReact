import React, { useState, useEffect } from "react";
import "./Header.css";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  const links = [
    { href: "#home", label: "Início" },
    { href: "#about", label: "Sobre" },
    { href: "#gallery", label: "Galeria" },
    { href: "#contact", label: "Contato" },
  ];

  return (
    <header className="site-header">
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        <div className="logo">
          <img
            src="/images/RiosProFuturoLOGO.png"
            alt="Rios Pro Futuro logo"
          />
          <span className="site-title">Rios Pro Futuro</span>
        </div>

        <button
          className={`menu-toggle ${open ? "open" : ""}`}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
        >
          ☰
        </button>

        <ul id="main-nav" className={`nav-links ${open ? "open" : ""}`}>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
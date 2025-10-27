import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Rios Pro Futuro</p>
      <p>Construindo um futuro sustentável 🌱</p>
    </footer>
  );
}
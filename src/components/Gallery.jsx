import React from "react";

const images = [
  { src: "/images/RiosProFuturoLOGO.png", desc: "Logo oficial do projeto" },
  { src: "/images/MULTIRAOVERDE.jpg", desc: "Mutirão verde de limpeza e reflorestamento" },
  { src: "/images/CONCIENTIZACAOAMBIENTAL.jpg", desc: "Ações de conscientização ambiental" },
  { src: "/images/MANGUEVIVO.jpg", desc: "Proteção e preservação do mangue" },
  { src: "/images/AGUALIMPAVIDAPLENA.JPG", desc: "Água limpa, vida plena" },
  { src: "/images/GUARDIAOAGUAS.jpeg", desc: "Guardiões das águas em ação" },
  { src: "/images/ARTEPELOFUTURO.jpg", desc: "Arte e sustentabilidade para o futuro" },
];

export default function Gallery() {
  return (
    <section id="gallery" className="gallery-section">
      <h2>Galeria</h2>
      <div className="gallery-grid">
        {images.map((item) => (
          <figure key={item.src} className="gallery-item">
            <img src={item.src} alt={item.desc} />
            <figcaption>{item.desc}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
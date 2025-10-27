import React from "react";
import Gallery from "../components/Gallery";
import Contact from "../components/Contact";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <main>
      <section id="home" className={styles.hero}>
        <h1>Rios Pro Futuro</h1>
        <p>Protegendo e valorizando nossos rios.</p>
      </section>

      <section id="about" className={styles["about-section"]}>
        <h2>Sobre</h2>
        <p>Projeto focado em conservação, educação ambiental e turismo sustentável.</p>
      </section>

      <Gallery />
      <Contact />
    </main>
  );
}
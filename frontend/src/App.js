import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <div className="app-root">
      <Header />
      <Home />
      <Footer />
    </div>
  );
}
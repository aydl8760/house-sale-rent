import React from "react";
import Header from "../components/Header";
import houseImg from "../assets/modern3.jpg";
import houseImg2 from "../assets/houseimg2.jpeg";
import houseImg3 from "../assets/houseimg.jpeg";
import HeroHome from "../components/HeroHome";

export default function Home() {
  return (
    <div>
      <div
        className="bg-cover  overflow-hidden h-full relative" // Ensure this div is relative
        style={{ backgroundImage: `url(${houseImg})` }}
      >
        <div className="absolute inset-0 bg-gray-950 opacity-50"></div>
        {/* Ensure content appears above the overlay */}
        <div className="relative z-10">
          <Header />
          <section className="h-[600px]">
            <HeroHome />
          </section>
        </div>
      </div>
    </div>
  );
}

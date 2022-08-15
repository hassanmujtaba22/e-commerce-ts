import React from "react";
import CategoryBanner from "../components/category-banner";
import Hero from "../components/hero";
import NewArrival from "../components/new-arrivals";

function Home() {
  return (
    <>
      <Hero />
      <CategoryBanner />
      <NewArrival />
    </>
  );
}

export default Home;

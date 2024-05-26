import React from "react";
import "./HomePage.scss";
import Footer from "../../components/Footer/Footer";
import HeroSection from "../../components/HeroSection/HeroSection";
import Deals from "../../components/Deals/Deals";
import NewArrival from "../../components/NewArrival/NewArrival";
import DiscountedOffers from "../../components/DiscountedOffers/DiscountedOffers";
import MensCategories from "../../components/MensCategories/MensCategories";
import WomensCategories from "../../components/WomensCategories/WomensCategories";
import TopDeals from "../../components/TopDeals/TopDeals";

const HomePage = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <Deals />
      <NewArrival />
      <DiscountedOffers />
      <MensCategories />
      <WomensCategories />
      <TopDeals />
      <Footer />
    </div>
  );
};

export default HomePage;

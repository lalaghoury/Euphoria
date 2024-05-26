import React from "react";
import "./HeroSection.scss";
import { Button, Carousel } from "antd";
import { useNavigate } from "react-router-dom";
import CarouselImage1 from "../../assets/images/carouselImage1.png";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <div className="hero-section">
      <Carousel className="!w-screen">
        <div>
          <div className="hero-section-carousel">
            <div className="carousel-img">
              <img src={CarouselImage1} alt="img" />
            </div>
            <div className="carousel-content">
              <h4>T-shirt / Tops</h4>
              <h1>Summer</h1>
              <h1>Value Pack</h1>
              <h4>cool / colorful / comfy</h4>
              <span className="hero-btn">
                <Button className="dis-fcc" onClick={() => navigate("/shop")}>
                  Shop Now
                </Button>
              </span>
            </div>
          </div>
        </div>
        <div>
          <div className="hero-section-carousel">
            <div className="carousel-img">
              <img src={CarouselImage1} alt="img" />
            </div>
            <div className="carousel-content">
              <h4>T-shirt / Tops</h4>
              <h1>Summer</h1>
              <h1>Value Pack</h1>
              <h4>cool / colorful / comfy</h4>
              <span className="hero-btn">
                <Button className="dis-fcc" onClick={() => navigate("/shop")}>
                  Shop Now
                </Button>
              </span>
            </div>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default HeroSection;

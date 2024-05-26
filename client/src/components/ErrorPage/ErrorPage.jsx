import React from "react";
import "./styles.css"; // Assuming you have CSS styles for the components
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Star = () => <div className="star-1"></div>;

const Bird = () => (
  <div className="bird bird-anim">
    <div className="bird-container">
      <div className="wing wing-left">
        <div className="wing-left-top"></div>
      </div>
      <div className="wing wing-right">
        <div className="wing-right-top"></div>
      </div>
    </div>
  </div>
);

const Moon = () => (
  <div className="moon">
    <div className="face">
      <div className="mouth"></div>
      <div className="eyes">
        <div className="eye-left"></div>
        <div className="eye-right"></div>
      </div>
    </div>
  </div>
);

const Container = () => (
  <div className="errorContainer container-star">
    {[...Array(30)].map((_, index) => (
      <Star key={index} />
    ))}
  </div>
);

const BirdContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="errorContainer container-bird">
      {[...Array(6)].map((_, index) => (
        <Bird key={index} />
      ))}
      <div className="container-title">
        <div className="title">
          <div className="number">4</div>
          <Moon />
          <div className="number">4</div>
        </div>
        <div className="subtitle mb-5">oops. looks like you took a wrong turn.</div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

const ErrorPage = () => (
  <div className="error-page">
    <Container />
    <BirdContainer />
  </div>
);

export default ErrorPage;

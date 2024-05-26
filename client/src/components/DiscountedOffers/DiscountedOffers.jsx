import React from "react";
import CardShortHand from "../ShortHand/CardShortHand/CardShortHand";

const DiscountedOffers = () => {
  return (
    <CardShortHand
      text={"Big Saving Zone"}
      url={"/discounted-offers"}
      apiUrl={`${process.env.API_URL}/products/all`}
      width={282}
      height={370}
      color={"#f5f5f5"}
      slice={8}
    />
  );
};

export default DiscountedOffers;

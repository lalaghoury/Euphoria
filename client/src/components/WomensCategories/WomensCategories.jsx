import React from "react";
// import CardShortHand from "../ShortHand/CardShortHand/CardShortHand";
import CardShortHand from "../ShortHand/CardShortHand/CardShortHand";

const WomensCategories = () => {
  return (
    <CardShortHand
      text={"Categories For Women"}
      url={"/womens-categories"}
      apiUrl={`${process.env.API_URL}/products/all`}
      width={255}
      height={250}
      color={"#f5f5f5"}
      slice={4}
    />
  );
};

export default WomensCategories;

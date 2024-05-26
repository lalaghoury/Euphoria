import React from "react";
import CardShortHand from "../ShortHand/CardShortHand/CardShortHand";

const MensCategories = () => {
  return (
    <CardShortHand
      text={"Categories For Men"}
      url={"/mens-categories"}
      apiUrl={`${process.env.API_URL}/products/all`}
      width={255}
      height={250}
      color={"#f5f5f5"}
      slice={8}
    />
  );
};

export default MensCategories;

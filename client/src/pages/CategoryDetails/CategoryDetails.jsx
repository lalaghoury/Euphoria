import React from "react";
import { useParams } from "react-router-dom";
import CardShortHand from "../../components/ShortHand/CardShortHand/CardShortHand";

const CategoryDetails = () => {
  const { categoryName } = useParams();

  return (
    <div>
      <CardShortHand
        apiUrl={`${process.env.API_URL}/categories/details/${categoryName}`}
        text={categoryName}
      />
    </div>
  );
};

export default CategoryDetails;

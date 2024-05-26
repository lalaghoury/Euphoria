import React from "react";
import { useParams } from "react-router-dom";
import CardShortHand from "../../components/ShortHand/CardShortHand/CardShortHand";

const CategoryDetails = () => {
  const { categoryName } = useParams();

  return (
    <div>
      <CardShortHand
        apiUrl={`${"https://euphoria-six.vercel.app/api"}/categories/details/${categoryName}`}
        text={categoryName}
      />
    </div>
  );
};

export default CategoryDetails;

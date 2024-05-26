import React, { useEffect, useState } from "react";
import { Flex, Image, Spin, message } from "antd";
import AppLayout from "../../../config/AppLayout/AppLayout";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import CommonHeading from "../../CommonHeading/CommonHeading";
import WishlistButton from "../../WishlistButton";

const CardShortHand = ({ text, apiUrl, color, width, height, slice }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(apiUrl);
        if (data.success) {
          setProducts(data.products.slice(0, slice));
        }
      } catch (error) {
        console.error("Error fetching Products:", error.response.data.message);
        message.error(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slice, apiUrl]);

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        <CommonHeading text={text} />
        <Flex gap={10} wrap="wrap" justify="space-between">
          {products.map((product) => (
            <div
              key={product?._id}
              className={`card rounded-lg w-[282px] h-[460px] bg-white mb-[50px] relative cursor-pointer overflow-hidden`}
            >
              <Image
                className="hover:scale-110 ease-in-out duration-500 rounded-lg object-cover"
                onClick={() => navigate(`/product/${product?._id}`)}
                src={product?.images[0]?.url}
                alt={product.name}
                width={282}
                height={370}
                preview={false}
              />
              <WishlistButton
                wishlists={product?.wishlists}
                productId={product?._id}
              />
              <div className="flex justify-between items-center mt-[30px] px-1">
                <div key={product?._id} className="flex flex-col gap-[5px]">
                  <Link to={`/product/${product?._id}`}>
                    <span className="text-[20px] text-[#3c4242] font-['Causten'] font-semibold leading-[normal] capitalize">
                      {product?.name}
                    </span>
                  </Link>
                  <div className="text-[#807D7E] font-['Causten'] text-sm leading-[normal]">
                    {product?.brand}
                  </div>
                </div>
                <p className="dis-fcc text-[#3c4242] font-['Causten'] text-sm font-bold leading-[normal] rounded-lg bg-[#F6F6F6] w-[82px] h-[37px]">
                  {Intl.NumberFormat(undefined, {
                    style: "decimal",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(product?.price)}
                </p>
              </div>
            </div>
          ))}
        </Flex>
      </Spin>
    </AppLayout>
  );
};

export default CardShortHand;

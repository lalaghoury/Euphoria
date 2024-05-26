import { Image, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Steps } from "antd";

const OrderDetails = () => {
  const [order, setOrder] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await axios.get(`${process.env.API_URL}/orders/${id}`);
        if (data.success) setOrder(data.order);
      } catch (error) {
        console.log(error.response.data.message);
        message.error(error.response.data.message);
      }
    };
    fetchOrder();
  }, [id]);

  const getConvertedStatus = (status) => {
    switch (status) {
      case "Not Processed":
        return 0;
      case "Processing":
        return 1;
      case "Shipped":
        return 2;
      case "Delivered":
        return 3;
      case "cancelled":
        return "Cancelled";
      default:
        return 0;
    }
  };

  return (
    <div className="leading-[normal]">
      {/* Breeadcrumb */}
      <div className="flex items-center gap-2.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.6665 5L7.2558 9.41074C6.93036 9.73618 6.93036 10.2638 7.2558 10.5893L11.6665 15"
            stroke="#3C4242"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h1 className="flex-shrink-0 text-[#3c4242] font-['core Sans C'] text-[1.75rem] font-semibold leading-[2.0625rem]">
          Order Details
        </h1>
      </div>

      {/* Heading */}
      <div className="px-[47px] py-[27px] my-[50px] flex flex-col gap-y-2.5 flex-shrink-0  h-[6.75rem] rounded-lg bg-[#f6f6f6]">
        <h1 className="text-[#3c4242] font-['Causten'] text-xl font-semibold leading-[normal]">
          Order no: #{order._id}
        </h1>
        <div className="flex justify-between items-center">
          <div className="text-[#807d7e] font-['Causten'] font-medium leading-[normal]">
            Placed On {formatDate(order.createdAt)}
          </div>
          <div className="text-[#3c4242] text-right font-['Causten'] text-lg font-semibold leading-[normal]">
            <span className="text-[#807d7e]">Total : </span> ${order.amount}
          </div>
        </div>
      </div>

      {/* Steps component */}
      <div className="mb-[67px]">
        <Steps
          current={getConvertedStatus(order?.status)}
          progressDot
          items={[
            {
              title: "Order Placed",
            },
            {
              title: "In Progress",
            },
            {
              title: "shipped",
            },
            {
              title: "Delivered",
            },
          ]}
        />
      </div>

      {/* Notification component */}
      <div className="w-[748px] h-[4.1875rem] mx-auto flex items-center justify-between px-[29px] py-[24px] rounded-lg border-[0.5px] border-[#807d7e]/[.20] bg-[#f6f6f6]">
        <div className="text-[#807d7e] font-['Causten'] font-semibold leading-[normal]">
          {formatDate(order.createdAt)}
        </div>
        <div className="text-[#3c4242] font-['Causten'] font-semibold leading-[normal]">
          Your order has been successfully verified.
        </div>
      </div>

      {/* Product details */}
      <div className="mt-[80px] flex-shrink-0 w-[895px] h-[21.875rem] px-[50px] py-[43px] rounded-lg bg-[#f6f6f6]">
        {order?.products?.map((product) => (
          <ProductItem key={product?.productId?._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const ProductItem = ({ product }) => {
  return (
    <div
      key={product?.productId?._id}
      className="w-full flex justify-between gap-[33px]"
    >
      <div className="w-[6.375rem] h-[6.375rem] rounded-[0.1875rem]">
        <Image
          src={product?.productId?.thumbnail}
          width={110}
          height={110}
          fallback="https://via.placeholder.com/110"
        />
      </div>
      <div className="w-[661px] h-[3.875rem] flex flex-col gap-2.5">
        <div className="flex justify-between">
          <div className="printed_white_cote text-[#3c4242] font-['Causten'] text-[1.375rem] font-bold leading-[normal]">
            {product?.productId?.name}
          </div>
          <div className="qty___1 text-[#807d7e] font-['Causten'] text-[1.375rem] font-medium leading-[normal]">
            Qty : {product?.quantity}
          </div>
          <div className="_29_00 text-[#807d7e] font-['Causten'] text-[1.375rem] font-bold leading-[normal]">
            $29.00
          </div>
          <svg
            width={22}
            height={22}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 4L4 18M18 18L4 4.00001"
              stroke="#3C4242"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="text-[#3c4242] font-['Causten'] text-[1.375rem] font-medium leading-[normal]">
          Color :{" "}
          <span className="text-[#bebcbd] text-center  text-sm  ">
            {product?.color}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

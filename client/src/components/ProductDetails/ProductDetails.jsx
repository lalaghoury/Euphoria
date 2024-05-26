import React, { useEffect, useState } from "react";
import {
  Image,
  Spin,
  Flex,
  Breadcrumb,
  Button,
  Modal,
  Rate,
  Divider,
  message,
} from "antd";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { cartThunks } from "../../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/es/typography/Title";
import CommonHeading from "../CommonHeading/CommonHeading";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [openImage, setOpenImage] = useState(null);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { productId } = useParams();
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const items = [
    {
      key: "1",
      label: <Link to="/">Home</Link>,
    },
    {
      key: "2",
      label: <Link to="/shop">Shop</Link>,
    },
    {
      key: "3",
      label: product?.name,
    },
  ];

  const handleAddToCartClick = () => {
    if (!selectedColor || !selectedSize) {
      message.error("Please select color and size");
      return;
    }

    if (!auth.user) {
      Modal.info({
        title: "Please login to continue",
        content: "You need to login to add a product to your cart",
        onOk() {
          navigate("/sign-in");
        },
      });
    } else if (auth.user) {
      dispatch(
        cartThunks.addToCart({
          productId: product._id,
          quantity: 1,
          price: product.price,
          color: selectedColor,
          size: selectedSize,
        })
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `${"https://euphoria-six.vercel.app/api"}/products/single/${productId}`
        );
        if (data.success) {
          setProduct(data.product);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [productId]);

  return (
    <AppLayout>
      <Spin spinning={loading} tip="Loading...">
        <div className="w-full flex gap-[74px]">
          {/* Left */}
          <div className="left flex w-[800px]">
            <div className="flex flex-col gap-4 items-center justify-center w-[220px]">
              {product?.images?.map((image) => (
                <Image
                  key={image?.name}
                  src={image?.url}
                  alt={image?.name}
                  width={68}
                  height={68}
                  preview={false}
                  className="cursor-pointer rounded-lg border-[0.756px] border-[#3C4242]"
                  onClick={() => setOpenImage(image)}
                />
              ))}
            </div>
            {openImage === null && (
              <Image
                src={product?.thumbnail}
                alt={product?.name}
                fallback="https://via.placeholder.com/500"
                width={520}
                height={785}
              />
            )}
          </div>

          {/* Right */}
          <div className="right w-[640px] flex flex-col gap-[35px]">
            <Breadcrumb separator=">" items={items} />

            <div className="flex-shrink-0 w-[393px] h-[5.5rem] text-[#3c4242] font-['coreSans C'] text-[2.125rem] font-semibold leading-[140%]">
              Raven Hoodie With Black colored Design
            </div>

            <Rate disabled defaultValue={2} />

            <SizesInput
              sizes={product?.sizes}
              setSelectedSize={setSelectedSize}
              selectedSize={selectedSize}
            />

            <ColorsInput
              colors={product?.colors}
              setSelectedColor={setSelectedColor}
              selectedColor={selectedColor}
            />

            <Flex gap={25}>
              <Button
                type="primary"
                className="dis-fcc gap-3"
                onClick={handleAddToCartClick}
                loading={loading}
              >
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.5 3.33334H3.00526C3.85578 3.33334 4.56986 3.97375 4.6621 4.81926L5.3379 11.0141C5.43014 11.8596 6.14422 12.5 6.99474 12.5H14.205C14.9669 12.5 15.6317 11.9834 15.82 11.2452L16.9699 6.73592C17.2387 5.68212 16.4425 4.65741 15.355 4.65741H5.5M5.52063 15.5208H6.14563M5.52063 16.1458H6.14563M14.6873 15.5208H15.3123M14.6873 16.1458H15.3123M6.66667 15.8333C6.66667 16.2936 6.29357 16.6667 5.83333 16.6667C5.3731 16.6667 5 16.2936 5 15.8333C5 15.3731 5.3731 15 5.83333 15C6.29357 15 6.66667 15.3731 6.66667 15.8333ZM15.8333 15.8333C15.8333 16.2936 15.4602 16.6667 15 16.6667C14.5398 16.6667 14.1667 16.2936 14.1667 15.8333C14.1667 15.3731 14.5398 15 15 15C15.4602 15 15.8333 15.3731 15.8333 15.8333Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>{" "}
                Add to Cart
              </Button>

              <div className="flex justify-center items-center gap-3 py-3 px-10 rounded-lg border border-[#3c4242] text-[#3c4242] text-center font-['Causten'] text-lg font-bold leading-[normal]">
                {Intl.NumberFormat(undefined, {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(product?.price)}
              </div>
            </Flex>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="frame_28 inline-flex items-center pt-0 pb-1 pl-0 pr-8">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={22} cy={22} r={22} fill="#F6F6F6" />
                  <path
                    d="M15 18.75H30M18 26.25H21M24 26.25H27M17.4 30H27.6C28.4401 30 28.8601 30 29.181 29.7956C29.4632 29.6159 29.6927 29.329 29.8365 28.9762C30 28.5751 30 28.0501 30 27V18C30 16.9499 30 16.4249 29.8365 16.0238C29.6927 15.671 29.4632 15.3841 29.181 15.2044C28.8601 15 28.4401 15 27.6 15H17.4C16.5599 15 16.1399 15 15.819 15.2044C15.5368 15.3841 15.3073 15.671 15.1635 16.0238C15 16.4249 15 16.9499 15 18V27C15 28.0501 15 28.5751 15.1635 28.9762C15.3073 29.329 15.5368 29.6159 15.819 29.7956C16.1399 30 16.5599 30 17.4 30Z"
                    stroke="#3C4242"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-[#3c4242] font-['Causten'] text-lg font-medium leading-[normal]">
                  Secure payment
                </div>
              </div>
              <div className="frame_29 inline-flex items-center pt-0 pb-1 pl-0 pr-6">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={22} cy={22} r={22} fill="#F6F6F6" />
                  <path
                    d="M25.6349 30H18.3651C17.3613 30 16.5476 29.2007 16.5476 28.2147V21.5796C16.5476 21.0634 15.9122 20.8049 15.5406 21.1699C15.2014 21.5032 14.6205 21.3203 14.5417 20.8555L14.0248 17.8091C13.9021 17.0857 14.2422 16.3621 14.8825 15.9847L18.1965 14.0315C18.293 13.9746 18.4175 13.9966 18.4878 14.0829C20.2884 16.2938 23.7116 16.2938 25.5122 14.0829C25.5825 13.9966 25.707 13.9746 25.8035 14.0315L29.1175 15.9847C29.7578 16.3621 30.0979 17.0857 29.9752 17.8091L29.4583 20.8555C29.3795 21.3203 28.7986 21.5032 28.4594 21.1699C28.0878 20.8049 27.4524 21.0634 27.4524 21.5796V28.2147C27.4524 29.2007 26.6387 30 25.6349 30Z"
                    stroke="#3C4242"
                    strokeWidth="1.1"
                  />
                </svg>
                <div className="text-[#3c4242] font-['Causten'] text-lg font-medium leading-[normal]">
                  Size &amp; Fit
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="frame_30 inline-flex items-center pr-[1.8125rem] pt-0 pb-1 pl-0">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={22} cy={22} r={22} fill="#F6F6F6" />
                  <path
                    d="M23.8 26.6667V15.4667C23.8 15.2089 23.5985 15 23.35 15H13.45C13.2015 15 13 15.2089 13 15.4667V26.6667C13 26.9244 13.2015 27.1333 13.45 27.1333H14.8M23.8 26.6667C23.8 26.9244 23.5985 27.1333 23.35 27.1333H18.4M23.8 26.6667V18.2667C23.8 18.0089 24.0015 17.8 24.25 17.8H27.2136C27.333 17.8 27.4474 17.8492 27.5318 17.9367L30.8682 21.3967C30.9526 21.4842 31 21.6029 31 21.7266V26.6667C31 26.9244 30.7985 27.1333 30.55 27.1333H29.2M23.8 26.6667C23.8 26.9244 24.0015 27.1333 24.25 27.1333H25.6M14.8 27.1333C14.8 28.1643 15.6059 29 16.6 29C17.5941 29 18.4 28.1643 18.4 27.1333M14.8 27.1333C14.8 26.1024 15.6059 25.2667 16.6 25.2667C17.5941 25.2667 18.4 26.1024 18.4 27.1333M25.6 27.1333C25.6 28.1643 26.4059 29 27.4 29C28.3941 29 29.2 28.1643 29.2 27.1333M25.6 27.1333C25.6 26.1024 26.4059 25.2667 27.4 25.2667C28.3941 25.2667 29.2 26.1024 29.2 27.1333"
                    stroke="#3C4242"
                    strokeWidth="1.1"
                  />
                </svg>
                <div className="text-[#3c4242] font-['Causten'] text-lg font-medium leading-[normal]">
                  Free shipping
                </div>
              </div>
              <div className="frame_31 inline-flex justify-center items-center pt-0 pb-1 pl-0 pr-px">
                <svg
                  width={44}
                  height={44}
                  viewBox="0 0 44 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx={22} cy={22} r={22} fill="#F6F6F6" />
                  <path
                    d="M18.4444 28.2222C18.4444 29.2041 17.6485 30 16.6667 30C15.6848 30 14.8889 29.2041 14.8889 28.2222C14.8889 27.2404 15.6848 26.4444 16.6667 26.4444C17.6485 26.4444 18.4444 27.2404 18.4444 28.2222ZM18.4444 28.2222H25.5556C26.5374 28.2222 27.3333 27.4263 27.3333 26.4444V22.8889M25.5556 15.7778C25.5556 16.7596 26.3515 17.5556 27.3333 17.5556C28.3152 17.5556 29.1111 16.7596 29.1111 15.7778C29.1111 14.7959 28.3152 14 27.3333 14C26.3515 14 25.5556 14.7959 25.5556 15.7778ZM25.5556 15.7778H18.4444C17.4626 15.7778 16.6667 16.5737 16.6667 17.5556V21.1111M30 24.6667L27.6476 22.1398C27.474 21.9534 27.1926 21.9534 27.0191 22.1398L24.6667 24.6667M19.3333 19.3333L16.9809 21.8602C16.8074 22.0466 16.526 22.0466 16.3524 21.8602L14 19.3333"
                    stroke="#3C4242"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="text-[#3c4242] font-['Causten'] text-lg font-medium leading-[normal]">
                  Free Shipping &amp; Returns
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}

        <div className="mt-[100px]">
          <CommonHeading text={"Product Description"} />

          <div className="w-[491px] h-10 mb-[30px]">
            <div className="text-[#3c4242] font-['Causten'] text-lg font-medium leading-[normal]">
              Description
            </div>
            <svg
              width={45}
              height={2}
              viewBox="0 0 45 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1H44"
                stroke="black"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
            <div className="frame_35 inline-flex justify-center items-start pr-[0.1875rem]">
              <div className="text-[#807d7e] font-['Causten'] text-lg leading-[normal]">
                User comments
              </div>
              <div className="w-5 h-5">
                <div className="flex-shrink-0 w-5 h-5 rounded bg-[#8a33fd]" />
                <div className="flex flex-col flex-shrink-0 justify-center w-[0.5625rem] h-3 text-white text-center font-['Causten'] text-[10px] font-medium leading-[normal]">
                  21
                </div>
              </div>
            </div>
            <div className="frame_36 inline-flex justify-center items-start pr-[0.1875rem]">
              <div className="text-[#807d7e] font-['Causten'] text-lg leading-[normal]">
                Question &amp; Answer
              </div>
              <div className="w-5 h-5">
                <div className="flex-shrink-0 w-5 h-5 rounded bg-[#3c4242]" />
                <div className="flex flex-col flex-shrink-0 justify-center w-[0.5625rem] h-3 text-white text-center font-['Causten'] text-[10px] font-medium leading-[normal]">
                  4
                </div>
              </div>
            </div>
          </div>

          <div className="w-[610px] text-[#807d7e] font-['Causten'] leading-[1.5625rem]">
            100% Bio-washed Cotton – makes the fabric extra soft &amp; silky.
            Flexible ribbed crew neck. Precisely stitched with no pilling &amp;
            no fading. Provide all-time comfort. Anytime, anywhere. Infinite
            range of matte-finish HD prints.
          </div>
        </div>
      </Spin>
    </AppLayout>
  );
};

export default ProductDetails;

export const ColorsInput = ({ colors, setSelectedColor, selectedColor }) => {
  const handleColorClick = (color) => {
    const divElement = document.getElementById(selectedColor);
    if (divElement) {
      divElement.style.border = "";
    }

    if (selectedColor === color) {
      setSelectedColor("");
    } else {
      const newDivElement = document.getElementById(color);
      newDivElement.style.border = "2px solid #000";
      newDivElement.style.padding = "1px";
      setSelectedColor(color);
    }
  };

  return (
    <div>
      <Title level={5} className="!mb-5">
        Colours Available
      </Title>
      <div className="flex flex-wrap items-center gap-4">
        {colors?.map((color) => (
          <div
            className={`color-block w-[22px] h-[22px] cursor-pointer border-2 border-solid rounded-full p-2`}
            id={color}
            key={color}
            onClick={() => handleColorClick(color)}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export const SizesInput = ({ selectedSize, sizes, setSelectedSize }) => {
  const handleSizeClick = (size) => {
    const divElement = document.getElementById(selectedSize);
    if (divElement) {
      divElement.style.color = "#000";
      divElement.style.backgroundColor = "#fff";
    }

    if (selectedSize === size) {
      setSelectedSize(""); // Deselect the size if it's already selected
    } else {
      const newDivElement = document.getElementById(size);
      if (newDivElement) {
        newDivElement.style.color = "#fff";
        newDivElement.style.backgroundColor = "#000";
        setSelectedSize(size); // Set the newly selected size
      }
    }
  };

  return (
    <div className="flex flex-col gap-[25px] items-start">
      <div className="flex items-start gap-5">
        <div className="text-[#3f4646] font-['Causten'] text-lg font-semibold leading-[normal]">
          Select Size
        </div>
        <div className="frame_16 flex items-center">
          <div className="text-[#807d7e] font-['Causten'] text-lg font-medium leading-[normal]">
            Size Guide
          </div>
          <svg
            width={16}
            height={14}
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14M9 1L14.2929 6.29289C14.6834 6.68342 14.6834 7.31658 14.2929 7.70711L9 13"
              stroke="#807D7E"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        {sizes?.map((size) => (
          <div
            className={`w-[2.625rem] h-[2.625rem] cursor-pointer ${
              selectedSize === size
                ? "bg-[#000]"
                : "border-[1.5px] border-[#bebcbd]"
            } rounded-xl flex flex-col items-center justify-center`}
            onClick={() => handleSizeClick(size)}
            id={size}
            key={size}
          >
            <div
              className={`flex items-center justify-center flex-shrink-0 w-[2.375rem] h-[2.375rem] ${
                selectedSize === size
                  ? "bg-[#000]"
                  : "border-[1.5px] border-[#bebcbd]"
              } rounded-xl`}
            >
              <div
                className={`w-5 text-center font-['Causten'] text-sm font-medium leading-[normal] ${
                  selectedSize === size ? "text-white" : "text-[#3c4242]"
                }`}
              >
                {size}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

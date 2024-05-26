import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Input,
  Slider,
  Spin,
  Divider,
  Flex,
  Image,
  Tooltip,
  Button,
  Collapse,
} from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppLayout from "../../config/AppLayout/AppLayout";
import "./Shop.scss";
import { DownOutlined } from "@ant-design/icons";
import WishlistButton from "../WishlistButton";
import CommonHeading from "../CommonHeading/CommonHeading";
import FooterUser from "../Footer/Footer";
import queryString from "query-string";

const Shop = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //Innitial states for categories & dress styles
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [dressStyleNames, setDressStyleNames] = useState([]);

  // Initial states for filters
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [category, setCategory] = useState("");
  const [dressStyle, setDressStyle] = useState("");
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtersInitialized, setFiltersInitialized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${process.env.API_URL}/categories/names`
        );
        const dressStylesResponse = await axios.get(
          `${process.env.API_URL}/dress-styles/names`
        );

        setCategoriesNames(categoriesResponse.data.categoriesNames);
        setDressStyleNames(dressStylesResponse.data.DressStylesNames);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  // Function to get ID from name
  const getIdFromName = (name, list) => {
    const item = list.find((item) => item.name === name);
    return item ? item.id : "";
  };

  // Function to parse and set filter state from URL
  const setFiltersFromURL = () => {
    const parsed = queryString.parse(location.search);
    if (parsed.minPrice) setMinPrice(Number(parsed.minPrice));
    if (parsed.maxPrice) setMaxPrice(Number(parsed.maxPrice));
    if (parsed.category)
      setCategory(getIdFromName(parsed.category, categoriesNames));
    if (parsed.dressStyle)
      setDressStyle(getIdFromName(parsed.dressStyle, dressStyleNames));
    if (parsed.colors) setColors(parsed.colors.split(","));
    if (parsed.sizes) setSizes(parsed.sizes.split(","));
    setFiltersInitialized(true);
  };

  // Parse filters from URL query parameters on component mount
  useEffect(() => {
    if (categoriesNames.length > 0 && dressStyleNames.length > 0) {
      setFiltersFromURL();
    }
  }, [location.search, categoriesNames, dressStyleNames]);

  useEffect(() => {
    if (filtersInitialized) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get(
            `${process.env.API_URL}/products/filter`,
            {
              params: {
                minPrice,
                maxPrice,
                category,
                dressStyle,
                colors,
                sizes,
              },
            }
          );

          if (data.success) {
            setProducts(data.products);
          }
        } catch (error) {
          console.error(
            "Error fetching products:",
            error.response?.data?.message
          );
          message.error(error.response?.data?.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [
    filtersInitialized,
    minPrice,
    maxPrice,
    category,
    dressStyle,
    colors,
    sizes,
  ]);

  // Generalized handleChange function
  const handleChange = (filterName, value) => {
    const filterStateUpdaters = {
      minPrice: setMinPrice,
      maxPrice: setMaxPrice,
      category: setCategory,
      dressStyle: setDressStyle,
      colors: setColors,
      sizes: setSizes,
    };

    filterStateUpdaters[filterName](value);

    const currentFilters = {
      minPrice,
      maxPrice,
      category,
      dressStyle,
      colors,
      sizes,
      [filterName]: value,
    };

    // Filter out null or empty values
    const validFilters = Object.fromEntries(
      Object.entries(currentFilters).filter(
        ([key, val]) => val != null && val !== ""
      )
    );

    const query = queryString.stringify(validFilters, { arrayFormat: "comma" });
    navigate({ search: `?${query}` });
  };

  const handleReset = () => {
    handleChange("category", "");
    handleChange("dressStyle", "");
    handleChange("colors", []);
    handleChange("sizes", []);
    handleChange("minPrice", 0);
    handleChange("maxPrice", 1000);
  };

  const items = [
    {
      key: "1",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Categories
        </h1>
      ),
      children: (
        <div>
          {categoriesNames?.map((categoryObj) => (
            <p
              className="cursor-pointer pb-2 text-[#444]  font-semibold leading-[normal]"
              onClick={() => handleChange("category", categoryObj._id)}
              key={categoryObj._id}
            >
              {categoryObj?.name}
            </p>
          ))}
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },

    {
      key: "2",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">Price</h1>
      ),
      children: (
        <div>
          <Slider
            range
            min={0}
            max={1000}
            value={[minPrice, maxPrice]}
            onChange={(val) => {
              handleChange("minPrice", val[0]);
              handleChange("maxPrice", val[1]);
            }}
            className="mb-5 text-[#8A33FD]"
          />
          <Flex align="center" gap={10}>
            <Flex align="center" gap={5} vertical>
              <Input
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="min price"
                type="number"
                min={minPrice}
                max={1000}
                step="10"
              />
            </Flex>
            <Flex align="center" gap={5} vertical>
              <Input
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="max price"
                type="number"
                min={minPrice}
                max={1000}
                step="10"
              />
            </Flex>
          </Flex>
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },

    {
      key: "3",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Colors
        </h1>
      ),
      children: <Colors colors={colors} handleChange={handleChange} />,
    },

    {
      key: "4",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">Size</h1>
      ),
      children: <Sizes sizes={sizes} handleChange={handleChange} />,
    },

    {
      key: "5",
      label: (
        <h1 className="text-[#8a8989] font-semibold leading-[normal]">
          Dress Styles
        </h1>
      ),
      children: (
        <div>
          {dressStyleNames?.map((Obj) => (
            <p
              className="cursor-pointer pb-2 text-[#444]  font-semibold leading-[normal]"
              onClick={() => handleChange("dressStyle", Obj?._id)}
              key={Obj?._id}
            >
              {Obj?.name}
            </p>
          ))}
          <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <AppLayout>
        <Spin spinning={loading} tip="Loading..." className="w-full">
          <Flex gap={50} className="shop-container justify-between w-full">
            <div className="flex flex-col font-['Causten'] w-[295px]">
              <div className="w-full flex items-center justify-between">
                <div className="flex gap-[10px] items-center justify-between w-full">
                  <h2 className="filter text-[#807d7e] text-[1.375rem] font-semibold leading-[normal]">
                    Filters
                  </h2>
                  <Tooltip title="Filters">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="20"
                      viewBox="0 0 17 20"
                      fill="none"
                    >
                      <path
                        d="M2.83333 6.33333L2.83333 1.75M2.83333 18.25L2.83333 10M13.8333 18.25L13.8333 10M8.33333 18.25V13.6667M8.33333 10V1.75M13.8333 6.33333L13.8333 1.75M1 6.33333H4.66667M6.5 13.6667H10.1667M12 6.33333L15.6667 6.33333"
                        stroke="#807D7E"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Tooltip>
                </div>
              </div>
              <Divider className="h-px opacity-[0.4] bg-[#bebcbd]" />

              <Collapse
                size="large"
                expandIconPosition={"end"}
                bordered={false}
                expandIcon={({ isActive }) => (
                  <DownOutlined rotate={isActive ? 180 : 0} />
                )}
                defaultActiveKey={["3"]}
                ghost
                accordion
                items={items}
                className="!p-0"
              />
              <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />

              <Button onClick={handleReset} className="w-full">
                Reset all filters
              </Button>
            </div>
            <div className="w-[1095px]">
              <CommonHeading text={"Shop"} className={"!mt-0"} />
              <div
                id="product-list"
                className="card-wrap flex flex-wrap justify-between gap-[24px]"
              >
                {products.map((product, index) => (
                  <div
                    key={index}
                    className={`card card${index} rounded-lg w-[282px] h-[460px] bg-white mb-[50px] relative cursor-pointer overflow-hidden`}
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
                      <div
                        key={product?._id}
                        className="flex flex-col gap-[5px]"
                      >
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
              </div>
            </div>
          </Flex>
        </Spin>
      </AppLayout>
      <FooterUser />
    </div>
  );
};

const Colors = ({ colors, handleChange }) => {
  const colorsArr = [
    { colorName: "Purple", backgroundColor: "#8434E1" },
    { colorName: "Black", backgroundColor: "#252525" },
    { colorName: "Red", backgroundColor: "#F35528" },
    { colorName: "Orange", backgroundColor: "#F16F2B" },
    { colorName: "Navy", backgroundColor: "#345EFF" },
    { colorName: "White", backgroundColor: "#FFF" },
    { colorName: "Broom", backgroundColor: "#D67E3B" },
    { colorName: "Green", backgroundColor: "#48BC4E" },
    { colorName: "Yellow", backgroundColor: "#FDC761" },
    { colorName: "Grey", backgroundColor: "#E4E5E8" },
    { colorName: "Pink", backgroundColor: "#E08D9D" },
    { colorName: "Blue", backgroundColor: "#3FDEFF" },
  ];

  const handleColorClick = (addedColor) => {
    const newColors = colors.includes(addedColor)
      ? colors.filter((color) => color !== addedColor)
      : [...colors, addedColor];
    handleChange("colors", newColors);

    const divElement = document.getElementById(`${addedColor}`);
    const childrens = divElement?.children;

    if (divElement) {
      if (colors.includes(addedColor)) {
        childrens[0].style.border = "";
        childrens[1].style.color = "";
      } else {
        childrens[0].style.border = "#ddd dashed 3px";
        childrens[1].style.color = "#8a33fd";
      }
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center gap-4">
        {colorsArr.map((color, index) => (
          <div
            className="color-swatch flex flex-col items-center justify-center gap-2 item"
            onClick={() => handleColorClick(color.colorName)}
            id={color.colorName}
            key={index}
          >
            <div
              className="color-block w-12 h-12 rounded-xl cursor-pointer"
              style={{
                backgroundColor: color.backgroundColor,
                border: colors.includes(color.colorName)
                  ? "#ddd dashed 3px"
                  : "",
              }}
            />
            <div
              className="color-name text-sm font-semibold cursor-pointer"
              style={{
                color: colors.includes(color.colorName) ? "#8a33fd" : "",
              }}
            >
              {color.colorName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Sizes = ({ sizes, handleChange }) => {
  const generateSizeItems = () => {
    return ["XXS", "XL", "XS", "S", "M", "L", "XXL", "3XL", "4XL"].map(
      (size) => (
        <div
          className="text-[#3C4242] flex justify-center items-center w-[58px] h-9 rounded-lg border-solid border-2 border-[#BEBCBD] cursor-pointer"
          onClick={() => handleSizeClick(size)}
          key={size}
          id={size}
          style={{
            backgroundColor: sizes.includes(size) ? "#807d7e" : "#fff",
            color: sizes.includes(size) ? "#fff" : "#807d7e",
          }}
        >
          {size}
        </div>
      )
    );
  };

  const handleSizeClick = (addedSize) => {
    const newSizes = sizes.includes(addedSize)
      ? sizes.filter((size) => size !== addedSize)
      : [...sizes, addedSize];

    handleChange("sizes", newSizes);

    const divElement = document.getElementById(`${addedSize}`);
    if (sizes.includes(addedSize)) {
      divElement.style.backgroundColor = "#fff";
      divElement.style.color = "#807d7e";
    } else {
      divElement.style.backgroundColor = "#807d7e";
      divElement.style.color = "#fff";
    }
  };

  return (
    <div>
      <div className={`flex gap-[20px] flex-wrap`}>{generateSizeItems()}</div>
      <Divider className="h-px opacity-[0.4] bg-[#bebcbd] !mb-0" />
    </div>
  );
};

export default Shop;

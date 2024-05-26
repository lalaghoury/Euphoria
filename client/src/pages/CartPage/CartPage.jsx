import React, { useState } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Divider, Flex, Image, Input, Spin, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Title from "antd/es/typography/Title";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks, useCartEffect } from "../../redux/slices/cartSlice";
import Paragraph from "antd/es/typography/Paragraph";
import emptyCart from "../../assets/images/emptyCart.png";

const CartPage = () => {
  useCartEffect();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");
  const { data: cart, loading } = state;

  const handleUpdateQuantity = (productId, quantity, price) => {
    dispatch(cartThunks.updateQuantity({ productId, quantity, price }));
  };

  const handleDelete = (itemId) => {
    dispatch(cartThunks.deleteCartItem(itemId));
  };

  const applyCoupon = async () => {
    dispatch(cartThunks.applyCoupon(couponCode));
    setCouponCode("");
  };

  if (!cart.items)
    return (
      <Spin
        size="large"
        className="w-full h-screen flex items-center justify-center"
        spinning={loading}
      />
    );

  return (
    <Spin spinning={loading} tip="Loading...">
      <AppLayout>
        {cart?.items?.length > 0 ? (
          <div>
            <Title>Cart</Title>

            <div>
              <Table
                dataSource={cart?.items}
                pagination={false}
                rowKey={(record) => record._id}
                columns={[
                  {
                    title: "Product Details",
                    dataIndex: "productId",
                    key: "details",
                    render: (productId) => (
                      <div className="flex gap-3 items-center justify-between w-full">
                        <span style={{ width: 90 }}>
                          <Image
                            src={productId?.thumbnail}
                            alt={productId?.name}
                            width={90}
                            height={90}
                            className="rounded-[9px] object-center"
                            fallback="https://via.placeholder.com/90x90"
                          />
                        </span>
                        <span style={{ flex: 1 }}>
                          <Title level={5}>{productId?.name}</Title>
                        </span>
                      </div>
                    ),
                  },
                  {
                    title: "Price",
                    dataIndex: "productId",
                    key: "price",
                    render: (productId) => productId?.price,
                  },
                  {
                    title: "Quantity",
                    dataIndex: "quantity",
                    key: "quantity",
                    render: (quantity, record) => (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Button
                          style={{ marginRight: 8 }}
                          disabled={quantity === 1}
                          onClick={() =>
                            handleUpdateQuantity(
                              record.productId?._id,
                              quantity - 1,
                              record.productId?.price
                            )
                          }
                        >
                          -
                        </Button>
                        <span>{quantity}</span>
                        <Button
                          style={{ marginLeft: 8 }}
                          onClick={() =>
                            handleUpdateQuantity(
                              record.productId?._id,
                              quantity + 1,
                              record.productId?.price
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    ),
                  },
                  {
                    title: "Shipping",
                    dataIndex: "productId",
                    key: "shipping",
                    render: (productId) =>
                      productId.shipping === 0 ? "Free" : productId.shipping,
                  },
                  {
                    title: "Remove",
                    dataIndex: "productId",
                    key: "remove",
                    render: (_, record) => (
                      <>
                        <Button
                          type="warning"
                          color="#8A33FD"
                          icon={<DeleteOutlined />}
                          onClick={() => handleDelete(record._id)}
                        />
                      </>
                    ),
                  },
                ]}
              />
            </div>

            <Flex
              justify="space-between"
              style={{
                width: "100%",
                background: "#F6F6F6",
              }}
              className={`p-10 ${cart.couponApplied && "place-content-end"}`}
            >
              {!cart.couponApplied && (
                <Flex vertical gap={30} style={{ width: "35%" }}>
                  <Flex vertical gap={10}>
                    <Title level={3}>Discount Codes</Title>
                    <p>Enter your coupon code if you have one.</p>
                  </Flex>
                  <Flex>
                    <Input
                      style={{
                        padding: "0 0 0 10px",
                        border: "1px solid #ccc",
                        borderRadius: 5,
                      }}
                      suffix={
                        <>
                          <Button type="primary" onClick={() => applyCoupon()}>
                            Apply Coupon
                          </Button>
                        </>
                      }
                      placeholder="Enter your coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </Flex>
                </Flex>
              )}
              <PriceDetails useWidth={"33%"} />
            </Flex>
          </div>
        ) : (
          <EmptyCart />
        )}
      </AppLayout>
    </Spin>
  );
};

export const PriceDetails = ({
  useWidth = "100%",
  useClassName = "",
  showPlaceOrder = true,
}) => {
  const { data: cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const shipping = 0;

  return (
    <div style={{ width: useWidth }}>
      <Flex
        justify="center"
        vertical
        align="flex-start"
        className={useClassName}
      >
        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Flex align="center" gap={4}>
            <Title level={5} style={{ margin: 0 }}>
              Price
            </Title>
            <Paragraph style={{ margin: 0 }}>
              ( {cart?.items?.length} items )
            </Paragraph>
          </Flex>
          <Title level={5} style={{ margin: 0 }}>
            ${cart?.price}
          </Title>
        </Flex>
        <Divider className="sm-divider" />

        {cart?.savings !== 0 && (
          <>
            {" "}
            <Flex
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Title level={5} style={{ margin: 0 }}>
                Savings
              </Title>
              <Title level={5} style={{ margin: 0, marginBottom: 5 }}>
                -${cart?.savings}
              </Title>
            </Flex>
            <Divider className="sm-divider" />
          </>
        )}

        <Flex align="center" justify="space-between" style={{ width: "100%" }}>
          <Title level={5} style={{ margin: 0 }}>
            Shipping
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            +${shipping}
          </Title>
        </Flex>
        <Divider className="sm-divider" />

        <Flex
          align="center"
          justify="space-between"
          style={{ width: "100%", marginTop: 25 }}
        >
          <Title level={5} style={{ margin: 0 }}>
            Total
          </Title>
          <Title level={5} style={{ margin: 0 }}>
            ${cart?.total + shipping}
          </Title>
        </Flex>
        <Divider className="sm-divider" />

        {showPlaceOrder && (
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={() => navigate("/checkout")}
            block
          >
            Proceed to Checkout
          </Button>
        )}
      </Flex>
    </div>
  );
};

const EmptyCart = () => {
  const navigate = useNavigate();
  return (
    <div className="dis-fcc">
      <Flex
        vertical
        gap={12}
        style={{ width: "100%", borderRadius: 12 }}
        align="center"
      >
        <Image
          src={emptyCart}
          alt="empty cart img"
          width={450}
          height={300}
          style={{ objectFit: "contain" }}
          preview={false}
        />
        <Title>Your cart is empty and sad :(</Title>
        <Paragraph>Add something to make it happy!</Paragraph>
        <Button onClick={() => navigate("/shop")} type="primary">
          Continue Shopping
        </Button>
      </Flex>
    </div>
  );
};

export default CartPage;

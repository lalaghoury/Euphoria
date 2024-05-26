import React from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import { Button, Card, Divider, Flex, Image, Segmented, Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useOrderEffect } from "../../redux/slices/orderSlice";
import { useSelector } from "react-redux";
import Typography from "antd/es/typography/Typography";
import { Link, useNavigate } from "react-router-dom";

const MyOrders = () => {
  useOrderEffect();
  const navigate = useNavigate();
  const { data: orders, loading } = useSelector((state) => state.orders);

  return (
    <div>
      <Spin size="large" spinning={loading} tip="Loading...">
        <Title>My Orders</Title>
        <Segmented
          block
          options={["Active", "Cancelled", "Completed"]}
          defaultValue={"Active"}
          onChange={(value) => {
            console.log(value);
          }}
          size={"large"}
        />
        <Divider />
        {orders && orders.length > 0 ? (
          <>
            <Flex vertical>
              {orders?.map((order) => (
                <>
                  <div
                    className="bg-sec p-5 rounded-lg  mt-2 flex flex-col gap-y-3"
                    key={order._id}
                  >
                    <p>Order no: #{order._id}</p>
                    <Flex justify="space-between" align="center">
                      <div>
                        Order Date:
                        <Typography.Text className="m-0 px-1">
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )}
                        </Typography.Text>
                        <p>Estimated Delivery Date : 8 June 2023</p>
                      </div>
                      <div>
                        Order Status :{" "}
                        <Typography.Text className="m-0 px-1">
                          {order.status}
                        </Typography.Text>
                        <p>Payment Method : {order?.payment?.cardType} </p>
                      </div>
                    </Flex>
                  </div>
                  <Flex vertical gap={20}>
                    {order?.products.length > 0 &&
                      order?.products.map((product) => (
                        <Card key={product?.productId?._id} className="w-full">
                          <Flex gap={30} align="center">
                            <Image
                              src={product?.productId?.thumbnail}
                              width={110}
                              height={110}
                              fallback="https://via.placeholder.com/110"
                            />
                            <Flex
                              align="center"
                              justify="space-between"
                              style={{ flex: 1 }}
                            >
                              <div className="text-[#3c4242] font-['Causten'] font-semibold">
                                <h1>{product?.productId?.name}</h1>
                                <h1>
                                  Colour :{" "}
                                  <span className="text-[#bebcbd] text-center  text-sm  ">
                                    {product?.color}
                                  </span>
                                </h1>
                                <h1>
                                  Qty :{" "}
                                  <span className="text-[#bebcbd] text-center  text-sm  ">
                                    {product?.quantity}
                                  </span>
                                </h1>
                              </div>
                              <Flex gap={20} align="center">
                                {/* <Typography.Text className="op-7">
                                  {product?.currency === "USD"
                                    ? `$${product?.price}`
                                    : product?.currency === "PKR"
                                    ? `Rs. ${product?.price}`
                                    : product?.currency === "EUR"
                                    ? `€${product?.price}`
                                    : product?.currency === "RON"
                                    ? `lei ${product?.price}`
                                    : "UNKNOWN CURRENCY"}
                                </Typography.Text>{" "} */}
                                <Button
                                  type="primary"
                                  onClick={() =>
                                    navigate(
                                      `/profile/order-details/${order?._id}`
                                    )
                                  }
                                >
                                  View Detail
                                </Button>
                              </Flex>
                            </Flex>
                          </Flex>
                        </Card>
                      ))}
                  </Flex>
                </>
              ))}
            </Flex>
          </>
        ) : (
          <p>No orders found</p>
        )}
      </Spin>
    </div>
  );
};

export default MyOrders;

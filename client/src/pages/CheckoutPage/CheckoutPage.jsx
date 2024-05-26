import React, { useEffect, useState } from "react";
import AppLayout from "../../config/AppLayout/AppLayout";
import DropIn from "braintree-web-drop-in-react";
import {
  Spin,
  Form,
  Input,
  Button,
  Select,
  Flex,
  Radio,
  Divider,
  message,
  Image,
  Space,
} from "antd";
import CommonHeading from "../../components/CommonHeading/CommonHeading";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { cartThunks, useCartEffect } from "../../redux/slices/cartSlice";
import { PriceDetails } from "../CartPage/CartPage";
import {
  addressThunks,
  useAddressEffect,
} from "../../redux/slices/addressSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

const CheckoutPage = () => {
  useAddressEffect();
  useCartEffect();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const { data: cart, loading } = useSelector((state) => state.cart);
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [shippingAddress, setShippingAddress] = useState(null);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.API_URL}/checkout/token`
        );
        if (data.success) {
          setClientToken(data.clientToken);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToken();
  }, []);

  const handlePayment = async () => {
    try {
      if (!shippingAddress) {
        message.info("Please add a billing address before making payment");
        return;
      }

      if (!billingAddress) {
        message.info("Please add a shipping address before making payment");
        return;
      }

      const products = cart?.items?.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      }));

      if (!instance) {
        throw new Error("Drop-in instance not available");
      }
      const { nonce } = await instance.requestPaymentMethod();

      dispatch(
        cartThunks.handlePayment({
          nonce,
          amount: cart.total,
          products,
          shipping_address: shippingAddress,
          billing_address: billingAddress,
          navigate,
        })
      );
    } catch (error) {
      console.error("Payment Error:", error.message);
      message.error("Payment Error: " + error.message);
    }
  };

  return (
    <AppLayout>
      <Flex justify="space-between">
        <div className="left" style={{ width: "60%" }}>
          <CommonHeading text={"Check Out"} />

          <Flex vertical gap={25}>
            {/* <BillingDetails /> */}

            <BillingAddress
              billingAddress={billingAddress}
              setBillingAddress={setBillingAddress}
            />

            {/* Address List */}

            <ShippingAddress
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
            />

            {/* <ShippingDetails /> */}

            <ShippingMethod />

            {/* <PaymentMethod /> */}

            <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
              <Title>Payment Method</Title>
              <Paragraph>All transactions are secure and encrypted.</Paragraph>

              <div className="w-full h-full bg-[#F6F6F6] rounded-[12px] p-5">
                <Radio.Group
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  <Radio value="card">
                    <Paragraph style={{ fontWeight: "bold", margin: 0 }}>
                      Credit Card
                    </Paragraph>

                    <Paragraph>We accept all major credit cards.</Paragraph>
                  </Radio>

                  {paymentMethod === "card" && (
                    <div style={{ width: "100%", height: "100%" }}>
                      <DropIn
                        options={{
                          authorization: clientToken,
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />
                    </div>
                  )}
                  <Divider />
                  <Radio value="cod">
                    <Paragraph style={{ fontWeight: "bold", margin: 0 }}>
                      Cash on delivery
                    </Paragraph>
                    <Paragraph>Pay with cash upon delivery.</Paragraph>
                  </Radio>
                </Radio.Group>
              </div>
            </Flex>

            <Button
              onClick={handlePayment}
              loading={loading}
              disabled={!instance || (paymentMethod === "card" && !instance)}
              type="primary"
            >
              Place Order
            </Button>
          </Flex>
        </div>
        <div className="right" style={{ width: "35%" }}>
          <CartSummary />
        </div>
      </Flex>
    </AppLayout>
  );
};

const ShippingAddress = ({ shippingAddress, setShippingAddress }) => {
  const [selectedOption, setSelectedOption] = useState("billing");
  const dispatch = useDispatch();

  const onFinish = (values) => {
    values = { ...values, address_type: "billing" };
    dispatch(addressThunks.addAddress({ values, url: `/address/new` }));
  };

  const { loading: addressLoading, data: addresses } = useSelector(
    (state) => state.addresses
  );

  const ShippingAddresses = addresses.filter(
    (obj) => obj.address_type !== "billing"
  );

  if (selectedOption === "billing") {
    setShippingAddress("billing");
  }

  return (
    <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
      <Title>Shipping Address</Title>
      <Paragraph>
        Select the address that matches your card or payment method.
      </Paragraph>
      <div className="w-full h-full bg-[#F6F6F6] rounded-[20px] p-5">
        <Radio.Group
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <Radio value="billing" className="bold">
            Same as Billing address
          </Radio>

          <Radio value="shipping" className="bold">
            My shipping addresses
          </Radio>

          {selectedOption === "shipping" && (
            <div>
              {ShippingAddresses.length > 0 ? (
                <Radio.Group
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  className="flex flex-col gap-10 ml-5"
                >
                  {ShippingAddresses.map((address) => (
                    <Radio
                      value={address?._id}
                      key={address?._id}
                      className="bold"
                    >
                      <div>
                        {address?.address_line_1}, {address?.city}
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              ) : (
                <h4 className="text-center text-2xl">No Address Found</h4>
              )}
            </div>
          )}

          <Divider />
          <Radio value="new-address" className="bold">
            Use a different shipping address
          </Radio>
        </Radio.Group>
        {/* New Address */}
        {selectedOption && selectedOption === "new-address" && (
          <div>
            <Title className="mt-20">New Shipping Address</Title>
            <AddAddressForm
              onFinish={onFinish}
              loading={addressLoading}
              handleCancel={() => setSelectedAddress(null)}
            />
          </div>
        )}
      </div>
    </Flex>
  );
};

const BillingAddress = ({ billingAddress, setBillingAddress }) => {
  const [selectedOption, setSelectedOption] = useState("existing");
  const dispatch = useDispatch();

  const onFinish = (values) => {
    values = { ...values, address_type: "billing" };
    dispatch(addressThunks.addAddress({ values, url: `/address/new` }));
  };

  const { loading: addressLoading, data: addresses } = useSelector(
    (state) => state.addresses
  );

  const billingAddresses = addresses.filter(
    (obj) => obj.address_type === "billing"
  );

  return (
    <Flex vertical className="w-full rounded-[12px]">
      <Title>Billing Details</Title>

      <div className="w-full bg-[#F6F6F6] rounded-[20px] p-[50px]">
        <Radio.Group
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="flex flex-col gap-2"
        >
          <Title level={5}>Select Billing Details</Title>
          <Divider />

          <Radio value="existing" className="bold">
            Use existing Billing details
          </Radio>

          {selectedOption === "existing" && (
            <div>
              {billingAddresses.length > 0 ? (
                <Radio.Group
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                  className="flex flex-col gap-10 ml-5"
                >
                  {billingAddresses.map((address) => (
                    <Radio
                      value={address._id}
                      key={address._id}
                      className="bold"
                    >
                      <div>
                        {address.address_line_1}, {address.city}
                      </div>
                    </Radio>
                  ))}
                </Radio.Group>
              ) : (
                <Title level={3}>No Address Found</Title>
              )}
            </div>
          )}

          <Radio value="new" className="bold">
            Or add new billing details
          </Radio>
        </Radio.Group>

        {selectedOption === "new" && (
          <div>
            <Title>Add Billing Details</Title>
            <AddAddressForm
              onFinish={onFinish}
              loading={addressLoading}
              handleCancel={() => selectedOption("existing")}
            />
          </div>
        )}
      </div>
    </Flex>
  );
};

const ShippingMethod = () => {
  return (
    <Flex vertical gap={12} style={{ width: "100%", borderRadius: 12 }}>
      <Title>Shipping Method</Title>
      <div className="w-full h-full bg-[#F6F6F6] rounded-[12px] p-5">
        <Paragraph className="bold">Arrives by Monday, June 7</Paragraph>
        <Divider />
        <Flex align="center" justify="space-between">
          <Paragraph className="bold">Delivery Charges</Paragraph>
          <Paragraph className="bold">$ 5.00</Paragraph>
        </Flex>
        <Paragraph>Additional fess may apply</Paragraph>
      </div>
    </Flex>
  );
};

const CartSummary = () => {
  const cart = useSelector((state) => state.cart);
  const { items, loading } = cart;
  return (
    <Spin spinning={loading} tip="Loading...">
      <Title className="p-20">Order Summary</Title>
      <Flex className="p-20" gap={20} vertical>
        {items?.map((item) => (
          <div
            key={item.productId._id}
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <span style={{ width: 90 }}>
              <Image
                src={item.productId.images[0].url}
                alt={item.productId.name}
                width={90}
                height={90}
                style={{ objectFit: "center", borderRadius: "9px" }}
                fallback="https://via.placeholder.com/90x90"
              />
            </span>
            <span style={{ flex: 1 }}>
              <Flex align="center" justify="space-between">
                <Title level={5}>{item.productId.name}</Title>
                <Paragraph>${item.productId.price}</Paragraph>
              </Flex>
            </span>
          </div>
        ))}
      </Flex>
      <PriceDetails useClassName={"p-20"} showPlaceOrder={false} />
    </Spin>
  );
};

export const AddAddressForm = ({
  onFinish,
  initialValues = {},
  loading,
  handleCancel,
  text = "Add Address",
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      name="billing-details-form"
      form={form}
      layout="vertical"
      onFinish={(values) =>
        onFinish({ ...values, _id: initialValues?._id || null })
      }
      initialValues={initialValues}
    >
      <Flex gap={20} justify="space-between">
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="First Name" />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="Last Name" />
        </Form.Item>
      </Flex>

      <Form.Item
        label="Country/Region"
        name="country"
        style={{ width: "100%" }}
        rules={[
          {
            required: true,
            message: "Please select your country/region!",
          },
        ]}
      >
        <Select
          className="select"
          placeholder="Select country/region"
          style={{ width: "100%" }}
        >
          <Select.Option value="USA">USA</Select.Option>
          <Select.Option value="UK">UK</Select.Option>
          <Select.Option value="Canada">Canada</Select.Option>
        </Select>
      </Form.Item>

      <Flex gap={20} justify="space-between">
        <Form.Item
          label="Street"
          name="street"
          rules={[{ required: true, message: "Please enter your street!" }]}
          style={{ width: "100%" }}
        >
          <Input
            className="input-md"
            placeholder="House number and street name"
          />
        </Form.Item>

        <Form.Item
          label="Apt, suite, unit"
          name="appartment"
          style={{ width: "100%" }}
        >
          <Input
            className="input-md"
            placeholder="apartment, suite, unit, etc. (optional)"
          />
        </Form.Item>
      </Flex>

      <Form.Item
        label="Adress Line 1"
        name="address_line_1"
        rules={[
          {
            required: true,
            message: "Please add atleast Adress Line 1!",
          },
        ]}
        style={{ width: "100%" }}
      >
        <Input
          className="input-md"
          placeholder="House number and street name"
        />
      </Form.Item>

      <Form.Item
        label="Adress Line 2"
        name="address_line_2"
        style={{ width: "100%" }}
      >
        <Input
          className="input-md"
          placeholder="House number and street name"
        />
      </Form.Item>

      <Flex gap={20} justify="space-between">
        <Form.Item
          label="City"
          name="city"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="City" />
        </Form.Item>

        <Form.Item
          label="State"
          name="state"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="State" />
        </Form.Item>

        <Form.Item
          label="Pin Code"
          name="pincode"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="Pin Code" />
        </Form.Item>
      </Flex>

      <Flex gap={20} justify="space-between">
        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Input className="input-md" placeholder="Phone" />
        </Form.Item>

        <Form.Item
          label="Address Type"
          name="address_type"
          rules={[{ required: true }]}
          style={{ width: "100%" }}
        >
          <Select
            className="select"
            placeholder="Select Address Type"
            style={{ width: "100%" }}
          >
            <Select.Option value="billing">Billing</Select.Option>
            <Select.Option value="shipping">Shipping</Select.Option>
          </Select>
        </Form.Item>
      </Flex>

      <Flex gap={20}>
        <Form.Item>
          <Button disabled={loading} type="primary" htmlType="submit">
            {loading ? (
              <Space align="center" gap={5}>
                Loading... <LoadingOutlined />
              </Space>
            ) : (
              text
            )}
          </Button>
        </Form.Item>

        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default CheckoutPage;

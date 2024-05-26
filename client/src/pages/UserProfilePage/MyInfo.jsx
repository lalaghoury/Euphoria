import React from "react";
import { Button, Divider, Flex, Form, Input, Modal, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Paragraph from "antd/es/typography/Paragraph";
import {
  addressThunks,
  useAddressEffect,
} from "../../redux/slices/addressSlice";
import { useNavigate } from "react-router-dom";
import { userThunks } from "../../redux/slices/userSlice";
import Title from "antd/es/typography/Title";
import { AddAddressForm } from "../CheckoutPage/CheckoutPage";

const MyInfo = () => {
  return (
    <div>
      <h1 className="w-[183px] h-[31px] text-[#3c4242] font-['Core Sans C'] text-[28px] font-semibold leading-[33px] mb-5">
        My Info
      </h1>
      <ContactDetails />
      <AddressDetails />
    </div>
  );
};

const ContactDetails = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [editable, setEditable] = React.useState(null);
  const [text, setText] = React.useState("");

  const handleEdit = (field) => {
    if (text === user[field]) {
      setEditable(null);
      setText("");
      return;
    }

    Modal.confirm({
      title: `Are you sure you want to update your ${field}?`,
      content: "Once updated, the action cannot be undone.",
      onOk: () => {
        dispatch(
          userThunks.updateUser({
            url: `/users/admin/update/${user?._id}`,
            values: { [field]: text },
          })
        );
      },
    });

    setEditable(null);
    setText("");
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: `Are you sure you want to delete your Account?`,
      content: "Once deleted, the account cannot be recovered.",
      onOk: () => {
        dispatch(
          userThunks.deleteUser({
            url: `/users/delete/${id}`,
          })
        );
      },
    });
  };

  return (
    <Spin size="large" spinning={loading} tip="Loading...">
      <h2 className="mb-[30px] w-[180px] h-[31px] text-[#3c4242] font-['core Sans C'] text-[22px] font-semibold leading-[2.0625rem]">
        Contact Details
      </h2>
      <Divider />
      <Flex vertical>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Your Name
          </h3>
          <Flex className="items-center justify-between">
            {editable === "name" ? (
              <div>
                <p>
                  Your current name is: <strong>{user?.name}</strong>
                </p>
                <p>Please enter your new name:</p>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={text}
                    size="small"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <Button onClick={() => handleEdit("name")}>Change</Button>
                </div>
              </div>
            ) : (
              <>
                <Paragraph>{user?.name}</Paragraph>
              </>
            )}
            {editable === "name" ? (
              <Button
                type="text"
                onClick={() => {
                  setEditable(null), setText("");
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => {
                  setEditable("name"), setText(user?.name);
                }}
              >
                Change
              </Button>
            )}
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Email Address
          </h3>
          <Flex className="items-center justify-between">
            {editable === "email" ? (
              <div>
                <p>
                  Your current Email is: <strong>{user?.email}</strong>
                </p>
                <p>Please Enter Your New Email Below:</p>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={text}
                    size="small"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <Button onClick={() => handleEdit("email")}>Change</Button>
                </div>
              </div>
            ) : (
              <>
                <Paragraph>{user?.email}</Paragraph>
              </>
            )}
            {editable === "email" ? (
              <Button
                type="text"
                onClick={() => {
                  setEditable(null), setText("");
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => {
                  setEditable("email"), setText(user?.email);
                }}
              >
                Change
              </Button>
            )}
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Phone Number
          </h3>
          <Flex className="items-center justify-between">
            {editable === "phone" ? (
              <div>
                <p>
                  Your current Phone is: <strong>{user?.phone}</strong>
                </p>
                <p>Please Enter Your New Phone Below:</p>
                <div className="flex gap-2 mt-2">
                  <Input
                    type="text"
                    value={text}
                    size="small"
                    onChange={(e) => {
                      setText(e.target.value);
                    }}
                  />
                  <Button onClick={() => handleEdit("phone")}>Change</Button>
                </div>
              </div>
            ) : (
              <>
                <Paragraph>{user?.phone}</Paragraph>
              </>
            )}
            {editable === "phone" ? (
              <Button
                type="text"
                onClick={() => {
                  setEditable(null), setText("");
                }}
              >
                Cancel
              </Button>
            ) : (
              <Button
                type="text"
                onClick={() => {
                  setEditable("phone"), setText(user?.phone);
                }}
              >
                Change
              </Button>
            )}
          </Flex>
          <Divider className="sm-divider" />
        </div>
        <div className="flex flex-col gap-y-2">
          <h3 className="text-[#807d7e] font-['Causten'] text-lg font-semibold leading-[normal]">
            Password
          </h3>
          <Flex className="items-center justify-between">
            <Paragraph>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="5"
                  viewBox="0 0 72 5"
                  fill="none"
                >
                  <circle cx="2.4" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="12.0001" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="21.6002" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="31.1998" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="40.7999" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="50.4" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="60.0001" cy="2.40024" r="2.4" fill="#333333" />
                  <circle cx="69.6002" cy="2.40024" r="2.4" fill="#333333" />
                </svg>
              </div>
            </Paragraph>
            <Button type="text" onClick={() => navigate("/forgot-password")}>
              Change
            </Button>
          </Flex>
          <Divider className="sm-divider" />
        </div>
      </Flex>
    </Spin>
  );
};

const AddressDetails = () => {
  useAddressEffect();
  const { data: addresses, loading } = useSelector((state) => state.addresses);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleDelete = (id) => {
    Modal.confirm({
      title: `Are you sure you want to delete your Address?`,
      content: "Once deleted, the Address cannot be recovered.",
      onOk: () => {
        dispatch(
          addressThunks.deleteAddress({
            url: `/address/delete/${id}`,
          })
        );
      },
    });
  };

  const onFinish = (values) => {
    dispatch(
      addressThunks.editAddress({
        values,
        url: `/address/update/${values._id}`,
      })
    );
    !loading && form.resetFields() && Modal.destroyAll();
  };

  const handleCancel = () => {
    form.resetFields();
    Modal.destroyAll();
  };

  const handleEdit = (address) => {
    Modal.info({
      title: "Editing Address",
      width: "70vw",
      content: (
        <>
          <Title level={3}>Editing your {address.address_type} Address</Title>

          <AddAddressForm
            onFinish={onFinish}
            initialValues={address}
            loading={loading}
            handleCancel={handleCancel}
            text={"Update Address"}
          />

          {/* <Form
            name="billing-details-form"
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ ...address }}
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
                rules={[
                  { required: true, message: "Please enter your street!" },
                ]}
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
                    "Update Address"
                  )}
                </Button>
              </Form.Item>

              <Form.Item>
                <Button onClick={() => Modal.destroyAll()}>Cancel</Button>
              </Form.Item>
            </Flex>
          </Form> */}
        </>
      ),
    });
  };

  return (
    <div>
      <Flex justify="space-between" align="center">
        <h2 className="w-[99px] h-[31px] text-[#3c4242] font-['core Sans C '] text-[22px] font-semibold leading-[33px]">
          Address
        </h2>
        <Button type="text">Add New</Button>
      </Flex>
      <Flex gap={25} wrap="wrap">
        {addresses?.map((address) => (
          <div
            key={address?._id}
            className="w-[435px] h-[272px] rounded-[12px] bg-[#F6F6F6] py-[25px] px-[43px] flex flex-col text-[#807d7e] gap-y-5 font-['Causten'] font-medium"
          >
            <h4 className="text-[#3c4242] text-xl font-semibold leading-[normal]">
              {address?.first_name + " " + address?.last_name}
            </h4>
            <p className="leading-[normal]">{address?.phone}</p>
            <p>
              {address?.address_line_1 +
                ", " +
                address?.city +
                ", " +
                address?.state}{" "}
            </p>
            <Flex vertical gap={12}>
              <div className="flex gap-x-3">
                <Button className="dis-fcc gap-2.5 py-[7px] px-[19px] rounded-lg border border-[#807d7e] text-[#807d7e] font-medium w-[85px] h-[37px]">
                  Home
                </Button>
                <Button className="dis-fcc gap-2.5 py-[7px] px-[19px] rounded-lg border border-[#807d7e] text-[#807d7e] font-medium w-[200px] h-[37px]">
                  Default billing address
                </Button>
              </div>
              <Flex className="items-center gap-[10px]">
                <div
                  className="text-[#3c4242] font-semibold cursor-pointer"
                  onClick={() => handleDelete(address?._id)}
                >
                  Remove
                </div>
                <div
                  className="text-[#3c4242] font-semibold cursor-pointer"
                  onClick={() => handleEdit(address)}
                >
                  Edit
                </div>
              </Flex>
            </Flex>
          </div>
        ))}
      </Flex>
    </div>
  );
};

export default MyInfo;

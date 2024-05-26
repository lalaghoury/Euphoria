import React, { useState } from "react";
import { Form, Input, Button, Flex, message, Divider } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ProductDescriptionInput } from "../AllProducts/AddProduct";
import { SingleImageInput } from "../AllCategories/AddCategory";

const AddDressStyle = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     `${process.env.API_URL}/dress-styles/new`,
    //     { ...values, image: values.images[0].url }
    //   );
    //   if (data.success) {
    //     message.success(data.message);
    //     navigate("/dashboard/dress-styles/dress-styles-list");
    //   }
    // } catch (error) {
    //   console.log("Error in Adding Dress Style", error.response.data.message);
    //   message.error(error.response.data.message);
    // } finally {
    //   setLoading(false);
    // }
  };

  const handleCancel = () => {
    form.resetFields();
    navigate(-1);
  };

  return (
    <Form
      initialValues={{ remember: true }}
      onFinish={onFinish}
      form={form}
      layout="vertical"
    >
      <Title level={3}>Add Dress Style</Title>
      {/* Name */}
      <Form.Item
        label="Dress Style Name"
        name="name"
        rules={[
          { required: true, message: "Please input your Dress Style name!" },
        ]}
      >
        <Input className="input-md" placeholder="Dress Style Name" />
      </Form.Item>
      <Divider />

      {/* Slug */}
      <Form.Item
        label="Dress Style Slug"
        name="slug"
        rules={[
          { required: true, message: "Please input your Dress Style slug!" },
        ]}
      >
        <Input className="input-md" placeholder="Dress Style Slug" />
      </Form.Item>
      <Divider />

      {/* Description */}
      <Form.Item
        label="Dress Style Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input your category description!",
          },
        ]}
      >
        <ProductDescriptionInput />
      </Form.Item>

      <Divider />

      {/* Image */}
      <Form.Item
        rules={[
          { required: true, message: "Please upload at least one image" },
        ]}
        name={"image"}
        label={<Title level={5}>Images</Title>}
      >
        <SingleImageInput />
      </Form.Item>

      {/* Buttons */}
      <Flex gap={12} justify="flex-end">
        <Form.Item>
          <Button onClick={handleCancel}>Cancel</Button>
        </Form.Item>
        <Form.Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Add Dress Style
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default AddDressStyle;

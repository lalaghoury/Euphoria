import React, { useState } from "react";
import { Form, Input, Button, Flex, message, Divider, Avatar } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { ProductDescriptionInput } from "../AllProducts/AddProduct";
import Dragger from "antd/es/upload/Dragger";
import { CloudUploadOutlined, LoadingOutlined } from "@ant-design/icons";

const AddCategory = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    console.log("🚀 ~ onFinish ~ values:", values);
    // setLoading(true);
    // try {
    //   const { data } = await axios.post(
    //     `${process.env.API_URL}/categories/new`,
    //     values
    //   );
    //   if (data.success) {
    //     message.success(data.message);
    //     navigate("/dashboard/categories/categories-list");
    //   }
    // } catch (error) {
    //   console.log("Error in Adding Category", error.response.data.message);
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
      <Title level={3}>Add Category</Title>
      {/* Name */}
      <Form.Item
        label="Category Name"
        name="name"
        rules={[
          { required: true, message: "Please input your category name!" },
        ]}
      >
        <Input className="input-md" placeholder="Category Name" />
      </Form.Item>
      <Divider />

      {/* Slug */}
      <Form.Item
        label="Category Slug"
        name="slug"
        rules={[
          { required: true, message: "Please input your category slug!" },
        ]}
      >
        <Input className="input-md" placeholder="Category Slug" />
      </Form.Item>
      <Divider />

      {/* Description */}
      <Form.Item
        label="Category Description"
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
            Add Category
          </Button>
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default AddCategory;

export const SingleImageInput = ({ value = "", onChange }) => {
  const [loading, setLoading] = useState(false);

  const handleUpload = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    if (info.file.status === "done") {
      setLoading(false);
      const imageUrl = info.file.response.imageUrl;
      onChange?.(imageUrl);
    }
  };

  return (
    <Flex vertical gap={30}>
      <Dragger
        accept="image/*"
        style={{ border: "2px dashed rgba(0,0,0,0.1)", opacity: 1 }}
        action={`${process.env.API_URL}/images/single`}
        onChange={handleUpload}
        maxCount={1}
      >
        <>
          {loading ? (
            <Flex
              gap={4}
              align="center"
              justify="center"
              style={{ height: 200 }}
            >
              <span>Uploading image...</span>
              <LoadingOutlined style={{ fontSize: 64 }} />
            </Flex>
          ) : (
            <Flex
              gap={4}
              align="center"
              justify="center"
              style={{ height: 200 }}
            >
              <p className="ant-upload-drag-icon">
                <Avatar size={64}>
                  <CloudUploadOutlined style={{ fontSize: 32 }} />
                </Avatar>
              </p>
              <Flex vertical gap={4}>
                <p className="ant-upload-text">
                  Click or upload or drag and drop
                </p>
                <p className="ant-upload-hint">
                  (SVG, JPG, PNG, or gif maximum 900x400)
                </p>
              </Flex>
            </Flex>
          )}
        </>
      </Dragger>

      <Divider />
    </Flex>
  );
};

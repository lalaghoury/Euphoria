import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  Upload,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProduct.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  CloudUploadOutlined,
  DeleteOutlined,
  InfoOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import axios from "axios";
import {
  ColorsInput,
  ImageInput,
  ProductDescriptionInput,
  SizesInput,
} from "../AllProducts/AddProduct";
const { Title } = Typography;
const { Option } = Select;

const currencies = [
  {
    name: "USD",
  },
  {
    name: "EUR",
  },
  {
    name: "RON",
  },
  {
    name: "PKR",
  },
];

const EditProduct = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoriesNames, setCategoriesNames] = useState([]);
  const [product, setProduct] = useState({});
  const [DressStyleNames, setDressStyleNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: categoryData } = await axios.get(
          `${process.env.API_URL}/categories/names`
        );
        if (categoryData.success) {
          setCategoriesNames(categoryData.categoriesNames);
        }
        const { data: dressData } = await axios.get(
          `${process.env.API_URL}/dress-styles/names`
        );
        if (dressData.success) {
          setDressStyleNames(dressData.DressStylesNames);
        }
        const { data: productData } = await axios.get(
          `${process.env.API_URL}/products/${id}`
        );
        if (productData.success) {
          const product = await productData.product;
          setProduct(product);
          setSelectedThumbnail(product.thumbnail);
          form.setFieldsValue({
            name: product.name,
            description: product.description,
            price: product.price,
            quantity: product.quantity,
            handle: product.handle,
            sku: product.sku,
            tags: product.tags,
            category: product.category,
            dressStyle: product.dressStyle,
            allow_backorder: product.allow_backorder,
            height: product.height,
            width: product.width,
            length: product.length,
            weight: product.weight,
            currency: product.currency,
            barcode: product.barcode,
            images: product.images,
            colors: product.colors,
            sizes: product.sizes,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (!product) return <div>Product not found!</div>;

  const handleCancel = () => {
    form.resetFields();
    navigate("/dashboard/products/products-list");
  };

  const hasImagesChanged = (formImages, productImages2) => {
    const valuesImages = [formImages] || [];
    const productImages = [productImages2] || [];
    const valuesImagesString = valuesImages.join(",");
    const productImagesString = productImages.join(",");
    return valuesImagesString !== productImagesString;
  };

  const checkDirtyness = (values, product, form) => {
    const formFieldsHaveChanged = Object.keys(values)
      .filter((field) => field !== "images")
      .some((field) => {
        const formValue = form.getFieldValue(field);
        const productValue = product[field];
        return form.isFieldTouched(field) && formValue !== productValue;
      });

    const imagesChanged = hasImagesChanged(values.images, product.images);

    return formFieldsHaveChanged || imagesChanged;
  };

  const onFinish = async (values) => {
    setLoading(true);
    const dirtynessResult = checkDirtyness(values, product, form);
    if (dirtynessResult === true) {
      values.handle = values.handle.replace(/\s+/g, "-").replace(/[\s-]+$/, "");
      values.images = values.images.filter((image) => image !== "");
      values.sku = values.sku.replace(/\s/g, "");
      if (!values.sku) values.sku = Math.random().toString(36).substr(2, 5);

      try {
        const response = await axios.put(
          `${process.env.API_URL}/products/edit/${id}`,
          {
            ...values,
            thumbnail: selectedThumbnail,
          }
        );
        const data = await response.data;
        if (data.success) {
          message.success(data.message);
          navigate("/dashboard/products/products-list");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error updating product:", error.response.data.message);
        message.error(error.response.data.message);
        setLoading(false);
      }
    } else {
      message.warning("No changes have been made!");
      setLoading(false);
    }
  };

  return (
    <div className="add-product">
      <Title>Update product</Title>

      <Form
        form={form}
        scrollToFirstError={true}
        onFinish={onFinish}
        className="add-product-form"
        layout="vertical"
        validateTrigger="onSubmit"
      >
        <Title level={5}>Basic information</Title>

        {/* Product name */}
        <Flex gap={20} justify="space-between">
          <Form.Item
            label="Product name"
            name="name"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input className="input-md" placeholder="Product Name" />
          </Form.Item>
          <Form.Item
            label="Handle"
            name="handle"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Input className="input-md" placeholder="Handle Name" />
          </Form.Item>
        </Flex>

        <Flex gap={20} justify="space-between">
          {/* Category */}
          <Form.Item
            label="Category"
            name="category"
            className="select"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Select style={{ width: "100%" }}>
              {categoriesNames.map((categoryName) => (
                <Option value={categoryName._id} key={categoryName._id}>
                  {categoryName.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* DressStyle */}
          <Form.Item
            className="select"
            label="Dress Style"
            name="dressStyle"
            rules={[{ required: true }]}
            style={{ width: "100%" }}
          >
            <Select style={{ width: "100%" }}>
              {DressStyleNames.map((DressStyleObj) => (
                <Option value={DressStyleObj._id} key={DressStyleObj._id}>
                  {DressStyleObj.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Flex>

        {/* Description */}
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter a description" }]}
          style={{ width: "100%" }}
        >
          <ProductDescriptionInput />
        </Form.Item>

        <Divider />

        <Title level={5}>Pricing</Title>
        {/* Price and currency */}
        <div style={{ width: "50%" }}>
          <Flex gap={20}>
            <Form.Item label="Price" name="price" style={{ width: 150 }}>
              <InputNumber style={{ width: 150 }} className="input-md" />
            </Form.Item>

            <Form.Item
              label="Currency"
              name="currency"
              rules={[
                {
                  required: true,
                  message: "Please select a currency",
                },
              ]}
              style={{ width: 100 }}
            >
              <Select style={{ width: 100 }}>
                {currencies.map((currency) => (
                  <Option value={currency.name} key={currency.name}>
                    {currency.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Flex>
        </div>

        <Divider />

        {/* Images */}
        <Form.Item
          rules={[
            { required: true, message: "Please upload at least one image" },
          ]}
          name={"images"}
          label={<Title level={5}>Images</Title>}
        >
          <ImageInput
            selectedThumbnail={selectedThumbnail}
            setSelectedThumbnail={setSelectedThumbnail}
          />
        </Form.Item>

        <Divider />

        <Title level={5}>General information</Title>
        <div className="general-info">
          {/* Colors and sizes */}
          <div className="flex gap-5 w-[80%] mt-5">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select at least one Color",
                },
              ]}
              name={"colors"}
            >
              <ColorsInput />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please select at least one Size",
                },
              ]}
              name={"sizes"}
            >
              <SizesInput />
            </Form.Item>
          </div>
        </div>

        <Title level={5}>Stock & inventory</Title>
        {/* SKU and barcode */}
        <Flex gap={20} justify="space-between">
          <Form.Item
            name="sku"
            label="Stock keeping unit (SKU)"
            style={{ width: "100%" }}
          >
            <Input className="input-md" placeholder="401_1BBXBK" />
          </Form.Item>
          <Form.Item
            name="barcode"
            label="Barcode (EAN)"
            style={{ width: "100%" }}
            rules={[
              {
                required: true,
                message: "Please input the barcode for stock and inventory!",
              },
              {
                pattern: /^\d{13}$/,
                message: "Barcode should be 13 digits long",
              },
            ]}
          >
            <Input
              className="input-md"
              placeholder="e.g. 00123456789012"
              onBlur={(e) => {
                const value = e.target.value;
                if (value.length === 13 && !/^\d{13}$/.test(value)) {
                  form.setFields([
                    { name: "barcode", errors: ["Invalid barcode format"] },
                  ]);
                }
              }}
            />
          </Form.Item>{" "}
        </Flex>

        {/* Quantity && Allow backorder && Keep selling when stock is empty */}
        <div style={{ width: "50%" }}>
          <Form.Item
            name="quantity"
            label="Quantity"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input the quantity" }]}
          >
            <InputNumber
              className="input-md"
              placeholder="e.g. 00123456789012"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Flex align="center">
            <Form.Item name="allow_backorder" valuePropName="checked">
              <Checkbox>Allow backorders </Checkbox>
            </Form.Item>

            <Tooltip title="Keep selling when stock is empty">
              <InfoOutlined
                style={{
                  marginLeft: "5px",
                  backgroundColor: "#222",
                  padding: "2px",
                  borderRadius: "50%",
                  color: "#ffffff",
                  opacity: "0.8",
                  marginBottom: 24,
                }}
              />{" "}
            </Tooltip>
          </Flex>
        </div>

        {/* Dimensions */}
        <Flex gap={20} justify="space-between">
          <Form.Item
            name="height"
            label="Height"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input the height" }]}
          >
            <InputNumber
              className="input-md"
              placeholder="e.g 25"
              style={{ width: "100%" }}
              suffix={<span style={{ marginRight: 30 }}>cm</span>}
            />
          </Form.Item>

          <Form.Item
            name="width"
            label="Width"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input the width" }]}
          >
            <InputNumber
              className="input-md"
              placeholder="e.g 15"
              suffix={<span style={{ marginRight: 30 }}>cm</span>}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Flex>

        <Flex gap={20} justify="space-between">
          <Form.Item
            name="length"
            label="Length"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input the length" }]}
          >
            <InputNumber
              className="input-md"
              placeholder="e.g 5"
              suffix={<span style={{ marginRight: 30 }}>cm</span>}
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="weight"
            label="Weight"
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please input the weight" }]}
          >
            <InputNumber
              className="input-md"
              placeholder="e.g 0.25"
              suffix={<span style={{ marginRight: 30 }}>kg</span>}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Flex>

        {/* Buttons */}
        <Flex gap={12} justify="flex-end">
          <Form.Item>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </div>
  );
};

export default EditProduct;

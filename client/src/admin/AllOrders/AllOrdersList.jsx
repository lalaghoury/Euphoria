import React, { useEffect } from "react";
import {
  Table,
  Tag,
  message,
  Image,
  Modal,
  Flex,
  Divider,
  Button,
  Form,
  Select,
  Spin,
} from "antd";
import Title from "antd/es/typography/Title";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { orderThunks } from "../../redux/slices/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const AllOrdresList = () => {
  let number = 1;
  const dispatch = useDispatch();
  const { data: orders, loading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(orderThunks.getAllOrders());
  }, [dispatch]);

  const handleEdit = (record) => {
    let modal = null;

    modal = Modal.info({
      title: "Products",
      width: "70vw",
      content: (
        <>
          <Title>Edit Order #{record?.order?.number}</Title>

          <Title level={3}>Products Summary</Title>
          <Table
            dataSource={record.products.map((product) => ({
              key: product._id,
              name: product.productId.name,
              price: `$${product.productId.price}`,
              quantity: product.quantity,
              amount: `$${product.productId.price * product.quantity}`,
            }))}
            columns={[
              { title: "Name", dataIndex: "name" },
              { title: "Price", dataIndex: "price" },
              { title: "Quantity", dataIndex: "quantity" },
              { title: "Amount", dataIndex: "amount" },
            ]}
          />

          <Form
            layout="vertical"
            className="mt-5"
            onFinish={(values) =>
              dispatch(
                orderThunks.updateOrders({
                  status: values.status,
                  id: record.key,
                })
              )
            }
          >
            <Form.Item
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select defaultValue={record.status}>
                {[
                  "Not Processed",
                  "Processing",
                  "Shipped",
                  "Delivered",
                  "Cancelled",
                ].map((status) => (
                  <Select.Option key={status} value={status}>
                    {status}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      ),
    });
  };

  const handleDelete = (record) => {
    console.log(record);
  };

  const columns = [
    {
      title: "Order",
      dataIndex: "order",
      render: (order) => (
        <>
          <Flex gap={5} className="items-center ">
            <Flex
              vertical
              className="rounded p-2 items-center "
              style={{ backgroundColor: "#F9FAFB" }}
            >
              <div>{order.createdAt.split(" ")[0]}</div>
              <div>{order.createdAt.split(" ")[1]}</div>
            </Flex>
            <Flex vertical className="rounded p-2 ml-1">
              <Link
                className="link"
                to={`/dashboard/order-details/${order._id}`}
              >
                ORD- {order.number}
              </Link>
              <div>
                {order.length} products • ${order.amount.toFixed(2)}
              </div>
            </Flex>
          </Flex>
        </>
      ),
    },
    {
      title: "	Payment Method",
      dataIndex: "payment",
      render: (payment) => (
        <Flex gap={5} className="items-center">
          <Image src={payment.image} alt={payment.name} preview={false} />
          <p>{payment.name}</p>
        </Flex>
      ),
    },
    {
      title: "Customer",
      dataIndex: "user",
      render: (user) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <span style={{ width: 60 }}>
            <Image
              src={user.avatar}
              alt={user.name}
              width={50}
              height={50}
              style={{ objectFit: "center", borderRadius: "9px" }}
              fallback="https://via.placeholder.com/50x50"
              preview={false}
            />
          </span>
          <span style={{ flex: 1 }}>
            <Title style={{ margin: 0 }} level={5}>
              {user.name}
            </Title>
            <p>{user.email}</p>
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <>
          {status === "Processing" ? (
            <Tag color="orange" key={status}>
              {status.toUpperCase()}
            </Tag>
          ) : status === "Delivered" ? (
            <Tag color="green" key={status}>
              {status.toUpperCase()}
            </Tag>
          ) : status === "Shipped" ? (
            <Tag color="cyan" key={status}>
              {status.toUpperCase()}
            </Tag>
          ) : status === "Cancelled" ? (
            <Tag color="red" key={status}>
              {status.toUpperCase()}
            </Tag>
          ) : (
            <Tag color="geekblue" key={status}>
              {status.toUpperCase()}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "products",
      render: (products, record) => (
        <Flex className="items-center justify-center text-xl">
          <a
            onClick={() => {
              console.log(record);
              let modal = null;
              const handleOk = () => {
                modal.destroy();
              };

              const columns = [
                { title: "", dataIndex: "label" },
                { title: "", dataIndex: "value" },
              ];

              const dataSource = [
                {
                  key: 1,
                  label: <strong>Customer</strong>,
                  value: record?.fullOrder?.user?.name,
                },
                {
                  key: 2,
                  label: <strong>Shipping Address</strong>,
                  value: `${record?.fullOrder?.shipping_address?.address_line_1} ${record?.fullOrder?.shipping_address?.address_line_2} ${record?.fullOrder?.shipping_address?.appartment} ${record?.fullOrder?.shipping_address?.city} ${record?.fullOrder?.shipping_address?.state} ${record?.fullOrder?.shipping_address?.country} ${record?.fullOrder?.shipping_address?.pincode} ${record?.fullOrder?.shipping_address?.phone}`,
                },
                {
                  key: 3,
                  label: <strong>Billing Address</strong>,
                  value: `${record?.fullOrder?.billing_address?.address_line_1} ${record?.fullOrder?.billing_address?.address_line_2} ${record?.fullOrder?.billing_address?.appartment} ${record?.fullOrder?.billing_address?.city} ${record?.fullOrder?.billing_address?.state} ${record?.fullOrder?.billing_address?.country} ${record?.fullOrder?.billing_address?.pincode} ${record?.fullOrder?.billing_address?.phone}`,
                },
                {
                  key: 4,
                  label: <strong>Order Date</strong>,
                  value: new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  }).format(new Date(record?.fullOrder?.createdAt)),
                },
                {
                  key: 5,
                  label: <strong>Status</strong>,
                  value: (
                    <>
                      {record?.status === "Processing" ? (
                        <Tag color="orange" key={record?.status}>
                          {record?.status.toUpperCase()}
                        </Tag>
                      ) : record?.status === "Delivered" ? (
                        <Tag color="green" key={record?.status}>
                          {record?.status.toUpperCase()}
                        </Tag>
                      ) : record?.status === "Shipped" ? (
                        <Tag color="cyan" key={record?.status}>
                          {record?.status.toUpperCase()}
                        </Tag>
                      ) : record?.status === "Cancelled" ? (
                        <Tag color="red" key={record?.status}>
                          {record?.status.toUpperCase()}
                        </Tag>
                      ) : (
                        <Tag color="geekblue" key={record?.status}>
                          {record?.status.toUpperCase()}
                        </Tag>
                      )}
                    </>
                  ),
                },
                {
                  key: 6,
                  label: <strong>Payment Method</strong>,
                  value: (
                    <Flex gap={5} className="items-center">
                      <Image
                        src={record?.payment?.image}
                        alt={record?.payment?.name}
                        preview={false}
                      />
                      <p>{record?.payment?.name}</p>
                    </Flex>
                  ),
                },
              ];

              modal = Modal.info({
                title: "Products",
                width: "70vw",
                content: (
                  <>
                    <>
                      <Flex className="justify-between">
                        <Title>Details</Title>
                        <EditOutlined
                          className="cursor-pointer text-2xl"
                          onClick={() => {
                            handleEdit(record);
                            handleOk();
                          }}
                        />
                      </Flex>
                      <Table
                        dataSource={dataSource}
                        columns={columns}
                        pagination={false}
                      />
                    </>

                    <Divider />

                    <>
                      <Title>Line items</Title>
                      <Table
                        dataSource={products.map((product) => ({
                          key: product._id,
                          name: product.productId.name,
                          price: `$${product.productId.price}`,
                          quantity: product.quantity,
                          amount: `$${
                            product.productId.price * product.quantity
                          }`,
                        }))}
                        rowKey="_id"
                        columns={[
                          { title: "Product", dataIndex: "name" },
                          { title: "Qty", dataIndex: "quantity" },
                          { title: "Unit Price	", dataIndex: "price" },
                          { title: "Amount	", dataIndex: "amount" },
                        ]}
                      />
                    </>
                  </>
                ),
                onOk: handleOk,
                maskClosable: true,
                destroyOnClose: true,
              });
            }}
          >
            <EyeOutlined style={{ color: "#1890ff" }} />
          </a>
        </Flex>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  return (
    <Spin size="large" spinning={loading} tip="Loading...">
      <div>
        <Table
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={orders?.map((orderObj) => ({
            key: orderObj._id,
            user: {
              name: orderObj?.user?.name,
              avatar: orderObj?.user?.avatar,
              email: orderObj?.user?.email,
            },
            email: orderObj.user.email,
            products: orderObj.products,
            status: orderObj.status,
            action_id: orderObj._id,
            order: {
              createdAt: new Intl.DateTimeFormat("en-US", {
                month: "short",
                day: "numeric",
              }).format(new Date(orderObj.createdAt)),
              _id: orderObj._id,
              number: number++,
              length: orderObj?.products?.length,
              amount: orderObj?.amount,
            },
            payment: {
              image: orderObj?.payment?.imageUrl,
              name: orderObj?.payment?.cardType,
            },
            fullOrder: orderObj,
          }))}
        />
      </div>
    </Spin>
  );
};
export default AllOrdresList;

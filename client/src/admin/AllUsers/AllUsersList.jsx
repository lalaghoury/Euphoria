import React, { useState } from "react";
import { Table, Tag, Image, Select, Spin, Modal } from "antd";
import Title from "antd/es/typography/Title";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useUserEffect, userThunks } from "../../redux/slices/userSlice";

const AllUsersList = () => {
  useUserEffect();
  const [editable, setEditable] = useState(null);
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const { Option } = Select;
  const { data: users, loading } = useSelector((state) => state.users);

  const handleUserUpdate = async (record) => {
    if (!role && !status) {
      return setEditable(null);
    }

    dispatch(
      userThunks.updateUser({
        values: { role, status },
        url: `/users/admin/update/${record.key}`,
      })
    );

    setEditable(null);
    setRole(null);
    setStatus(null);
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this user?",
      content: "Once deleted, the user cannot be recovered.",
      onOk: () => {
        dispatch(userThunks.deleteUser({ url: `/users/admin/delete/${id}` }));
      },
    });
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => (
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
              src={name.avatar}
              alt={name.name}
              width={50}
              height={50}
              style={{ objectFit: "center", borderRadius: "9px" }}
              fallback="https://via.placeholder.com/50x50"
            />
          </span>
          <span style={{ flex: 1 }}>
            <Title style={{ margin: 0 }} level={5} className="cursor-pointer">
              {name.name}
            </Title>
            <p>{name.email}</p>
          </span>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (role, record) => (
        <>
          {editable === record.key ? (
            <Select
              style={{ width: 120 }}
              defaultValue={role}
              key={role}
              onChange={(value) => setRole(value)}
            >
              <Option value="user">USER</Option>
              <Option value="admin">ADMIN</Option>
            </Select>
          ) : (
            <>
              {role === "user" ? (
                <Tag color="green" key={role}>
                  {role.toUpperCase()}
                </Tag>
              ) : role === "admin" ? (
                <Tag color="geekblue" key={role}>
                  {role.toUpperCase()}
                </Tag>
              ) : (
                <Tag color="volcano" key={role}>
                  {role.toUpperCase()}
                </Tag>
              )}
            </>
          )}
        </>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status, record) => (
        <>
          {editable === record.key ? (
            <Select
              style={{ width: 120 }}
              defaultValue={status}
              key={status}
              onChange={(value) => setStatus(value)}
            >
              <Option value="active">ACTIVE</Option>
              <Option value="blocked">BLOCKED</Option>
              <Option value="disabled">DISABLED</Option>
            </Select>
          ) : (
            <>
              {status === "active" ? (
                <Tag color="green" key={status}>
                  {status.toUpperCase()}
                </Tag>
              ) : status === "blocked" ? (
                <Tag color="volcano" key={status}>
                  {status.toUpperCase()}
                </Tag>
              ) : (
                <Tag color="geekblue" key={status}>
                  {status.toUpperCase()}
                </Tag>
              )}
            </>
          )}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action_id",
      render: (_id, record) => (
        <div className="actions dis-fcc gap-2 text-[#8a33fd] text-xl">
          {editable === _id ? (
            <>
              <CloseCircleOutlined onClick={() => setEditable(null)} />
              <CheckCircleOutlined onClick={() => handleUserUpdate(record)} />
            </>
          ) : (
            <>
              <DeleteOutlined onClick={() => handleDelete(_id)} />
              <EditOutlined onClick={() => setEditable(_id)} />
            </>
          )}
        </div>
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
          dataSource={users.map((userObj) => ({
            key: userObj._id,
            name: {
              name: userObj.name,
              avatar: userObj.avatar,
              email: userObj.email,
            },
            email: userObj.email,
            createdAt: new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }).format(new Date(userObj.createdAt)),
            role: userObj.role,
            status: userObj.status,
            action_id: userObj._id,
          }))}
        />
      </div>
    </Spin>
  );
};
export default AllUsersList;

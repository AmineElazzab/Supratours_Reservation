import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
// import { ShowLoading } from "../redux/alertsSlice";
import { Button, message, Space, Table } from "antd";
import axios from "axios";
import UserForm from "../components/UserForm";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { useParams } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const [showUserForm, setShowUserForm] = React.useState(false);
  const params = useParams();
  const [user, setUser] = useState({});
  const [selectedUser, setSelectedUser] = useState({});

  //get user by id
  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/get-user-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Time Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => {
        return new Date(text).toLocaleString();
      },
    },
  
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div className="flex gap-3">
        

          <i
            className="ri-pencil-line cursor-pointer"
            onClick={() => {
              setSelectedUser(record);
              setShowUserForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  const editUser = (record) => {
    setShowUserForm(true);
    setUser(record);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <PageTitle title="Profile" />
      <button
        className="btn btn-primary"
        onClick={() => {
          setShowUserForm(true);
        }}
      >
        Edit
      </button>
      <Table columns={columns} dataSource={[user]} />
      {showUserForm && (
        <UserForm
          showUserForm={showUserForm}
          setShowUserForm={setShowUserForm}
          type={selectedUser?"edit"
            : "add"}
          user={user}
          setSelectedUser={setSelectedUser}
          setUser={setUser}
        />
      )}
    </div>
  );
}

export default Profile;

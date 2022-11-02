import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { message, Modal, Table } from "antd";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { axiosInstance } from "../../helpers/axiosInstance";

function AdminUsers() {
//get all users
const [users , setUsers]= useState
const dispatch = useDispatch
const getUsers = async () => {
  try {
    dispatch(ShowLoading());
    const response = await axiosInstance.get("/api/users/get-all-users", {});
    dispatch(HideLoading());
    if (response.data.success) {
      setUsers(response.data.data);
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
    },
    {
      title: "Email",
      dataIndex: "email",
    },
   
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <button
            className="btn btn-danger"
            onClick={() => {
              // deleteUser(record._id);
            }
            }
          >
            Delete
          </button>
        </div>
      ),
            


    },
  ];

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, []);


  return (
    <div>

      <Table
        columns={columns}
        dataSource={users}
        rowKey={(record) => record._id}
      />



    </div>
  );
}

export default AdminUsers
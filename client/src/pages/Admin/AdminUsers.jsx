import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { message, Table } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";
import axios from "axios";

function AdminUsers() {
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/users/get-all-users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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

  //Block User
  // const blockUser = async (id) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post(`/api/users/block-user/${id}`, {
  //       //id
  //       // bookings_id = ,
  //       data: { id },
  //     });
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       getUsers();
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  //Unblock User
  // const unblockUser = async (id) => {
  //   try {
  //     dispatch(ShowLoading());
  //     const response = await axiosInstance.post(
  //       `/api/users/unblock-user/${id}`,
  //       {
  //         //id
  //         // bookings_id = ,
  //         data: {},
  //       }
  //     );
  //     dispatch(HideLoading());
  //     if (response.data.success) {
  //       message.success(response.data.message);
  //       getUsers();
  //     } else {
  //       message.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(HideLoading());
  //     message.error(error.message);
  //   }
  // };

  const updateUserPermissions = async (user, action) => {
    try {
      let payload = null;
      if (action === "make-admin") {
        payload = {
          ...user,
          isAdmin: true,
        };
      } else if (action === "remove-admin") {
        payload = {
          ...user,
          isAdmin: false,
        };
      } else if (action === "block") {
        payload = {
          ...user,
          isBlocked: true,
        };
      } else if (action === "unblock") {
        payload = {
          ...user,
          isBlocked: false,
        };
      }

      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/users/update-user-permissions",
        payload
      );
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getUsers();
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
      title: "Bus Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (phone) => {
        return `+212 ${phone}`;
      },
    },
    {
      title: "Time Creat",
      dataIndex: "createdAt",
      render: (text) => {
        return new Date(text).toLocaleString();
      },
    },
    {
      title: "Time Update",
      dataIndex: "updatedAt",
      render: (text) => {
       
          return (text) 
            ? new Date(text).toLocaleString()
            : "Not Updated";
        }
      
    },
    {
      title: "Status",
      dataIndex: "",
      render: (data) => {
        return data.isBlocked ? "Bloked" : "Avtive";
      }
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data.isAdmin) {
          return "Admin";
        } else {
          return "User";
        }
      },
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => (
        <div className="flex gap-3 underline">
          {record?.isBlocked && (
            <p
              className="underline cursor-pointer"
              onClick={() => {
                updateUserPermissions(record, "unblock");
              }}
            >
              UnBlock
            </p>
          )}
          {!record?.isBlocked && (
            <p
              className="underline cursor-pointer hover:text-red-600"
              onClick={() => {
                updateUserPermissions(record, "block");
              }}
            >
              Block
            </p>
          )}
          {record?.isAdmin && (
            <p
              className="underline cursor-pointer hover:text-green-600"
              onClick={() => {
                updateUserPermissions(record, "remove-admin");
              }}
            >
              Remove Admin
            </p>
          )}
          {!record?.isAdmin && (
            <p
              className="underline cursor-pointer"
              onClick={() => {
                updateUserPermissions(record, "make-admin");
              }}
            >
              Make Admin
            </p>
          )}
        </div>
      ),
    },
  ];

  useEffect(() => {
    getUsers(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Users" />
      </div>
      <Table
        columns={columns}
        dataSource={users}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default AdminUsers;

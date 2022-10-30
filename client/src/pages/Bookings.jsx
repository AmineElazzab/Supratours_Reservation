import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../components/BusForm";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { message, Table } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-user-id",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        const mappedData = response.data.data.map((booking) => {
          return {
            ...booking,
            ...booking.bus,
            ...booking.user,
            key: booking._id,
          };
        });
        setBookings(mappedData);
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
      title: "Passenger Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Bus Name & Number",
      dataIndex: "name,number",
      key: "name,number",
      render: (text, record) => (
        <span>
          {record.bus.name} / N°{record.bus.number}
        </span>
      ),
    },
    {
      title: "",
     
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "To",
      dataIndex: "to",
      key: "to",
    },

    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => price,
    },
    {
      title: "Date",
      dataIndex: "date",
      // key: "transactionId",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "pending") {
          return <span className="text-warning">{status}</span>;
        } else if (status === "cancelled") {
          return <span className="text-danger">{status}</span>;
        } else {
          return <span className="text-success">{status}</span>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <button
          className="btn btn-danger"
          //   onClick={() => cancelBooking(record._id)}
        >
          Cancel
        </button>
      ),
    },
  ];

  useEffect(() => {
    getBookings(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <PageTitle title="Bookings" />
      <Table dataSource={bookings} columns={columns} />
    </div>
  );
}

export default Bookings;

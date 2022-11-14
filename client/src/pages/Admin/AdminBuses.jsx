import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../../components/BusForm";
import PageTitle from "../../components/PageTitle";
import { HideLoading, ShowLoading } from "../../redux/alertsSlice";
import { message, Table } from "antd";
import { axiosInstance } from "../../helpers/axiosInstance";
import axios from "axios";

function AdminBuses() {
  const dispatch = useDispatch();
  const [showBusForm, setShowBusForm] = React.useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axios.get("/api/buses/get-all-buses", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const cancelBooking = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.delete(`/api/buses/${id}`, {
        //id
        // bookings_id = ,
        data: {},
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBuses();
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
      title: "Bus Number",
      dataIndex: "number",
    },
    {
      title: "Bus Capacity",
      dataIndex: "seats",
    },
    {
      title: "From City",
      dataIndex: "from",
    },
    {
      title: "To City",
      dataIndex: "to",
    },
    {
      title: "Date of Journey",
      dataIndex: "date",
    },
    {
      title: "Departure Time",
      dataIndex: "departureTime",
    },
    {
      title: "Arrival Time",
      dataIndex: "arrivalTime",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (actions, record) => (
        <div className="flex gap-3">
          <i
            className="ri-delete-bin-line cursor-pointer"
            onClick={() => cancelBooking(record._id)}
          ></i>

          <i
            className="ri-pencil-line cursor-pointer"
            onClick={() => {
              setSelectedBus(record);
              setShowBusForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBuses(); // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between">
        <PageTitle title="Buses" />
        <button
          className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded"
          onClick={() => setShowBusForm(true)}
        >
          Add Bus
        </button>
      </div>
      <Table
        columns={columns}
        dataSource={buses}
        pagination={{ pageSize: 10 }}
      />

      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          setSelectedBus={setSelectedBus}
          getData={getBuses}
        />
      )}
    </div>
  );
}

export default AdminBuses;

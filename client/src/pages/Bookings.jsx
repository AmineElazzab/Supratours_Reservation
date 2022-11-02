import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import BusForm from "../components/BusForm";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { message, Modal, Table } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";

function Bookings() {
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
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

  //delet booking
  const deleteBooking = async (_id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.delete(`/api/bookings/${_id}`, {});
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        getBookings();
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
      render: (text, record) => {
        return `${record.bus.name} - ${record.number}`;
      },
    },
    {
      //seatsBooked
      title: "Seats Booked",
      dataIndex: "seatsBooked",
      key: "seatsBooked, seatsAvailable",
      render: (text, record) => {
        return `${record.seatsBooked} / ${record.seatsAvailable}`;
      },
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
      title: "Date",
      dataIndex: "date",
      key: "transactionId",
    },
    {
      title: "Depart Time",
      dataIndex: "departureTime",
      key: "departureTime",
    },
    {
      //tottal price
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      render: (bus, record) => {
        return `${record.price * record.selectedSeats} DH`;
      },
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        if (status === "Yet to start") {
          return <span className="text-orange-600">{status}</span>;
        } else if (status === "cancelled") {
          return <span className="text-red-600	">{status}</span>;
        } else {
          return <span className="text-green-600	">{status}</span>;
        }
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div className="flex items-center">
          <button
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
            onClick={() => deleteBooking(record.key)}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            Print
          </button>
        </div>
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
      {showPrintModal && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          visible={showPrintModal}
          footer={null}
          width={700}
        >
          <h1 className="text-lg flex justify-center">
            This Your Ticket -{selectedBooking?.name}
          </h1>
          <hr />
          <div className="flex justify-between mt-4">
            <p className="flex justify-center">
              <span className="font-bold">Bus Name / Bus Number :</span>{" "}
              {selectedBooking?.bus.name} / {selectedBooking?.number}
            </p>
            <p className="flex justify-center">
              <span className="font-bold">From - To :</span>{" "}
              {selectedBooking?.from} - {selectedBooking?.to}
            </p>
            <p className="flex justify-center">
              <span className="font-bold">Date :</span> {selectedBooking?.date}
            </p>
          </div>
          <div className="flex justify-between mt-4">
            <p className="flex justify-center">
              <span className="font-bold">Depart Time :</span>{" "}
              {selectedBooking?.departureTime}
            </p>
            <p className="flex justify-center">
              <span className="font-bold">Seats Booked :</span>{" "}
              {selectedBooking?.seatsBooked}
            </p>
            <p className="flex justify-center">
              <span className="font-bold">Total Price :</span>{" "}
              {selectedBooking?.price} DH
            </p>
          </div>
          <div className="flex justify-between mt-4 mx-20">
            <p className="flex justify-center">
              <span className="font-bold ">Status :</span>{" "}
              <span className="text-orange-600">{selectedBooking.status}</span>
            </p>
            <p className="flex justify-center">
              <span className="font-bold">Passenger Email :</span>{" "}
              {selectedBooking?.email}
            </p>
          </div>
          <p className="flex justify-center">
            <span className="font-bold">
              Free Wifi :
              <span>
                <i class="ri-arrow-down-s-fill"></i>
              </span>{" "}
            </span>
          </p>

          <div className="text-center flex justify-center">
            <img
              alt="Barcode Generator TEC-IT"
              src="https://barcode.tec-it.com/barcode.ashx?data=WIFI%3AT%3AWPA%3BS%3AYoucode1%3BP%3AYcode%402021%3B%3B&code=QRCode_Wifi&dmsize=Default&eclevel=L"
            />
          </div>

          <div className="pt-[8px] text-center font-serif"></div>
          <div className="flex justify-center mt-4">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded"
              onClick={() => {
                window.print();
              }}
            >
              Print
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;

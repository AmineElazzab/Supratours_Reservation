import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { message, Modal, Table } from "antd";
import { axiosInstance } from "../helpers/axiosInstance";
import moment from "moment";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";

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
      render: (text, record) => {
        return record.user.name;
      },
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
      key: "seatsBooked",
      render: (text, record) => {
        return `${record.seatsBooked}`;
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
      //total price
      title: "Total Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => {
        return `${record.price * record.seatsBooked.length}`;
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
            className=" text-black px-2 py-1 rounded mr-2"
            onClick={() => deleteBooking(record.key)}
          >
            <i class="ri-close-fill"></i>
          </button>
          <button
            className=" text-black px-2 py-1 rounded"
            onClick={() => {
              setSelectedBooking(record);
              setShowPrintModal(true);
            }}
          >
            <i class="ri-printer-line"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getBookings(); // eslint-disable-next-line
  }, []);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="">
      <PageTitle title="Bookings" />
      <Table dataSource={bookings} columns={columns} />
      {showPrintModal && (
        <Modal
          width={1000}
          height={500}
          title="Print Ticket"
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="" ref={componentRef}>
            {selectedBooking &&
              selectedBooking.seatsBooked.map((seat) => {
                return (
                  <div className=" max-w-md w-full h-full mx-auto z-10 bg-orange-600 ">
                    <div className="flex flex-col">
                      <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4">
                        <div className="flex-none sm:flex">
                          <div className="flex-auto justify-evenly">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center  my-1">
                                <h2 className="font-medium">IL-MEGLIO</h2>
                              </div>
                              <div className="flex justify-between ml-auto">
                               
                              </div>
                              <div className="ml-auto text-orange-800">
                                {selectedBooking?.bus.name} /{" "}
                                {selectedBooking?.number}
                              </div>
                            </div>
                            <div className="border-dashed border-b-2 my-5" />
                            <div className="flex items-center">
                              <div className="flex flex-col justify-start text-center">
                                <div className="flex-auto text-xs text-gray-400 my-1">
                                  <span className="mr-1 ">From</span>
                                  <span></span>
                                </div>
                                <div className="w-full flex-none text-lg text-orange-800 font-bold leading-none">
                                  {selectedBooking?.from}
                                </div>
                              </div>
                              <div className="flex flex-col mx-auto">
                                <img
                                  src="https://www.pngitem.com/pimgs/m/94-947302_png-bus-ticket-traveling-bus-logo-transparent-png.png"
                                  className="w-20 p-1"
                                />
                              </div>
                              <div className="flex flex-col justify-end text-end">
                                <div className="flex-auto text-xs text-gray-400 my-1">
                                  <span className="mr-1">To</span>
                                </div>
                                <div className="w-full flex-none text-lg text-orange-800 font-bold leading-none">
                                  {selectedBooking?.to}
                                </div>
                              </div>
                            </div>
                            <div className="border-dashed border-b-2 my-5 pt-5">
                              <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -left-1" />
                              <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -right-1" />
                            </div>
                            <div className="flex items-center mb-5 p-5 text-sm">
                              <div className="flex flex-col text-start">
                                <span className="text-sm">Price</span>
                                <span className="font-semibold">
                                  {selectedBooking.price *
                                    selectedBooking.seatsBooked.length}{" "}
                                  /Dh
                                </span>
                              </div>
                              <div className="flex flex-col ml-auto text-end">
                                <span className>Date</span>
                                <div className="font-semibold">
                                  {selectedBooking?.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center mb-5 p-5 text-sm">
                              <div className="flex flex-col text-sm">
                                <span className>Departs</span>
                                <div className="font-semibold">
                                  {selectedBooking?.departureTime}
                                </div>
                              </div>

                              <div className="flex flex-col ml-auto text-end">
                                <span className>Arrived</span>
                                <div className="font-semibold">
                                  {selectedBooking?.arrivalTime}
                                </div>
                              </div>
                            </div>
                            <div className="border-dashed border-b-2 my-5 pt-5">
                              <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -left-1" />
                              <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -right-1" />
                            </div>
                            <div className="flex items-center px-5 pt-3 text-sm">
                              <div className="flex flex-col">
                                <span className>Passanger</span>
                                <div className="font-semibold">
                                  {selectedBooking?.name}
                                </div>
                              </div>
                              <div className="flex flex-col mx-auto">
                                <span className>Class</span>
                                <div className="font-semibold">
                                  {selectedBooking?.type}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className>Seats</span>
                                <div className="font-semibold">{seat}</div>
                              </div>
                            </div>
                            <div className="flex flex-col py-5  justify-center text-sm ">
                              <p className="flex justify-center">
                                <span className="font-bold">
                                  Scane Me Free Wifi
                                </span>
                              </p>
                              <span className="flex justify-center">
                                <i class="ri-arrow-down-s-fill"></i>
                              </span>{" "}
                              <div className="text-center flex justify-center">
                              <QRCode
                                  value={JSON.stringify({
                                    Name: selectedBooking?.name,
                                    From: selectedBooking?.from,
                                    To: selectedBooking?.to,
                                    Departure: selectedBooking?.departureTime,
                                    Arrival: selectedBooking?.arrivalTime,
                                    Price:
                                      selectedBooking.price *
                                      selectedBooking.seatsBooked.length,
                                    Date: selectedBooking?.date,
                                    seat,
                                  })}
                                  size={100}
                                  bgColor={"#9a3412"}
                                  fgColor={"#ffffff"}
                                  level={"L"}
                                  includeMargin={true}
                                />
                              </div>
                              <p className="flex justify-center"></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Bookings;

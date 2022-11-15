import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import { Col, message, Modal, Row, Table } from "antd";
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
        return `${record.price * record.seatsBooked.length} /Dh `;
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

      <Table columns={columns} dataSource={bookings} />

      {showPrintModal && (
        <Modal
          onCancel={() => {
            setShowPrintModal(false);
            setSelectedBooking(null);
          }}
          open={showPrintModal}
          okText="Print"
          onOk={handlePrint}
        >
          <div className="flex flex-col gap-10" ref={componentRef}>
            {selectedBooking &&
              selectedBooking.seatsBooked.map((seat) => {
                return (
                  // <div className=" max-w-md w-full h-full mx-auto z-10 bg-orange-600 ">
                  //   <div className="flex flex-col">
                  //     <div className="bg-white relative drop-shadow-2xl rounded-3xl p-4 m-4">
                  //       <div className="flex-none sm:flex">
                  //         <div className="flex-auto justify-evenly">
                  //           <div className="flex items-center justify-between">
                  //             <div className="flex items-center  my-1">
                  //               <h2 className="font-medium">IL-MEGLIO</h2>
                  //             </div>
                  //             <div className="flex justify-between ml-auto"></div>
                  //             <div className="ml-auto text-orange-800">
                  //               {selectedBooking?.bus.name} /{" "}
                  //               {selectedBooking?.number}
                  //             </div>
                  //           </div>
                  //           <div className="border-dashed border-b-2 my-5" />
                  //           <div className="flex items-center justify-between">
                  //             <div className="flex flex-col justify-start text-start">
                  //               <div className="flex-auto text-xs text-gray-400 my-1">
                  //                 <span className="mr-1 ">From</span>
                  //                 <span></span>
                  //               </div>
                  //               <div className="w-full flex-none text-lg text-orange-800 font-bold leading-none">
                  //                 {selectedBooking?.from}
                  //               </div>
                  //             </div>
                  //             <div className="flex flex-col justify-center text-lg text-black mt-6">
                  //               <i class="ri-arrow-right-line"></i>
                  //             </div>
                  //             <div className="flex flex-col justify-end text-end">
                  //               <div className="flex-auto text-xs text-gray-400 my-1">
                  //                 <span className="mr-1">To</span>
                  //               </div>
                  //               <div className="w-full flex-none text-lg text-orange-800 font-bold leading-none">
                  //                 {selectedBooking?.to}
                  //               </div>
                  //             </div>
                  //           </div>
                  //           <div className="border-dashed border-b-2 my-5 pt-5">
                  //             <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -left-1" />
                  //             <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -right-1" />
                  //           </div>
                  //           <div className="flex items-center mb-5 p-5 text-sm">
                  //             <div className="flex flex-col text-start">
                  //               <span className="text-sm">Price</span>
                  //               <span className="font-semibold">
                  //                 {selectedBooking.price}
                  //                 /Dh
                  //               </span>
                  //             </div>
                  //             <div className="flex flex-col ml-auto text-end">
                  //               <span className>Date</span>
                  //               <div className="font-semibold">
                  //                 {selectedBooking?.date}
                  //               </div>
                  //             </div>
                  //           </div>
                  //           <div className="flex items-center mb-5 p-5 text-sm">
                  //             <div className="flex flex-col text-sm">
                  //               <span className>Departs</span>
                  //               <div className="font-semibold">
                  //                 {selectedBooking?.departureTime}
                  //               </div>
                  //             </div>

                  //             <div className="flex flex-col ml-auto text-end">
                  //               <span className>Arrived</span>
                  //               <div className="font-semibold">
                  //                 {selectedBooking?.arrivalTime}
                  //               </div>
                  //             </div>
                  //           </div>
                  //           <div className="border-dashed border-b-2 my-5 pt-5">
                  //             <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -left-1" />
                  //             <div className="absolute rounded-full w-5 h-5 bg-orange-600 -mt-2 -right-1" />
                  //           </div>
                  //           <div className="flex items-center px-5 pt-3 text-sm">
                  //             <div className="flex flex-col">
                  //               <span className>Passanger</span>
                  //               <div className="font-semibold">
                  //                 {selectedBooking?.name}
                  //               </div>
                  //             </div>
                  //             <div className="flex flex-col mx-auto">
                  //               <span className>Class</span>
                  //               <div className="font-semibold">
                  //                 {selectedBooking?.type}
                  //               </div>
                  //             </div>
                  //             <div className="flex flex-col">
                  //               <span className>Seats</span>
                  //               <div className="font-semibold">{seat}</div>
                  //             </div>
                  //           </div>
                  //           <div className="flex flex-col py-5  justify-center text-sm ">
                  //             <p className="flex justify-center">
                  //               <span className="font-bold">
                  //                 Scane Me Free Wifi
                  //               </span>
                  //             </p>
                  //             <span className="flex justify-center">
                  //               <i class="ri-arrow-down-s-fill"></i>
                  //             </span>{" "}
                  //             <div className="text-center flex justify-center">
                  //               <QRCode
                  //                 value={JSON.stringify({
                  //                   Name: selectedBooking?.name,
                  //                   Bus: selectedBooking?.bus.name,
                  //                   Number: selectedBooking?.number,
                  //                   From: selectedBooking?.from,
                  //                   To: selectedBooking?.to,
                  //                   Date: selectedBooking?.date,
                  //                   Departure: selectedBooking?.departureTime,
                  //                   Arrival: selectedBooking?.arrivalTime,
                  //                   Price: selectedBooking.price,
                  //                   seat,
                  //                 })}
                  //                 size={100}
                  //               />
                  //             </div>
                  //             <p className="flex justify-center"></p>
                  //           </div>
                  //         </div>
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>

                  <div className="flex justify-center text-gray-900">
                    <div className="rounded-md relative w-72 shadow-2xl p-3 bg-white">
                      <div className="py-2">
                        <div className="text-center text-xl font-bold">
                          Ticket Bus
                        </div>
                        <div className="text-center text-xs font-bold">
                          {selectedBooking?.bus.name} /{" "}
                          {selectedBooking?.number}
                        </div>
                      </div>
                      <div className="text-center text-xs font-bold mb-1">
                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
                      </div>
                      <div className="text-xs pl-2">
                        <div className="text-xs mb-1">
                          Passanger Name ：{selectedBooking?.name}
                        </div>
                        <div className="text-xs mb-1">
                          TelePhone：{selectedBooking?.phone}
                        </div>
                        <div>OrderNumber：{selectedBooking?.key}</div>
                      </div>
                      <div className="border-double border-t-4 border-b-4 border-l-0 border-r-0 border-gray-900 my-3">
                        <div className="border-dashed border-t border-b border-l-0 border-r-0 border-gray-900 mt-1 my-2 py-2 px-1">
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">From：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.from}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">To：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.to}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">Date：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.date}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">Depart：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.departureTime}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">Arrived：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.arrivalTime}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">Class：</div>

                            <span className="w-2/6 text-right">
                              {selectedBooking?.type}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="text-xs mb-1">Seats：</div>

                            <span className="w-2/6 text-right">{seat}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs">
                        <div className="mb-1">
                          Discount：{selectedBooking.price} /-Dh
                        </div>
                        <div className="mb-1">Baggage：10 /-Dh</div>
                        <div className="mt-8 mb-1 text-right underline">
                          <span>
                            Scanne Me Free Wifi 
                          </span>
                        </div>
                        <div className="text-center flex flex-row justify-between mb-20">
                          <QRCode
                            value={JSON.stringify({
                              Name: selectedBooking?.name,
                              Bus: selectedBooking?.bus.name,
                              Number: selectedBooking?.number,
                              From: selectedBooking?.from,
                              To: selectedBooking?.to,
                              Date: selectedBooking?.date,
                              Departure: selectedBooking?.departureTime,
                              Arrival: selectedBooking?.arrivalTime,
                              Price: selectedBooking.price,
                              seat,
                            })}
                            size={100}
                          />
                        <div>
                          <div style={{ textAlign: "center" }}>
                           
                            <div className="flex justify-center">
                            <img
                            className="w-[100px] h-[100px]"
                              alt="Barcode Generator TEC-IT"
                              src="https://barcode.tec-it.com/barcode.ashx?code=QRCode_Wifi&data=WIFI%3AT%3AWPA%3BS%3AYoucode1%3BP%3AYcode%402021%3B%3B&eclevel=L&dmsize=Default"
                            />
                            </div>
                          </div>
                          <div
                            style={{
                              paddingTop: "8px",
                              textAlign: "center",
                              fontSize: "15px",
                              fontFamily: "Source Sans Pro, Arial, sans-serif",
                            }}
                            
                          >

                             
                          </div>
                        </div>
                        </div>
                        <div className="text-right">
                          <div>
                            Time：
                            {new Date().toLocaleTimeString()}
                          </div>
                          <div className="font-bold text-sm">
                            Aggregate：{selectedBooking.price + 10} /-Dh
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

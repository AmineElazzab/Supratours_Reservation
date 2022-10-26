import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";

function BookNow() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const params = useParams();
  const dispatch = useDispatch();
  const [bus, setBus] = useState(null);

  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id ", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBus(); // eslint-disable-next-line
  }, []);

  return (
    <div className="overflow-hidden ">
      {bus && (
        <Row className="">
          <Col lg={24} xs={24} sm={24}>
            <div className="text-2xl flex row-auto justify-between">
              <h1 className="text-start">
                {bus.name} - {bus.number}
              </h1>
              <h1 className="text-end">
                <i class="ri-bus-2-fill"></i> {bus.from} - {bus.to}
              </h1>
            </div>
            <div className="border-[1px] border-orange-400"></div>
            <div className="text-base flex row-auto justify-between mt-6">
              <h1 className="text-center">
                <i class="ri-calendar-2-fill"></i> Bus date <br /> {bus.date}
              </h1>
              <h1 className="text-center">
                <i class="ri-time-fill"></i> Bus depart time <br />{" "}
                {bus.departureTime}
              </h1>
              <h1 className="text-center">
                <i class="ri-time-fill"></i> Bus arrival time <br />{" "}
                {bus.arrivalTime}
              </h1>
              <h1 className="text-center">
                <i class="ri-price-tag-2-fill"></i> Bus price <br /> {bus.price}{" "}
                DH
              </h1>
              <h1 className="text-center">
                <i class="ri-creative-commons-by-fill"></i> Bus seats <br />{" "}
                {bus.seats}
              </h1>
             
            </div>
          </Col>
          <Col lg={8} xs={12} sm={12}>
          <div className="text-xl flex flex-col  mt-[250px] items-start ml-[300px] ">
              <h1 className="text-center">
                <i class="ri-creative-commons-by-fill"></i> Bus booked seats{" "}
                <br /> {bus.bookedSeats}
              </h1>
          <h1 className="text-center mt-5">
                <i class="ri-creative-commons-by-fill"></i> Bus available seats{" "}
                <br /> {selectedSeats.join("/ ")}
              </h1>
              <h1 className="text-center mt-5">
              <i class="ri-money-dollar-circle-line"></i> Total price{" "}
                <br /> {selectedSeats.length * bus.price} DH
              </h1>
              </div>
          </Col>
          <Col lg={16} xs={12} sm={12}>
            <div className="flex justify-center mt-10 ">
              <SeatSelection 
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                bus={bus}
              />
            </div>
          </Col>
          <Col lg={24} xs={24} sm={24}>
            <div className="flex justify-center mt-3">
              <button className="bg-orange-400 text-white px-10 py-2 rounded-md">
                Book Now
              </button>
              </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;

import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import StripeCheckout from "react-stripe-checkout";

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

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-seat", {
        bus: bus._id,
        seats: selectedSeats,
        transactionId,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const onToken = async (token) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/make-payment", {
        token,
        amount: selectedSeats.length * bus.price * 100,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        bookNow(response.data.data.transactionId);
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
                {bus.name} / {bus.number}
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
          <Col lg={24} xs={24} sm={24}>
            <div className=" flex justify-center text-base">
              <i class="ri-wifi-fill"></i>
              <i class="ri-tv-line"></i>
              <i class="ri-map-pin-line"></i>
              <i class="ri-music-2-line"></i>
              <i class="ri-battery-2-line"></i>
              <i class="ri-cup-line"></i>
              <i class="ri-lightbulb-line"></i>
            </div>
          </Col>
          <Col lg={8} xs={12} sm={12}>
            <div className="border-[1px] border-orange-400 mt-5"></div>

            <div className="text-xl flex flex-row  justify-center mt-[250px] items-start  gap-10">
              <h1 className="text-center">
                <i class="ri-creative-commons-by-fill"></i> Seats Left <br />{" "}
                {bus.seats - bus.seatsBooked.length}
              </h1>
              <h1 className="text-center ">
                <i class="ri-money-dollar-circle-line"></i> Total price <br />{" "}
                {selectedSeats.length * bus.price} DH
              </h1>
            </div>
            <StripeCheckout
              billingAddress
              disabled={selectedSeats.length === 0}
              token={onToken}
              amount={bus.price * selectedSeats.length * 100}
              currency="MAD"
              stripeKey="pk_test_51Ky11OFDbGl4ER5ateVIT59tNNQ6YARPNORBfr4ozDHniOg1n8Y28djsmYRR2xg15ygMbmvihmQwLRVpfkSz3c7z00mLLm8FRR"
            >
              <div className="flex justify-center mt-3">
                <button
                  className={`${
                    selectedSeats.length === 0
                      ? "bg-gray-400 cursor-not-allowed "
                      : "bg-orange-400 text-white px-5 py-2 rounded-md"
                  } text-white px-10 py-2 rounded-lg`}
                >
                  Book Now <i class="ri-arrow-right-s-line"></i>
                </button>
              </div>
            </StripeCheckout>
          </Col>

          <Col lg={16} xs={12} sm={12}>
            <div className="border-[1px] border-orange-400 mt-5"></div>
            <div className="flex justify-center mt-5 ">
              <SeatSelection
                selectedSeats={selectedSeats}    
                setSelectedSeats={setSelectedSeats}
                bus={bus} 
                // seatsBooked={bus.seatsBooked}
              />
            </div>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default BookNow;

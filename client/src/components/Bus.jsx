import React from "react";
import { useNavigate } from "react-router-dom";

function Bus({ bus }) {
  const navigate = useNavigate();
  return (
    <div className="p-3 m-2 rounded-md border-[1px] border-orange-400 hover:shadow-2xl duration-300">
      <h1 className="text-xl font-semibold">{bus.name}</h1>
      <div className="border-[1px] border-orange-400"></div>
      <div className="flex justify-between p-2">
        <div>
          <p className="text-base font-semibold">From</p>
          <p className="text-base">{bus.from}</p>
        </div>

        <div>
          <p className="text-base font-semibold">To</p>
          <p className="text-base">{bus.to}</p>
        </div>

        <div>
          <p className="text-base font-semibold">Price</p>
          <p className="text-base">DH {bus.price} /- </p>
        </div>
      </div>

      <div className="flex justify-between items-start">
        <div>
          <p className="text-base font-semibold">Journey Date</p>
          <p className="text-base">{bus.date}</p>
        </div>

        <div>
            <p className="text-base font-semibold">Departure Time</p>
            <p className="text-base">{bus.departureTime}</p>
        </div>

        <div>
            <p className="text-base font-semibold">Arrival Time</p>
            <p className="text-base">{bus.arrivalTime}</p>
        </div>

       
      </div>
        <div className="flex justify-center">
            <button
                className="bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded underline"
                onClick={() => navigate(`/book-now/${bus._id}`)}
            >
                Book Now
            </button>
        </div>
    </div>
  );
}

export default Bus;